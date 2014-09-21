// Micropub route
var express = require('express');
var router = express.Router();
var url = require('url');
var formEncoder = require('form-urlencoded');

var authorize = require('../lib/authorize');
var multiParse = require('../lib/multiParse');
var handleFiles = require('../lib/handleFiles');
var stagePost = require('../lib/stagePost');
var publishPost = require('../lib/publishPost');

var settings = require('../settings');



/* GET micropub landing page */
router.get('/', function(req, res) {
  switch (req.query['q']){
    case "syndicate-to":
      res.set('Content-Type', 'application/x-www-form-urlencoded');
      res.send(
        formEncoder.encode({'syndicate-to': settings.syndicateTo.join(',')})
        );
      break;
    default:
      res.render('micropub', { title: 'Gitpub µPub Endpoint' });
  }
});

/* POST micropub */
router.post('/',  authorize,
                  multiParse,
                  stagePost,publishPost,
                  microRes);

function microRes (req, res) {
  res.set('Location', postUrl());
  res.status(201).send('Created Post at ' + postString());

  function postUrl() {
    return url.parse([settings.domain + req.slug].join('')).format();
  }

  function postString() {
    return [settings.domain + req.slug].join('');
  }
}

module.exports = router;
