var test = require('tape');
var stagePost = require('../lib/stagePost');

var moment = require('moment');

var req = {};
var res = {};

function reInit() {
  req = {};
  res = {};
  req.body = {};
  req.tokenData = {};
}

function ownyourgram() {
  reInit();
  req.test = true;
  req.body.published = moment('2014-10-23T20:17:07-07:00');
  req.body.h = 'entry';
  req.body.content = 'A quick oneliner note!'
  req.body.category = ['camera', 'instagram', 'photo', 'athing']
  req.body.location = 'geo:45.530471667,-122.682853333'
  req.body['place-name'] = 'In da streets';
  req.c = ["bleep", "bloop", "blop"]
  req.tokenData.client_id = "https://ownyourgram.com/"
  req.tokenData.client = "ownyourgram.com"
  req.tokenData.scope = ['post'];
  req.files = [{
    filename: "iglGPyxG.jpg",
    fieldname: "photo",
    encoding: "7bit",
    mimetype: "application/octet-stream",
    fsPath: "/app/repo/bcomnes.github.io/media/ownyourgram.com/iglGPyxG.jpg",
    workPath: "/media/ownyourgram.com",
    src: "/media/ownyourgram.com/iglGPyxG.jpg"
  }]
}

test('Ownyourgram request through stagePost route', function(t) {
  t.plan(4);
  ownyourgram();
  stagePost(req, res, function(err) {
    t.assert(!err, 'should be error free');
    t.equal(req.body.tcontent, 'A quick oneliner note!', 'correct title content')
    t.equal(req.body.postFileName, '2014-10-23-a-quick-oneliner-note.md', 'correct fileName')
    t.equal(req.slug, '/2014/10/23/a-quick-oneliner-note', 'expected slug')
  })
})
