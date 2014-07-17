// stagePost.js
// This will likely need a lot of work and will be subject to opinion

// Useful/micropub req.body properties
// See: http://indiewebcamp.com/micropub
// h=entry
//    #name
//    #summary
//    content
//    published
//    #updated
//    category = tag1, tag2, tag3
//    #slug
//    location
//      as a Geo URI, for example geo:45.51533714,-122.646538633
//    place_name
//    in-reply-to
//    syndication
//      Pass one or more URLs pointing to places where this 
//      entry already exists. Can be used for PESOS implementations.
//    syndicate-to = http://twitter.com/aaronpk, http://alpha.app.net/aaronpk, http://facebook.com/aaronpk, etc.
// ...more.
//
// Also don't forget to check for the handle the req.files
//
//  req.token also contains the following properties:
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
    console.log('I did it');
    callback();
  });
}