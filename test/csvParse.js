var assert = require('assert');
var formEncoder = require('form-urlencoded');

var csvParse = require('../lib/csvParse');

describe('The csvParse route', function() {
  var req = {};
  var res = {};
  req.body = {};
  describe('with populated csv parameters', function() {
    before(function(next) {
      req.body.syndication = "http://instagram.com/p/s80DrsRfjP,https://twitter.com/bretolius/status/513150506185666560"
      req.body['syndicate-to'] = "flickr.com/people/bretc,plus.google.com/+BretComnes"
      csvParse(req,res,next)
    });
    it ('should result in two arrays', function() {
      assert(req.body.syndication == ["http://instagram.com/p/s80DrsRfjP", "https://twitter.com/bretolius/status/513150506185666560"])
      assert(req.body['syndicate-to'] == ["flickr.com/people/bretc", "plus.google.com/+BretComnes"])
    })
  })
})
