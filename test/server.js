var assert = require('assert');
var request = require('request');
var httpUtils = require('request-mocha')(request);

var server = require('../lib/server')

describe('Start the server', function() {
  before(server.start);

  httpUtils.save('http://localhost:3000/');

  it ('should respond without error', function() {
    assert(this.err === null)
  });

  it ('should respond with 202 status code', function() {
    assert(this.res.statusCode === 200);
  });

  it ('should respond with "Welcome to Gitpub"', function(){
    var pos = this.body.indexOf("Welcome to Gitpub")
    console.log(pos);
    assert(pos > -1 )
  })

  httpUtils.save('http://localhost:3000/micropub');

  it ('should respond without error', function() {
    assert(this.err === null)
  });

  it ('should respond with 202 status code', function() {
    assert(this.res.statusCode === 200);
  });

  it ('should respond with "Welcome to Gitpub"', function(){
    var pos = this.body.indexOf("Welcome to Gitpub µPub Endpoint")
    console.log(pos);
    assert(pos > -1 )
  })

  after(server.stop);

});