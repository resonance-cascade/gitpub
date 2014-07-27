// authorize.js

var request = require ('request');
var qs = require('querystring');
var debug = require('debug')('lib:auth');

var settings = require ('../settings');

module.exports = function (req, res, next) {
  req.token = req.get('Authorization') || req.body.access_token;

  var options = {
    method: 'GET',
    url: settings.tokenUrl,
    headers: { 'Authorization': req.token }
  };


  if (req.token) {

    req.token.endPoint = settings.tokenUrl;
    debug('Token Verrification Request');
    request(options, processTokenCheck);
  } else {
    debug('Missing Token');
    res.send(401, 'Unauthorized: No token was provided');
  }

  function processTokenCheck (error, response, body) {
    if (!error && response.statusCode === 200) {
      var tokenData = qs.parse(body);

      req.token.me = tokenData.me;
      req.token.client_id = tokenData.client_id;
      req.token.scope = tokenData.scope;
      req.token.date_issued = tokenData.date_issued;

      if (req.token.me === settings.domain) {
        debug('Token Verrified');
      next();
      } else {
        res.send(403,'You gotta be authorized to do that');
        debug('Valid but unauthorized token');
      }
    } else {
    res.send(500, error.name + ': ' + error.message || 'Something went terribly wrong');
    debug(error.name + ': ' + error.message);
  }
  }
};