// Repo.js

// TODO: Experiment with child_process.exec()
// Git-wrapper is funky.
var Git = require('git-wrapper');
var url = require('url');
var fs = require('fs');
var async = require('async');
var debug = require('debug')('lib:repo');
var cp = require('child_process');
var series = require('array-series');

// Pass in the settings to get a new Repo object
function Repo(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }

  //this.git = new Git({
  //  'work-tree': obj.worktree,
  //  'git-dir': obj.gitdir
  //});
}

var folders = ['media', '_posts'];
var comMsg = ["'gitpub posted a new post'"];

Repo.prototype.clone = function(cb) {

  // TODO Audit how safe this is....
  // Caution!  Passwords!
  //
  debug('Cloning to ' + this.worktree);

  var repoUrl = url.parse(this.repo);

  // TODO: Dont use env vars
  if (process.env.ENV !== 'development') {
    repoUrl.auth = process.env.USERNAME + ':' + process.env.PASSWORD;
  }

  var clone = ['git clone', url.format(repoUrl), this.worktree].join(' ');
  cp.exec(clone, {
    timeout: 15000
  }, function cloneCb(err, stdout, stderr) {
    if (err && cb) cb(err + stderr);
    if (stdout) debug(stdout);
    debug('Done cloning ' + this.repo)
    cb();
  }.bind(this));
};

Repo.prototype.pull = function(cb) {

  debug('Pulling ' + this.worktree);

  var pull = ['git pull',
    this.remoteBranch,
    '--git-dir=' + this.gitdir,
    '--work-tree=' + this.worktree
  ].join(' ');

  cp.exec(pull, {
    timeout: 15000
  }, function pullCb(err, stdout, stderr) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('Finished pulling repo');
    cb();
  })
}

Repo.prototype.setUser = function(cb) {
  debug(this.repo + ' User: ' + this.name || 'GitPub');
  var name = [
    'git',
    '--git-dir=' + this.gitdir,
    '--work-tree=' + this.worktree,
    'config user.name',
    this.name || 'GitPub'
  ].join(' ')

  cp.exec(name, function setUserCb(err, stdout, stderr) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('User Set');
    cb(null);
  })
};

Repo.prototype.setEmail = function(cb) {
  debug(this.repo + ' email: ' + this.email);
  var email = [
    'git',
    '--git-dir=' + this.gitdir,
    '--work-tree=' + this.worktree,
    'config user.email',
    this.email,
  ].join(' ')

  cp.exec(email, function setEmailCb(err, stdout, stderr) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('Email Set');
    cb(null);
  })
}.bind(this);

Repo.prototype.add = function(cb) {
  // folders to commit:
  // folders = ['media', '_posts/ownyourgram']

  var add = ['git add -A',
    '--git-dir=' + this.gitdir,
    '--work-tree=' + this.worktree
  ].join(' ')

  cp.exec(add, function addCb(err, stdout, stderr) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('Added changed files');
    cb();
  })
};

Repo.prototype.commit = function(cb) {
  // comMsg: commit message
  // pitfall: "'Ownyourgram posted a file'"
  // The string must be delimited
  var commit = ['git commit -m', comMsg,
    '--git-dir=' + this.gitdir,
    '--work-tree=' + this.worktree
  ].join(' ')

  cp.exec(commit, function commitCb(err, stdout, stderr) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('Changes committed');
    cb();
  })
}

Repo.prototype.push = function(cb) {
  debug('Pushing to ' + this.remoteBranch);

  var push = ['git push', this.remoteBranch,
    '--git-dir=' + this.gitdir,
    '--work-tree=' + this.worktree
  ].join(' ')

  cp.exec(push, function pushCb(err, stdout, stderr) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('Push Succeeded');
    cb();
  })
};

Repo.prototype.publish = function(cb) {
  async.series([
      this.pull,
      this.add,
      this.commit,
      this.push,
    ],
    cb).bind(this);
};

Repo.prototype.config = function(cb) {
  series([
    this.setUser,
    this.setEmail
  ], this, cb)
};

function run(obj, meth) {
  return function(cb) {
    obj.meth(cb);
  }
}

Repo.prototype.init = function(cb) {
  fs.exists(this.gitdir, function(exists) {
    if (exists === true) {
      debug(that.github.repo + ' aready cloned.  Pulling.');
      this.pull(cb);
    } else {
      async.series([
        this.clone,
        this.setUser,
        this.setEmail,
      ], cb).bind(this)
    }
  }.bind(this));
};

module.exports = Repo;
