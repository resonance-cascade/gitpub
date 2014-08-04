gitpub
======

[![Build Status](https://travis-ci.org/bcomnes/gitpub.svg)](https://travis-ci.org/bcomnes/gitpub)
[![Dependency Status](https://gemnasium.com/bcomnes/gitpub.svg)](https://gemnasium.com/bcomnes/gitpub)


An experimental publishing tool that takes incoming http requests and turns them into content inside a remote git repository for later consumption by a static site generator.  So far it supports:

- [micropub](http://indiewebcamp.com/micropub) (posting)
- Simple File handling for small files in git.

Future plans:

- [micropub](http://indiewebcamp.com/micropub) (editing)
- [webmention](http://indiewebcamp.com/micropub)
- Robust file handling (S3, Dropbox, Bittorrent Sync, [Camlistore](https://camlistore.org/))
