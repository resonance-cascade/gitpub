var test = require('tape')
var fieldSplit = require('../lib/jsonify');

test('The jsonify middleware', function(t) {

  var req;
  var res;

  function init() {
    req = {};
    res = {};
    req.body = {};
    req.tokenData = {}
  }

  t.test('with populated arrays', function(t) {

    t.plan(10);

    init();
    req.body.syndication = "hey,hi,heep";
    req.body['syndicate-to'] = "https://twitter.com/bretolius/status/526580189115863041,http://instagram.com/p/toorXxxfoq/,http://news.indiewebcamp.com/post/bret.io/2013/06/28/indiewebcamp-2013-roundup/";
    req.body.category = "camera,instagram,photo,athing";
    req.tokenData.scope = 'post';

    fieldSplit(req, res, function(err) {
      t.assert(!err, 'should be error free');
      t.assert(req.body.syndication instanceof Array, 'req.body.syndication should be an array')
      t.equal(req.body.syndication.length, 3, 'syndication array should be length 3')
      t.assert(req.body['syndicate-to'] instanceof Array, "req.body['syndicate-to'] should be an array")
      t.equal(req.body['syndicate-to'].length, 3, 'syndicate-to array is length of 3')
      t.assert(req.body.category instanceof Array, 'req.body.category should be an array')
      t.equal(req.body.category.length, 4, 'category array should be length 4')
      t.assert(req.tokenData.scope instanceof Array, 'scope should be an array')
      t.equal(req.tokenData.scope.length, 1, 'scope array should be length 1')
      var expected = [{
        name: 'twitter.com',
        url: 'https://twitter.com/bretolius/status/526580189115863041'
      }, {
        name: 'instagram.com',
        url: 'http://instagram.com/p/toorXxxfoq/'
      }, {
        name: 'news.indiewebcamp.com',
        url: 'http://news.indiewebcamp.com/post/bret.io/2013/06/28/indiewebcamp-2013-roundup/'
      }]
      t.assert(req.body['syndicate-to'][0].url && req.body['syndicate-to'][0].name, 'syndicated-to should have names and urls')
    })
  })

  t.test('with an empty parameter', function(t) {
    t.plan(5);
    init();
    req.body.syndication = "hey,hi,heep"
    req.body['syndicate-to'] = "http://instagram.com/p/toorXxxfoq/";

    fieldSplit(req, res, function(err) {
      t.assert(!err, 'should be error free');
      t.assert(req.body.syndication instanceof Array, "req.body.syndication should be an array");
      t.assert(req.body['syndicate-to'] instanceof Array, "req.body['syndicate-to'] should be an array");
      t.assert(typeof req.body.category === "undefined", "req.body.category should be undefined");
      t.assert(req.body['syndicate-to'].length === 1, "syndicate-to array length == 1");
    })

  })

})
