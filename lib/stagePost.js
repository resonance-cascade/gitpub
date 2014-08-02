// stagePost.js
//
// This module takes an incoming request object, prepares a post file referencing
// any files, and schedules other tasks such as POSSE or PESSOS and webmentions.


var moment = require('moment');
var yaml = require('js-yaml');
var async = require('async');
var fs = require('fs-extra');

var debug = require('debug')('lib:stage');

var settings = require('../settings');
//var template = fs.readFileSync(path.join(__dirname,'postTemplate.ejs'), 'utf8');

module.exports = function (req, res, next) {

  function setFm(cb) {
    var fm = {
      h: req.body.h || null,
      published: moment(req.body.published).format() || moment().format() || null,
      category: req.body.category || null,
      location: req.body.location || null,
      'place-name': req.body['place-name'] || null,
      'in-reply-to': req.body['in-reply-to'] || null,
      'syndicate-to': req.body['syndicate-to'] || null,
      client_id: req.tokenData.client_id || null,
      client: req.tokenData.client || null,
      scope: req.tokenData.scope || null
    };

    if(req.files) {
      fm.files = [];
      req.files.map(function (file) {
        var fileInfo = {
          filename: file.filename || null,
          fieldname: file.fieldname || null,
          encoding: file.encoding || null,
          mimetype: file.mimetype || null,
          webPath: file.webPath || null,
          savePath: file.savePath || null
        };
        fm.files.push(fileInfo);
      });
    }
    cb(fm);
  }

  setFm(function(fm) {
    console.log(fm);
    console.log(yaml.safeDump(fm, {skipInvalid: true}));
  });
}











//function classifyPostType (body) {
//
//}
//
//function preparePost (argument) {
//  // Create yaml object
//  // Combine with content
//
//  var published = moment(req.body.published) || moment();
//  var postContents = ejs.render(template, incomingData);
//  var rendered = ejs.render(template, incomingData);
//
//function finalizePost (argument) {
//  // Save post to disk in correct location
//  var jekyllPostFile = path.join(settings.worktree, '_posts', 'ownyourgram',jekyllName);
//
//  fs.writeFile(jekyllPostFile, postContents, function(err) {
//    if (err) throw err;
//    debug('I did it');
//    callback();
//  });
//}
//
//function generateSlug (argument) {
//  // Prepare a title/slug/fileName from
//  // req.body properties and fallbacks
//
//  var fileTitleSafe = req.content.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/-$/,'');
//  var fileName = published.format('YYYY-MM-DD') + '-' + fileTitleSafe + '.md';
//}

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
//      savePath
//      webPath
