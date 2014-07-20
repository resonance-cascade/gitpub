// Micropub route
var express = require('express');
var router = express.Router();
var debug = require('debug')('routes:index');

//var authorize = require('../lib/authorize');
//var multiParse = require('../lib/multiParse');
//var stagePost = require('../lib/stagePost');
//var publishPost = require('../lib/publishPost);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gitpub µPub Endpoint' });
});

//router.post('/',  authorize(),
                  multiParse(),
                  stagePost(),
                  publishPost(),
                  function(res, req) {
                    // Report sucessful posting here.
                  });

module.exports = router;