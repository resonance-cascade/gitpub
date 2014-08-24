gitpub
======

[![Build Status](http://img.shields.io/travis/bcomnes/gitpub.svg?style=flat-square)](https://travis-ci.org/bcomnes/gitpub)
[![Dependency Status](https://david-dm.org/bcomnes/gitpub.svg?style=flat)](https://david-dm.org/bcomnes/gitpub)
[![Dev Dependency Status](http://img.shields.io/david/dev/bcomnes/gitpub.svg?style=flat-square)](https://david-dm.org/bcomnes/gitpub)
[![Code Climate](https://codeclimate.com/github/bcomnes/gitpub/badges/gpa.svg)](https://codeclimate.com/github/bcomnes/gitpub)
[![Test Coverage](https://codeclimate.com/github/bcomnes/gitpub/badges/coverage.svg)](https://codeclimate.com/github/bcomnes/gitpub)

An experimental publishing tool that takes incoming http requests, authorizes them and then turns them into static files inside a remote git repository for later consumption by a static site generator running in a [gh-pages](https://pages.github.com/) like environment or a dynamic web app that renders content from static files on disk.

It currently works but generates an inflexible Jekyll post file in a specific location in a repository and is undocumented!

## Currently Working

- [micropub](http://indiewebcamp.com/micropub) (posting)
- Simple File handling for small files in git.
- Support for a simple jekyll post schema.

## On the table:

- Documentation:  Micropub is still a baby.
- Work out all the kinks.
- Testing
- Example Jekyll Template.

## Future plans:

- [micropub](http://indiewebcamp.com/micropub) (editing)
- [webmention](http://indiewebcamp.com/micropub)
- Robust file handling (S3, Dropbox, Bittorrent Sync, [Camlistore](https://camlistore.org/))
- Advanced syndication options ([POSSE](http://indiewebcamp.com/POSSE) [PESOS](http://indiewebcamp.com/PESOS))
- Support for arbitrary post templates and schema.
- Flexible pathing.
- Static Site Generator Agnostic
- Site Provisioning
- [One click deploy](https://blog.heroku.com/archives/2014/8/7/heroku-button)
- Administration Pannel
- Automated Conflict Management and 3 way merges.
- Migrate from express to [Hapi](https://github.com/hapijs/hapi)
