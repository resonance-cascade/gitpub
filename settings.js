var settings = {}
var url = require('url');

settings.git = {};
settings.git.repo = {};
settings.web = {};

settings.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
settings.git.repo.ssh = 'git@github.com:bcomnes/bcomnes.github.io.git';
settings.git.repo.http = 'https://github.com/bcomnes/bcomnes.github.io.git';
settings.git.repo.path = 'bcomnes.github.io';
settings.web.port = process.env.WEB_PORT || 9980;

module.exports = settings;