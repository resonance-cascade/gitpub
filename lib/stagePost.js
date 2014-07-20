// stagePost.js
//
// This module takes an incoming request object, sees the files
// to their final destination, prepares a post file, and schedules
// other tasks such as POSSE or PESSOS and webmentions.
//
// Useful/micropub req.body properties
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
//  req.token:
//    me
//    client_id
//    scope
//    #date_issued

var moment = require('moment');
var debug = require('debug')('lib:stage');

module.exports = function (req, res, next) {

  // This takes the content and removes and does some stuff.
  // TODO: Fix file title/slug generator since it does not work in all cases!
  // TODO: Make fileTitleSafe have more fallbacks
  var fileTitleSafe = req.content.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/-$/,'');
  // Get the date from the req or generate it
  var published = moment(req.body.published) || moment();
  // Generate the name of the file.
  var fileName = published.format('YYYY-MM-DD') + '-' + fileTitleSafe + '.md';
  // Generate save Path.
  var jekyllPostFile = path.join(settings.worktree, '_posts', 'ownyourgram',jekyllName);

  var postContents = ejs.render(template, incomingData);

  var rendered = ejs.render(template, incomingData);

  console.log(jekyllPostFile);

  fs.writeFile(jekyllPostFile, postContents, function(err) {
    if (err) throw err;
    debug('I did it');
    callback();
  });
}