var Repo = require('../lib/repo');
var settings = require('../settings');
var repo = new Repo(settings);
var inspect = require('util').inspect;

repo.clone(function () {
  console.log('Cloned');
})

