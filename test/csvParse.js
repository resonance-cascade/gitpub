var test = require('tape')
var csvParse = require('../lib/csvParse');

test('The csvParse route', function(t) {
  var req = {};
  var res = {};
  req.body = {};

  t.test('with populated arrays', function(t) {

    t.plan(3);
    req.body.syndication = "hey,hi,heep",
    req.body['syndicate-to'] = "bleep,bloop,blop"

    csvParse(req,res, function(err) {
      t.assert(!err, 'should be error free');
      t.assert(req.body.syndication instanceof Array, 'req.body.syndication should be an array')
      t.assert(req.body['syndicate-to'] instanceof Array, "req.body['syndicate-to'] should be an array")
    })
  })

  t.test('with an empty parameter', function(t) {
    t.plan(3);
    req.body = {};
    req.body.syndication = "hey,hi,heep"

    csvParse(req,res, function(err) {
      t.assert(!err, 'should be error free');
      t.assert(req.body.syndication instanceof Array, "req.body.syndication should be an array");
      t.assert(typeof req.body['syndicate-to'] === "undefined", "req.body['syndicate-to'] should be undefined");
    })

  })

})
