// stagePost.js
//
// This module takes an incoming request object, prepares a post file referencing
// any files, and schedules other tasks such as POSSE or PESSOS and webmentions.


var moment = require('moment');
var yaml = require('js-yaml');
var async = require('async');
var fs = require('fs-extra');
var jade = require('jade');
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
    var fmObj = {
      h: req.body.h || null,
      date: pub.format() || moment().format() || null,
      category: req.body.category || null,
      location: req.body.location || null,
      'place-name': req.body['place-name'] || null,
      'in-reply-to': req.body['in-reply-to'] || null,
      'syndicate-to': req.body['syndicate-to'] || null,
      client_id: req.tokenData.client_id || null,
      client: req.tokenData.client || null,
      scope: req.tokenData.scope || null,
      files: req.files || null,
      published: true,
      syndicate: req.body.syndicate || null
    };
    req.fm = yaml.safeDump(fmObj, {skipInvalid: true})
    cb(null);
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
    fullPost = [null,yaml,content].join(separator + '\n');
    var postDir = path.join(settings.worktree,
                                  '_posts',
                                  req.tokenData.client);
    var postPath = path.join(postDir, req.body.postFileName);
    debug('Writing Post to: '+ postPath);
    fs.ensureDir(postDir, function(err) {
      if (err) next(err);
      fs.writeFile(postPath, fullPost, cb);
    })
  }
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
