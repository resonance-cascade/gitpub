// Micropub route
var express = require('express');
var router = express.Router();
var url = require('url');

var authorize = require('../lib/authorize');
var multiParse = require('../lib/multiParse');
var handleFiles = require('../lib/handleFiles');
var stagePost = require('../lib/stagePost');
var publishPost = require('../lib/publishPost');

var settings = require('../settings');



/* GET micropub landing page */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gitpub µPub Endpoint' });
});

/* POST micropub */
router.post('/',  authorize,
                  multiParse,
                  stagePost,
                  publishPost,
                  function(res, req) {
  res.set('Location', url.parse([settings.domain + req.slug].join('')));
  res.status(201).send('Created Post at ' + [settings.domain + req.slug].join(''));
                  });

/* GET Test Form */
router.get('/post', function(req, res) {
  res.render('post');
});

/* POST Test form */
router.post('/post',authorize,multiParse,stagePost,publishPost, function(req, res) {
  res.set('Location', url.parse([settings.domain + req.slug].join('')));
  res.status(201).send('Created Post at ' + [settings.domain + req.slug].join(''));
})

module.exports = router;