var test = require('tape');
var authorize = require('../lib/authorize');

var req = {};
var res = {};

test.skip('The authorize route', function(t) {
  t.plan(1);
  var request  = httpMocks.createRequest({method: 'POST'});
  var response = httpMocks.createResponse();


  authorize(request,response, function() {
    t.fail('authed a tokenless request');
  })

  console.log( response._getData() );

})
