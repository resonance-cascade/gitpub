var test = require('tape');
var Repo = require('../lib/repo');
var fs = require('fs-extra');
var cp = require('child_process');

var temp = './tmp'
var remote = temp + '/remote'
var local = temp + '/local'
var repoName = 'testRepo';
var remoteTree = [remote, repoName].join('/')
var workTree = [local, repoName].join('/')
var gitdir = [workTree, '.git'].join('/')

var repo;


var settings = {
  worktree: workTree,
  gitdir: gitdir,
  email: 'bcomnes@gmail',
  name: 'Bret Comnes',
  repo: remoteTree
}



test("ensure clean directory", function(t) {
  if (fs.existsSync(temp)) {
    fs.remove(temp, function(err) {
      t.error(err, 'tmp dir removed');
      t.end();
    })
  } else {
    t.pass('no temp dir exists');
    t.end()
  }
})

test("create tmp folders", function(t) {
  t.plan(2);
  fs.ensureDir(remoteTree, function(err) {
    t.error(err, 'remote dir created');
    fs.ensureDir(local, function(err) {
      t.error(err, 'local dir created');
    })
  })
})

test("create remote test repo", function(t) {
  t.plan(1);
  cp.exec('git init ' + remoteTree, function(err, stdout, stderr) {
    t.error(err, 'initialzed test repo');
  })
})

test("create repo object", function(t) {
  t.plan(1);
  repo = new Repo(settings);
  t.pass('repo object created')
})

test(".clone", function(t) {
  t.plan(1);
  repo.clone(function(err) {
    t.error(err, 'should be cloned now')
  })
})

test(".setUser", function(t) {
  t.plan(1);
  repo.setUser(function(err) {
    t.error(err, 'user should be set now')
  });
});

test(".setEmail", function(t) {
  t.plan(1);
  repo.setEmail(function(err) {
    t.error(err, 'user should be set now')
  });
});

test(".config", function(t) {
  t.plan(1);
  repo.config(function(err) {
    t.error(err, 'should run all config functions')
  })
})

test("clean up", function(t) {
  t.plan(1);
  fs.remove(temp, function(err) {
    t.error(err, 'tests cleaned up')
  })
})
