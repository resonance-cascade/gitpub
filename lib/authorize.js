// authorize.js

var request = require ('request');
var qs = require('querystring');
var debug = require('debug')('lib:auth');
var url = require('url');

var settings = require ('../settings');

module.exports = function (req, res, next) {
  req.tokenData = {};
  req.tokenData.token = req.get('Authorization') || req.body.access_token;

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
    debug('Missing Token');
    res.send(401, 'Unauthorized: No token was provided');
  }

  function processTokenCheck (error, response, body) {

    debug('Res: ' + response);
    debug('Err: ' + error);

    if (!error && response.statusCode === 200) {
      var tokenData = qs.parse(body);
      console.log(tokenData);
      req.tokenData.me = tokenData.me;
      req.tokenData.client_id = tokenData.client_id;
      req.tokenData.scope = tokenData.scope;
      req.tokenData.date_issued = tokenData.date_issued;
      req.tokenData.nonce = tokenData

      if (url.parse(req.tokenData.me).href === url.parse(settings.domain).href) {
        debug('Token Verrified');
        next();
      } else {
        res.status(403).send('You gotta be authorized to do that');
        debug('Valid but unauthorized token');
      }
    } else {
      res.status(500).send(error || response || 'Something went terribly wrong');
    }
  }
};