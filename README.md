gitpub
======

[![Build Status](https://travis-ci.org/bcomnes/gitpub.svg?branch=master)](https://travis-ci.org/bcomnes/gitpub)
[![Dependency Status](https://david-dm.org/bcomnes/gitpub.svg?style)](https://david-dm.org/bcomnes/gitpub)
[![devDependency Status](https://david-dm.org/bcomnes/gitpub/dev-status.svg)](https://david-dm.org/bcomnes/gitpub#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/bcomnes/gitpub/badges/gpa.svg)](https://codeclimate.com/github/bcomnes/gitpub)
[![Test Coverage](https://codeclimate.com/github/bcomnes/gitpub/badges/coverage.svg)](https://codeclimate.com/github/bcomnes/gitpub)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

An experimental publishing tool that takes incoming http requests, authorizes them and then turns them into static files inside a remote git repository for later consumption by a static site generator running in a [gh-pages](https://pages.github.com/) like environment or a dynamic web app that renders content from static files on disk.

It currently works but generates an inflexible Jekyll post file in a specific location in a repository and is undocumented!

## Currently Working

- [micropub](http://indiewebcamp.com/micropub) (posting)
- Simple File handling for small files in git.
- Support for a simple jekyll post schema.
- 

## Active Development

- Breaking down into small modules:
  - https://www.npmjs.com/package/quick-gits
  - https://www.npmjs.com/package/bepo

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
- Get added to the [Fork n Go](http://jlord.github.io/forkngo/) listing
- Migrate from express to [Hapi](https://github.com/hapijs/hapi)
