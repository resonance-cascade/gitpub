// authorize.js

var request = require('request');
var qs = require('querystring');
var debug = require('debug')('lib:auth');
var url = require('url');

var settings = require('../settings');

module.exports = function(tokenUrl, repo) {
  return function(req, res, next) {
    req.tokenData = {};
    req.tokenData.token = getToken(req);

    debug('Content-Type: ' + req.get('Content-Type'));

    if (req.tokenData.token) {

      req.tokenData.tokenUrl = tokenUrl;
      debug('Token Verrification Request');

      var options = {
        method: 'GET',
        url: tokenUrl,
        headers: {
          'Authorization': req.tokenData.token
        }
      };
      request(options, processTokenCheck(req, repo, next));

    } else {
      if (req.is('multipart')) {
        debug('Missing multipart header token');
        res.send(401, 'Unauthorized: Tokens must arrive in the header for multipart forms.');
      } else {
        debug('Missing Token');
        res.send(401, 'Unauthorized: No token was provided');
      }
    }
  }
};

function getToken(req) {
  return req.get('Authorization') || 'Bearer ' + req.body.access_token;
}

function mapToken(tokenData, res) {
  for (var key in res) {
    if (res.hasOwnProperty(key)) {
      tokenData[key] = res[key];
    }
  }
}

function processTokenCheck(req, repo, next) {
  return function(error, response, body) {
    if (error) debug('Err: ' + error);
    if (response) debug('Status: ' + response.statusCode);
    // TODO: Actually handle all the codes
    if (!error && response.statusCode === 200) {
      mapToken(res.tokenData, qs.parse(body))
      req.tokenData.client = url.parse(req.tokenData.client_id).hostname;

      if (url.parse(req.tokenData.me).href === url.parse(repo.domain).href) {
        debug('Token Verrified');
        next();
      } else {
        res.status(403).send('You gotta be authorized to do that');
        debug('Valid but unauthorized token');
      }
    } else {
      res.status(response.statusCode).send(qs.parse(body));
    }
  }
}
