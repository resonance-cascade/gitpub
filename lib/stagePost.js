// stagePost.js
//
// This module takes an incoming request object, prepares a post file referencing
// any files, and schedules other tasks such as POSSE or PESSOS and webmentions.


var moment = require('moment');
var yaml = require('js-yaml');
var async = require('async');
var fs = require('fs-extra');
var jade = require('jade');
var url = require('url');
var path = require('path');

var debug = require('debug')('lib:stage');

var separator = '---';
var settings = require('../settings');

module.exports = function (req, res, next) {
  var pub = moment(req.body.published);
  debug('Staging Post');

  async.series([setFm,generateSlug,createPostFile],next)

  function setFm(cb) {
    debug('Setting Front Matter')
    req.fmObj = {
      h: req.body.h || undefined,
      date: pub.format('YYYY-MM-DD HH:mm') ||
            moment().format('YYYY-MM-DD HH:mm') || undefined,
      tags: req.body.category || undefined,
      location: req.body.location || undefined,
      'place-name': req.body['place-name'] || undefined,
      'in-reply-to': req.body['in-reply-to'] || undefined,
      'syndicate-to': req.body['syndicate-to'] || undefined,
      client_id: req.tokenData.client_id || undefined,
      client: req.tokenData.client || undefined,
      scope: req.tokenData.scope || undefined,
      files: req.files || undefined,
      published: true,
      syndicate: syndObj(req.tokenData.syndication) || undefined
    };
    req.fm = yaml.safeDump(req.fmObj, {skipInvalid: true})
    cb();
  }

  function generateSlug(cb) {
    debug('Generating Slug')
    var tcontent = req.body.content.split('\n')[0].substring(0,20);
    debug('tcontent: ' + tcontent);
    req.body.tcontent = tcontent;
    var tcontentFileSafe = tcontent.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/-$/,'');
    var fileName =  pub.format('YYYY-MM-DD') + '-' + tcontentFileSafe + '.md';
    debug('fileName: ' + fileName);
    req.body.postFileName = fileName;
    req.slug = [pub.format('/YYYY/MM/DD'),tcontentFileSafe].join('/');
    cb(null);
  }

  function createPostFile(cb){
    debug('Rendering Post');
    var yaml = req.fm;
    var content = req.body.content;
    var fullPost = [null,yaml,content].join(separator + '\n');
    var postDir = path.join(settings.worktree,
                                  '_posts',
                                  req.tokenData.client);
    var postPath = path.join(postDir, req.body.postFileName);
    debug('Writing Post to: '+ postPath);
    if (req.test) {
      //TODO: Bad bret.  Dont do this.
      req.fullPost = fullPost;
      req.postPath = postPath;
      cb();
    } else {
      fs.ensureDir(postDir, function(err) {
        if (err) next(err);
        fs.writeFile(postPath, fullPost, cb);
      })
    }
  }
}

function syndObj (syndication) {
  var obj
  if (syndication) {
    obj = {
      name: url.parse(syndication).hostname,
      url: url.parse(syndication).href
    }
  }
  return obj
}

// Micropub Fields:
// ================
// See: http://indiewebcamp.com/micropub
// (# indicates values that are not used yet)
//
// req.body:
//    h (entry, #card, #event, #cite)
//    #name
//    #summary
//    content (string)
//    published (Date String)
//    #updated
//    category = tag1, tag2, tag3 (CSV string?)
//    #slug
//    location
//      as a Geo URI, for example geo:45.51533714,-122.646538633
//    place-name
//    in-reply-to
//    syndicate-to = http://twitter.com/bretolius
//
//  req.tokenData:
//    me
//    client_id
//    scope
//    #date_issued
//
//  req.files[file]
//    file
//      filename
//      file
//      fieldname
//      encoding
//      mimetype
//      --------
//      savePath
//      webPath
