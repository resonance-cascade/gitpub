// Micropub route
var express = require('express');
var router = express.Router();

var authorize = require('../lib/authorize');
var multiParse = require('../lib/multiParse');
var handleFiles = require('../lib/handleFiles')
var stagePost = require('../lib/stagePost');
//var publishPost = require('../lib/publishPost);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gitpub µPub Endpoint' });
});

//router.post('/',  authorize,
//                  multiParse,
//                  stagePost,
//                  publishPost,
//                  function(res, req) {
//                    // Report sucessful posting here.
//                  });
//

router.get('/post', function(req, res) {
  res.render('post');
});

router.post('/post',multiParse,authorize,handleFiles,stagePost, function(req, res) {
  if (req.body) console.log(req.body);
  if (req.token) console.log(req.token);
  if (req.files) console.log(req.files);
  res.redirect('post');
})

module.exports = router;