var express = require('express');
var router = express.Router();

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
  console.log(msg || 'Cloned');
}


fs.exists(repoPath, function (exists){
  if (exists === true) {
    // If the repo folder exists do something
    console.log('aready cloned...');
    git.exec('pull', deBug);
  } else {
    // If it does not exist clone it!
    console.log('cloning...')
    clone(settings.git.repo.ssh, deBug)
  }
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
