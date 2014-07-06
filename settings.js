var config = require('./config.json');
var path = require('path');

function clone(o) {
  var ret = {};
  Object.keys(o).forEach(function (val) {
    ret[val] = o[val];
  });
  return ret;
}

var settings = clone(config);

settings.repo = 'https://github.com/' + config.github.user + '/' + config.github.repo + '.git';
settings.worktree = path.join(__dirname, 'repo', settings.github.repo);
settings.gitdir = path.join(settings.worktree, '.git');
settings.remoteBranch = [config.remote || 'origin', config.branch || 'master'];

module.exports = settings;
