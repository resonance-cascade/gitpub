// authorize.js

var request = require ('request');
var qs = require('querystring');
var debug = require('debug')('lib:auth');
var url = require('url');

var settings = require ('../settings');

module.exports = function (req, res, next) {
  req.tokenData = {};
  req.tokenData.token = req.get('Authorization') || 'Bearer ' + req.body.access_token;
  debug('Content-Type: ' + req.get('Content-Type'));
  var options = {
    method: 'GET',
    url: settings.tokenUrl,
    headers: { 'Authorization': req.tokenData.token }
  };

  if (req.tokenData.token) {

    req.tokenData.endPoint = settings.tokenUrl;
    debug('Token Verrification Request');
    request(options, processTokenCheck);
  } else {
    if (req.is('multipart')) {
      debug('Missing multipart header token');
      res.send(401, 'Unauthorized: Tokens must arrive in the header for multipart forms.');
    } else {
      debug('Missing Token');
      res.send(401, 'Unauthorized: No token was provided');
    }
  }

  function processTokenCheck (error, response, body) {
    if (error) debug('Err: ' + error);
    if (response) debug('Status: ' + response.statusCode);
    // TODO: Actually handle all the codes
    if (!error && response.statusCode === 200) {
      var parsedTokenResponse = qs.parse(body);

      req.tokenData.me = parsedTokenResponse.me;
      req.tokenData.client_id = parsedTokenResponse.client_id;
      req.tokenData.client = url.parse(parsedTokenResponse.client_id).hostname;
      req.tokenData.scope = parsedTokenResponse.scope;
      req.tokenData.date_issued = parsedTokenResponse.date_issued;
      req.tokenData.nonce = parsedTokenResponse.nonce;

      if (url.parse(req.tokenData.me).href === url.parse(settings.domain).href) {
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
};
