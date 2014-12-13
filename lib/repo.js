// Repo.js

// TODO: Experiment with child_process.exec()
// Git-wrapper is funky.
var url = require('url');
var fs = require('fs');
var async = require('async');
var debug = require('debug')('lib:repo');
var cp = require('child_process');
var series = require('array-series');
var Git = require('./git');

// Pass in the settings to get a new Repo object
function Repo(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }

  this.git = new Git(this.worktree)
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

  this.git(['pull', this.remoteBranch], {
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

  this.git(['config', 'user.name', this.name || 'GitPub'],
    function setUserCb(err, stdout, stderr) {
      if (err) cb(err);
      if (stdout) debug(stdout);
      debug('User Set');
      cb();
    }
  )
};

Repo.prototype.setEmail = function(cb) {
  debug(this.repo + ' email: ' + this.email);

  this.git(['config', 'user.email', this.email],
    function setEmailCb(err, stdout, stderr) {
      if (err) cb(err);
      if (stdout) debug(stdout);
      debug('Email Set');
      cb();
    }
  )
};

Repo.prototype.add = function(files) {
  // folders to commit:
  // folders = ['media', '_posts/ownyourgram']
  var add = ['add'].concat(files || ['-A'])
  return function addCls(cb) {
    this.git(add, function addCb(err, stdout, stderr) {
      if (err) cb(err);
      if (stdout) debug(stdout);
      debug('Added ' + files || '-A');
      cb();
    })
  }.bind(this);
};

Repo.prototype.commit = function(msg) {
  // comMsg: commit message
  // pitfall: "'Ownyourgram posted a file'"
  // The string must be delimited
  return function commitCls(cb) {
    this.git(['commit', '-m', msg],
      function commitCb(err, stdout, stderr) {
        if (err) cb(err);
        if (stdout) debug(stdout);
        debug('Changes committed');
        debug(msg);
        cb();
      })
  }.bind(this);
}

Repo.prototype.push = function(cb) {
  debug('Pushing to ' + this.remoteBranch);

  this.git(['push', this.remoteBranch], function pushCb(err, stdout, stderr) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('Push Succeeded');
    cb();
  })
};

Repo.prototype.publish = function(cb) {
  series([
    this.pull,
    this.add,
    this.commit,
    this.push
  ], this, cb);
};

Repo.prototype.config = function(cb) {
  series([
    this.setUser,
    this.setEmail
  ], this, cb)
};


Repo.prototype.init = function(cb) {
  fs.exists(this.gitdir, function(exists) {
    if (exists === true) {
      debug(that.github.repo + ' aready cloned.  Pulling.');
      this.pull(cb);
    } else {
      async.series([
        this.clone,
        this.config,
      ], cb).bind(this)
    }
  }.bind(this));
};

module.exports = Repo;
