var test = require('tape');
var Repo = require('../lib/repo');
var fs = require('fs-extra');
var cp = require('child_process');
var path = require('path');

var temp = path.join(__dirname, 'tmp')
var a = path.join(temp, 'a')
var b = path.join(temp, 'b')
var repoName = 'testRepo';
var aTree = path.join(a, repoName)
var bTree = path.join(b, repoName)
var gitdir = path.join(bTree, '.git')

var aRepo, aRepo;

var aSettings = {
  worktree: aTree,
  gitdir: gitdir,
  email: 'bcomnes@gmail',
  name: 'Bret Comnes',
  repo: bTree
}

var bSettings = {
  worktree: bTree,
  gitdir: gitdir,
  email: 'bcomnes@gmail',
  name: 'Bret Comnes',
  repo: aTree
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
  fs.ensureDir(a, function(err) {
    t.error(err, 'a dir created');
    fs.ensureDir(b, function(err) {
      t.error(err, 'b dir created');
    })
  })
})

test("create remote test repoA", function(t) {
  t.plan(1);
  cp.exec('git init ' + aTree, function(err, stdout, stderr) {
    t.error(err, 'initialzed test repo');
    aRepo = new Repo(aSettings)
  })
})

test("create repo object", function(t) {
  t.plan(1);
  bRepo = new Repo(bSettings);
  t.pass('repo object created')
})

test(".clone", function(t) {
  t.plan(1);
  bRepo.clone(function(err) {
    t.error(err, 'should be cloned now')
  })
})

test(".setUser", function(t) {
  t.plan(1);
  bRepo.setUser(function(err) {
    t.error(err, 'user should be set now')
  });
});

test(".setEmail", function(t) {
  t.plan(1);
  bRepo.setEmail(function(err) {
    t.error(err, 'user should be set now')
  });
});

test(".config", function(t) {
  t.plan(1);
  bRepo.config(function(err) {
    t.error(err, 'should run all config functions')
  })
})



test("clean up", function(t) {
  t.plan(1);
  fs.remove(temp, function(err) {
    t.error(err, 'tests cleaned up')
  })
})
