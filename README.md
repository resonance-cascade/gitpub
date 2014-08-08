gitpub
======

[![Build Status](https://travis-ci.org/bcomnes/gitpub.svg)](https://travis-ci.org/bcomnes/gitpub)
[![Dependency Status](https://gemnasium.com/bcomnes/gitpub.svg)](https://gemnasium.com/bcomnes/gitpub)


An experimental publishing tool that takes incoming http requests, authorizes them and then turns them into static content files inside a remote git repository for later consumption by a static site generator running in a [gh-pages](https://pages.github.com/) like environment or a dynamic web app that renders content from static files on disk.

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
- Conflict Management and 3 way merges.
