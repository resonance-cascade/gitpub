// jsonify.js
// objectify and methodize micropub requests
// Score points for reducing the size of this module
// This whatever micropub parses to, and cleans it up for easy use later.

var moment = require('moment');
var url = require('url');

module.exports = function(req, res, next) {
  // Attatch moment format matheods to dates
  req.body.published = moment(req.body.published) || moment();
  // Turn text fields into arrays
  // Oauth scope fields are space separated :(
  splitter(req.tokenData, 'scope', ' ');
  // Micropub csv fields will be adopting form-arrays soon.
  // TODO: Only parse if not an array
  splitter(req.body, 'syndication', ',');
  splitter(req.body, 'syndicate-to', ',');
  splitter(req.body, 'category', ',');
  // Query and parse for field information
  if (req.body['syndicate-to']) req.body['syndicate-to'] = req.body['syndicate-to'].map(syndObj);
  next();
}

function splitter(obj, field, split) {
  if (obj[field]) obj[field] = obj[field].split(split);
}

function syndObj(syndicateTo) {
  var syndObj
  syndObj = {
    name: url.parse(syndicateTo).hostname,
    url: url.parse(syndicateTo).href
  }
  return syndObj;
}

// TODO: Query tokendata for metadata
