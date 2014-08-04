// publishPost.js
//
// Commits new files to repo, pulls repo, then pushes and
// Returns the published URL

var app = require('../app');
var Repo = require('./repo');
var settings = require('../settings');
var repo = new Repo(settings);
var Git = require('git-wrapper');
repo.git = new Git({
      'work-tree': repo.worktree,
      'git-dir': repo.gitdir
    });
var async = require ('async');
var debug = require('debug')('lib:publish');


module.exports = function(req, res, next){
  debug('Trying to publish post');
  repo.publish(next);
}