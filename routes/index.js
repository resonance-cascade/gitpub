var express = require('express');
var router = express.Router();
var git = require('nodegit');
var clone = git.Repo.clone;
var open = git.Repo.open;
var fs = require('fs');
var path = require('path');
var url = require('url');
var settings = require('../settings.js');

var repoPath = 'repo/' + settings.git.repo.path;

fs.exists(repoPath, function (exists){
  if (exists === true) {
    console.log('aready cloned');
    open(repoPath + '/.git', function(err, repo) {
      if (err) throw err;
      var remote = repo.getRemote("origin");
      remote.connect(0, function(error) {
        if (error) throw error;
        remote.download(null, function(error) {
          if (error) throw error;
          console.log("It worked!");
        });
      });
    })
  } else {
    clone(settings.git.repo.http, repoPath, null, function(err, repo) {
      if (err) {
        throw err;
      } console.log('cloned!');
    });
  }
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
