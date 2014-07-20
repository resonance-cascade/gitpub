// Repo.js

// TODO: Experiment with child_process.exec()
// Git-wrapper is funky.
var Git = require('git-wrapper');
var url = require('url');
var fs = require('fs');
var debug = require('debug')('repo');

// Pass in the settings to get a new Repo object
function Repo(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
  // Attach the git wrapper to a copied object
  var options = {
    'work-tree': this.worktree,
    'git-dir': this.gitdir
  };
  this.git = new Git(options);
}

Repo.prototype.clone = function (cb) {
  // TODO Audit how safe this is....
  // Caution!  Passwords!
  //
  debug('Cloning to ' + this.worktree);
  var repoUrl = url.parse(this.repo);
  repoUrl.auth =
    process.env.USERNAME + ':' + process.env.PASSWORD;
  this.git.exec('clone',
                {},
                [url.format(repoUrl), this.worktree],
                cb);
}

Repo.prototype.pull = function(cb) {
  debug('Pulling ' + this.worktree);
  this.git.exec('pull', this.remoteBranch, cb);
}

Repo.prototype.setUser = function(cb) {
  ths.git.exec('config', {}, ['user.name',this.name || 'GitPub'],cb)
};

Repo.prototype.setEmail = function(cb) {
  this.git.exec('config', {}, ['user.email',this.email],cb)
};

Repo.prototype.add = function(folders, cb) {
  // folders to commit:
  // folders = ['media', '_posts/ownyourgram']
  debug('Adding ' + folders);
  this.git.exec('add', {A: true}, folders, cb);
};

Repo.prototype.commit = function (comMsg, cb) {
  // comMsg: commit message
  // pitfall: "'Ownyourgram posted a file'"
  // The string must be delimited
  debug(comMsg);
  this.git.exec('commit', {m: true}, comMsg, cb)
}

Repo.prototype.push = function(cb) {
  debug('Pushing to ' + this.remoteBranch);
  this.git.exec('push', this.remoteBranch, cb);
};

Repo.prototype.publish = function(folders, comMsg, cb) {
  var that = this;
  that.git.add(folders, function (err, msg) {
    if (err) throw err;
    that.git.commit(comMsg, function(err,msg) {
      if(err) throw err;
      that.git.push(cb);
    });
  });
};

Repo.prototype.init = function(cb) {
  var that = this;
  fs.exists(this.worktree, function(exists) {
    if (exists === true) {
      debug(that.repo + ' aready cloned.  Pulling.');
      that.git.pull(cb);
    } else {
      that.git.clone(that.git.setUser(that.git.setEmail(cb)))
    }
  });
}

module.exports = Repo;