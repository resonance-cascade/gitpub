var request = require('request');
var formEncoder = require('form-urlencoded');
var test = require('tape');

var server = require('../lib/server')

var settings = require('../settings.js')

var before = test;
var after = test;

before("start the server", function(t) {
  t.plan(1);
  server.start(function() {
    t.pass('The server started');
  })
})

test('GET /', function(t) {
  t.plan(3);
  request('http://localhost:3000/', function(err, res, body) {
    t.equal(err, null, 'should be error free');
    t.equal(res.statusCode, 200, 'should respond with 200');
    var msg = 'should respond with "Welcome to Gitpub"';
    t.assert(res.body.indexOf("Welcome to Gitpub") > -1, msg);
  })
})

test('GET /micropub', function(t){
  t.plan(3);
  request('http://localhost:3000/micropub', function(err, res, body) {
    t.equal(err, null, 'should be error free');
    t.equal(res.statusCode, 200, 'should respond with 200');
    var msg = 'should respond with "...µPub Endpoint"';
    t.assert(res.body.indexOf("Welcome to Gitpub µPub Endpoint") > -1, msg);
  });
})

test('GET /micropub?q=syndicate-to', function(t){
  t.plan(3);
  request('http://localhost:3000/micropub?q=syndicate-to', function(err, res, body) {
    t.equal(err, null, 'should be error free');
    t.equal(res.statusCode, 200, 'should respond with 200');
    var expected = formEncoder.encode({'syndicate-to': settings.syndicateTo.join(',')});
    var msg = 'should response with csv syndicate-to list'
    t.equal(expected, res.body, msg);
  });
});

after("stop the server", function(t) {
  t.plan(1);
  server.stop(function() {
    t.pass('the server stopped');
  })
})

