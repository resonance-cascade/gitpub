var test = require('tape')
var fieldSplit = require('../lib/fieldSplit');

test('The csvParse route', function(t) {

  var req;
  var res;
  function init () {
    req = {};
    res = {};
    req.body = {};
    req.tokenData = {}
  }

  t.test('with populated arrays', function(t) {

    t.plan(9);

    init();
    req.body.syndication = "hey,hi,heep";
    req.body['syndicate-to'] = "bleep,bloop,blop";
    req.body.category = "camera,instagram,photo,athing";
    req.tokenData.scope = 'post';

    fieldSplit(req,res, function(err) {
      t.assert(!err, 'should be error free');
      t.assert(req.body.syndication instanceof Array, 'req.body.syndication should be an array')
      t.equal(req.body.syndication.length, 3, 'syndication array should be length 3')
      t.assert(req.body['syndicate-to'] instanceof Array, "req.body['syndicate-to'] should be an array")
      t.equal(req.body['syndicate-to'].length, 3, 'syndicate-to array is length of 3')
      t.assert(req.body.category instanceof Array, 'req.body.category should be an array')
      t.equal(req.body.category.length, 4, 'category array should be length 4')
      t.assert(req.tokenData.scope instanceof Array, 'scope should be an array')
      t.equal(req.tokenData.scope.length, 1, 'scope array should be length 1')
    })
  })

  t.test('with an empty parameter', function(t) {
    t.plan(4);
    init();
    req.body.syndication = "hey,hi,heep"

    fieldSplit(req,res, function(err) {
      t.assert(!err, 'should be error free');
      t.assert(req.body.syndication instanceof Array, "req.body.syndication should be an array");
      t.assert(typeof req.body['syndicate-to'] === "undefined", "req.body['syndicate-to'] should be undefined");
      t.assert(typeof req.body.category === "undefined", "req.body.category should be undefined");
    })

  })

})
