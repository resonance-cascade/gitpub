// publishPost.js
//
// Commits new files to repo, pulls repo, then pushes and
// Returns the published URL

var debug = require('debug')('lib:publish')
var Git = require('git-wrapper');

var Repo = require('./repo');

var settings = require('../settings');

var repo = new Repo(settings);
repo.git = new Git({
      'work-tree': repo.worktree,
      'git-dir': repo.gitdir
    });

module.exports = function(req, res, next){
  debug('Trying to publish post');
  repo.publish(next);
}