var config = require('./config.json');
var path = require('path');

// Default Values
settings.mediaFolder = 'media';

var settings = clone(config);

// Full URL to git repo
settings.repo = 'https://github.com/' + config.github.user + '/' + config.github.repo + '.git';
// Path to git repo on disk
settings.worktree = path.join(__dirname, 'repo', settings.github.repo);
// Path to .git dir in git repo
settings.gitdir = path.join(settings.worktree, '.git');
// Remote branch to push/pull from
settings.remoteBranch = [config.remote || 'origin', config.branch || 'master'];

function clone(o) {
  var ret = {};
  Object.keys(o).forEach(function (val) {
    ret[val] = o[val];
  });
  return ret;
}

module.exports = settings;