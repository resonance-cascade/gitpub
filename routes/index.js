var express = require('express');
var router = express.Router();
var debug = require('debug')('routes:index');
var request = require ('request');
var qs = require('querystring');

var fs = require('fs');
var path = require('path');
var url = require('url');

var settings = require('../settings.js');

var Git = require('git-wrapper');
var git = new Git({
      'work-tree': settings.git.repo.worktree,
      'git-dir': settings.git.repo.gitdir
    });

function clone (url, callback) {
  var gitC = new Git();
  gitC.exec('clone', null, [url], callback);
}

var repoPath = settings.git.repo.worktree;

function deBug (err, msg) {
  if (err) throw err;
  debug(msg || 'Cloned');
}

var cloned = false;

fs.exists(repoPath, function (exists){
  if (exists === true) {
    // If the repo folder exists do something
    debug('aready cloned...');
    git.exec('pull', function (err, msg) {
      deBug(err,msg);
      cloned = true;
    });
  } else {
    // If it does not exist clone it!
    debug('cloning...')
    clone(settings.git.repo.http, function (err, msg) {
      deBug(err,msg);
      cloned = true;
    });
  }
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gitpub µPub Endpoint', status: cloned  });
});


router.post('/', function (req, res) {
  
  
  var token = req.get('Authorization');
  var postBody = qs.parse(req.body);
  
  var options = {
    method: 'GET',
    url: settings.tokenUrl,
    headers: { 'Authorization': token }
  }

  function checkRes(error, response, body) {
    if (!error && response.statusCode === 200) {
      var tokenData = qs.parse(body);
      if (tokenData.me === settings.authed) {
        var postPath = tokenData.me + '/testpost';
        res.set('Location', postPath)
        res.send(201, 'Created Post at ' + postPath)
      } else {
        res.send(403,'You gotta be authorized to do that')
      }
    } else {
        res.send(500, error.name + ': ' + error.message || 'Something went terribly wrong');
    }
  }
  if (token) {
    request(options, checkRes);
  } else {
    res.send(401, 'Unauthorized: No token was provided');
  }

})

function createPost(params) {
  null;
}

module.exports = router;
