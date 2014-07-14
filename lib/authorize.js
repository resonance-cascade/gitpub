// authorize.js

var request = require ('request');
var qs = require('querystring');
var debug = require('debug')('routes:auth');

var settings = require ('../settings')

module.exports = function (req, res, next) {
  var token = req.get('Authorization') || req.body.access_token;
  var options = {
    method: 'GET',
    url: settings.tokenUrl,
    headers: { 'Authorization': token }
  };

  if (token) {
    debug('Token Verrification Request');
    request(options, processTokenCheck);
  } else{
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
      
      if (tokenData.me === settings.domain) {
        debug('Token Verrified');
      next();
    } else {
      res.send(403,'You gotta be authorized to do that');
      debug('Valid but unauthorized token');
    }
  } else {
    res.send(500, error.name + ': ' + error.message || 'Something went terribly wrong');
    debug('Something went wrong with verification request.');
  }
}