// Repo.js

// TODO: Experiment with child_process.exec()
// Git-wrapper is funky.
var Git = require('git-wrapper');
var url = require('url');
var fs = require('fs');
var async = require('async');
var debug = require('debug')('lib:repo');

// Pass in the settings to get a new Repo object
function Repo(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }

  this.git = new Git();
}

var folders = ['media', '_posts'];
var comMsg = ["'gitpub posted a new post'"];

Repo.prototype.clone = function (cb) {
  // TODO Audit how safe this is....
  // Caution!  Passwords!
  //
  debug('Cloning to ' + this.worktree);

  var that = this;
  var repoUrl = url.parse(that.repo);
  if (process.env.ENV !== 'development') {
    repoUrl.auth = process.env.USERNAME + ':' + process.env.PASSWORD;
  }

    this.git.exec('clone',{},[url.format(repoUrl), this.worktree], function(err, stdout) {
    if (err) throw(err);
    if (stdout) debug(stdout);
    debug('Done cloning '+ that.github.repo);
    that.git = new Git({
      'work-tree': that.worktree,
      'git-dir': that.gitdir
    });
    if (cb) cb(null);
  })
}

Repo.prototype.pull = function(cb) {
  debug('Pulling ' + this.worktree);
  this.git.exec('pull', this.remoteBranch, function(err, stdout) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    if (cb) cb();
  });
}

Repo.prototype.setUser = function(cb) {
  var that = this;
  debug(that.github.repo + ' User: ' + that.name || 'GitPub');
  this.git.exec('config', null, ['user.name',that.name || 'GitPub'], function(err, stdout) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    debug('User Set');
    if (cb) cb(null);
  })
};

Repo.prototype.setEmail = function(cb) {
  var that = this;
  debug(that.github.repo + ' email: ' + that.email);
  this.git.exec('config', null, ['user.email',that.email],function (err, stdout) {
      if (err) cb(err);
      if (stdout) debug(stdout);
      if (cb) cb(null);
  })
};

Repo.prototype.add = function(cb) {
  // folders to commit:
  // folders = ['media', '_posts/ownyourgram']
  debug('Adding ' + folders);
  this.git.exec('add', {A: true}, folders, function (err, stdout) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    if (cb) cb();
  });
};

Repo.prototype.commit = function (cb) {
  // comMsg: commit message
  // pitfall: "'Ownyourgram posted a file'"
  // The string must be delimited
  debug(comMsg);
  this.git.exec('commit', {m: true}, comMsg, function (err, stdout) {
    if (err) cb(err);
    if (stdout) debug(stdout);
    if (cb) cb();
  })
}

Repo.prototype.push = function(cb) {
  debug('Pushing to ' + this.remoteBranch);
  this.git.exec('push', this.remoteBranch, function (err, stdout) {
    if (err) debug(err);
    if (stdout) debug(stdout);
    if (cb) cb();
  });
};

Repo.prototype.publish = function(cb) {
  var that = this;

  async.series([function(acb){that.add(acb)},
                function(acb){that.commit(acb)},
                function(acb){that.push(acb)}]);
};

Repo.prototype.init = function(cb) {
  var that = this;
  fs.exists(this.gitdir, function(exists) {
    if (exists === true) {
      debug(that.github.repo + ' aready cloned.  Pulling.');
      that.pull(cb);
    } else {
      async.series([function(acb){that.clone(acb)}, function(acb){that.setUser(acb)}, function(acb){that.setEmail(acb)}], cb)
    }
  });
}

module.exports = Repo;