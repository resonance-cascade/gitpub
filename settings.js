var settings = {}
var url = require('url');
var path = require('path');

settings.git = {};
settings.git.repo = {};
settings.web = {};

settings.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
//settings.git.repo.ssh = 'git@github.com:bcomnes/bcomnes.github.io.git';
settings.git.repo.http = 'https://github.com/bcomnes/bcomnes.github.io.git';
settings.git.repo.path = 'bcomnes.github.io';
settings.git.repo.worktree = path.join(__dirname, settings.git.repo.path);
settings.git.repo.gitdir = path.join(settings.git.repo.worktree, ".git");
settings.web.port = process.env.WEB_PORT || 9980;

settings.authed = 'http://bret.io'

settings.tokenUrl = 'https://tokens.oauth.net/token'

module.exports = settings;