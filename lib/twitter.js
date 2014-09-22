var Twitter = require('twitter');
var url = require('url');
var async = require('async');

var settings = require ('../settings');

var twit = new twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


module.exports = function (req, res, next) {
  async.parallel([], function(err, results) {
  })
}

function parseSyndication (req, cb){
  if (req.body.syndication && (req.body.syndication.split(',').length > 0)) {
    req.body.syndication = req.body.syndication.split(',');

    req.body.syndication = req.body.syndication.map(function (target) {
      var obj = {
        name: url.parse(target).hostname,
        url: url.parse(target).href
      }
      return obj;
    });
    cb();
  } else {
    cb();
  }
}

//function processSyndicateTo (req, cb) {
//  if (req.body['syndicate-to'] && (req.body['syndicate-to'].split(',').length > 0)) {
//    req.body['syndicate-to'] = req.body['syndicate-to'].split(',');
//
//    req.body.syndication = req.body.syndication.map(function (target) {
//
//    }
//  } else {
//    cb();
//  }
//}
