var Repo = require('../lib/repo');
var settings = require('../settings');
var repo = new Repo(settings);
var inspect = require('util').inspect;
var debug = require('debug')('test:repoTest');

repo.init(function () {
  debug('Initialized');
})

