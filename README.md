gitpub
======

[![release][release-image]][release-url]
[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![coverage][coverage-image]][coverage-url]
[![david][david-image]][david-url]
[![stability][stability-image]][stability-url]

[release-image]: https://img.shields.io/github/release/bcomnes/gitpub.svg?style=flat-square
[release-url]: https://github.com/bcomnes/gitpub/releases/latest
[npm-image]: https://img.shields.io/npm/v/gitpub.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/gitpub
[travis-image]: https://img.shields.io/travis/bcomnes/gitpub.svg?style=flat-square
[travis-url]: https://travis-ci.org/bcomnes/gitpub
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/bcomnes/gitpub.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/bcomnes/gitpub
[david-image]: https://img.shields.io/david/bcomnes/gitpub.svg?style=flat-square
[david-url]: https://david-dm.org/bcomnes/gitpub
[stability-image]: https://img.shields.io/badge/stability-1%20--%20experimental-orange.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index

An experimental publishing tool that takes incoming http requests, authorizes them and then turns them into static files inside a remote git repository for later consumption by a static site generator running in a [gh-pages](https://pages.github.com/) like environment or a dynamic web app that renders content from static files on disk.

It currently works but generates an inflexible Jekyll post file in a specific location in a repository and is undocumented!

## Currently Working

- [micropub](http://indiewebcamp.com/micropub) (posting)
- Simple File handling for small files in git.
- Support for a simple jekyll post schema.

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
- Robust file handling (S3, Dropbox, BitTorrent Sync, [Camlistore](https://camlistore.org/))
- Advanced syndication options ([POSSE](http://indiewebcamp.com/POSSE), [PESOS](http://indiewebcamp.com/PESOS))
- Support for arbitrary post templates and schema.
- Flexible pathing.
- Static Site Generator Agnostic
- Site Provisioning
- [One click deploy](https://blog.heroku.com/archives/2014/8/7/heroku-button)
- Administration Panel
- Automated Conflict Management and 3 way merges.
- Get added to the [Fork n Go](http://jlord.github.io/forkngo/) listing
- Migrate from express to [Hapi](https://github.com/hapijs/hapi)
