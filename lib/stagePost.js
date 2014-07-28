// stagePost.js
//
// This module takes an incoming request object, sees the files
// to their final destination, prepares a post file, and schedules
// other tasks such as POSSE or PESSOS and webmentions.

var moment = require('moment');
var debug = require('debug')('lib:stage');
var async = require('async');
var fs = require('fs-extra');

var settings = require('../settings');
var template = fs.readFileSync(path.join(__dirname,'postTemplate.ejs'), 'utf8');

module.exports = function (req, res, next) {


}

function handleFiles (files) {
  // TODO: File handler selector and handlers

  // Save to git
  var saveDir = path.join(settings.worktree,settings.mediaFolder,req.tokenData.client_id)

  fs.ensureDir(saveDir, function(err) {
    if (err) next(err);
    for (file in files) {
      var saveTo = path.join(saveDir, path.basename(filename));
      file.pipe(fs.createWriteStream(saveTo));
    }
    var saveTo = path.join(saveDir, path.basename(filename));
    file.pipe(fs.createWriteStream(saveTo));
  })
}

function classifyPostType (argument) {
  // Notes
  // Notes with photos
}

function preparePost (argument) {
  // Create yaml object
  // Combine with content

  var published = moment(req.body.published) || moment();
  var postContents = ejs.render(template, incomingData);
  var rendered = ejs.render(template, incomingData);

function finalizePost (argument) {
  // Save post to disk in correct location
  var jekyllPostFile = path.join(settings.worktree, '_posts', 'ownyourgram',jekyllName);

  fs.writeFile(jekyllPostFile, postContents, function(err) {
    if (err) throw err;
    debug('I did it');
    callback();
  });
}

function generateSlug (argument) {
  // Prepare a title/slug/fileName from
  // req.body properties and fallbacks

  var fileTitleSafe = req.content.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/-$/,'');
  var fileName = published.format('YYYY-MM-DD') + '-' + fileTitleSafe + '.md';
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
//    place_name
//    in-reply-to
//    syndicate-to = http://twitter.com/bretolius
//
//  req.tokenData:
//    me
//    client_id
//    scope
//    #date_issued