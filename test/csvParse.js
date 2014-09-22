var assert = require('assert');
var csvParse = require('../lib/csvParse');

describe('The csvParse route', function() {
  var req = {};
  var res = {};
  req.body = {};

  afterEach(function() {
    // Clear the req.body object.
    req.body = {};
  });

  describe('with populated csv parameters', function() {

    before(function() {
      req.body.syndication = "hey,hi,heep"
      req.body['syndicate-to'] = "bleep,bloop,blop"
    });

    it ('should result in two arrays', function(done) {
      csvParse(req,res,function(err) {
        assert(req.body.syndication instanceof Array)
        assert(req.body['syndicate-to'] instanceof Array)
        done();
      });
    })

  })

  describe('with an empty paramter', function() {
    before(function() {
      req.body.syndication = "hey,hi,heep"
    });

    it('should result in one arrray and one undefined value', function(done) {
      csvParse(req,res, function(err) {
        assert(req.body.syndication instanceof Array)
        assert(typeof req.body['syndicate-to'] === "undefined")
        done();
      })
    })

  })

})
