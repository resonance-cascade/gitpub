var test = require('tape');
var stagePost = require('../lib/stagePost');

var req = {};
var res = {};

function reInit () {
  req = {};
  res = {};
  req.body = {};
  req.tokenData = {};
}

function ownyourgram () {
  reInit();
  req.test = true;
  req.body.published = '2014-10-23T20:17:07-07:00';
  req.body.h = 'entry';
  req.body.content = 'A quick oneliner note!'
  req.body.category = [ 'camera','instagram','photo','athing' ]
  req.body.location = 'geo:45.530471667,-122.682853333'
  req.body['place-name'] = 'In da streets';
  req.body['syndicate-to'] = ["bleep" ,"bloop" , "blop"]
  req.tokenData.client_id = "https://ownyourgram.com/"
  req.tokenData.client = "ownyourgram.com"
  req.tokenData.scope = ['post'];
  req.files = [ {
    filename: "iglGPyxG.jpg",
    fieldname: "photo",
    encoding: "7bit",
    mimetype: "application/octet-stream",
    fsPath: "/app/repo/bcomnes.github.io/media/ownyourgram.com/iglGPyxG.jpg",
    workPath: "/media/ownyourgram.com",
    src: "/media/ownyourgram.com/iglGPyxG.jpg"
  } ]
}

test('The stagePost route', function(t) {
  ownyourgram();
  stagePost(req, res, function (err) {
    t.assert(!err, 'should be error free');
    t.end();
  })

})
