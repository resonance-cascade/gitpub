var assert = require('assert');
var request = require('request');
var httpUtils = require('request-mocha')(request);
var formEncoder = require('form-urlencoded');

var server = require('../lib/server')

var settings = require('../settings.js')

describe('Start the server', function() {
  before(server.start);
  this.timeout(10000);

  describe('GET /', function() {
    httpUtils.save('http://localhost:3000/');

    it ('should respond without error', function() {
      assert(this.err === null)
    });

    it ('should respond with 202 status code', function() {
      assert(this.res.statusCode === 200);
    });

    it ('should respond with "Welcome to Gitpub"', function(){
      var pos = this.body.indexOf("Welcome to Gitpub")
      assert(pos > -1 )
    })
  });

  describe('GET /micropub', function() {
    httpUtils.save('http://localhost:3000/micropub');

    it ('should respond without error', function() {
      assert(this.err === null)
    });

    it ('should respond with 202 status code', function() {
      assert(this.res.statusCode === 200);
    });

    it ('should respond with "...µPub Endpoint"', function(){
      var pos = this.body.indexOf("Welcome to Gitpub µPub Endpoint")
      assert(pos > -1 )
    })
  });

  describe('GET /micropub?q=syndicate-to', function() {
    httpUtils.save('http://localhost:3000/micropub?q=syndicate-to');

    it ('should respond without error', function() {
      assert(this.err === null)
    });
    it ('should respond with 202 status code', function() {
      assert(this.res.statusCode === 200);
    });
    it ('should response with csv syndicate-to list', function() {
      var expected = formEncoder.encode({'syndicate-to': settings.syndicateTo.join(',')});
      assert(this.res.body === expected);
    })
  });

  after(server.stop);
});
