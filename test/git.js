var test = require('tape');
var Git = require('../lib/git')
var path = require('path');
var fs = require('fs-extra');
var cp = require('child_process');
var debug = require('debug');
var git;


var temp = path.join(__dirname, 'tmp')
var repoName = 'testRepo';
var workTree = path.join(temp, repoName)

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
  t.plan(1);
  fs.ensureDir(workTree, function(err) {
    t.error(err, 'workTree created');
  })
})

test("init test repo", function(t) {
  t.plan(1);
  cp.exec('git init ' + workTree, function(err, stdout, stderr) {
    t.error(err, 'initialzed test repo');
  })
})

test("create git object", function(t) {
  t.plan(1);
  git = new Git(workTree);
  t.pass('git instance created');
})

test("run a string command", function(t) {
  t.plan(1);

  git('status', function(err, stdout, stderr) {
    t.error(err, 'string command sucessfully run')
    debug(stdout);
    debug(stderr);
  })
})

test("run a file command", function(t) {
  t.plan(1);
  git(['status'], function(err, stdout, stderr) {
    t.error(err, 'array command sucessfully run');
    debug(stdout);
    debug(stderr);
  })
})

test("run a string command w/ options", function(t) {
  t.plan(1);

  git('status', {
    timeout: 1500
  }, function(err, stdout, stderr) {
    t.error(err, 'string command sucessfully run')
    debug(stdout);
    debug(stderr);
  })
})

test("run a file command w/ options", function(t) {
  t.plan(1);
  git(['status'], {
    timeout: 15000
  }, function(err, stdout, stderr) {
    t.error(err, 'array command sucessfully run');
    debug(stdout);
    debug(stderr);
  })
})

test("clean up", function(t) {
  t.plan(1);
  fs.remove(temp, function(err) {
    t.error(err, 'tests cleaned up')
  })
})
