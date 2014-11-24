// jsonify.js
// objectify and methodize micropub requests
// Score points for reducing the size of this module

var moment = require('moment');

module.exports = function(req, res, next) {
  req.body.published = moment(req.body.published) || moment();
  splitter(req.body, 'syndication', ',');
  splitter(req.body, 'syndicate-to', ',');
  splitter(req.body, 'category', ',');
  splitter(req.tokenData, 'scope', ' ');
  next();
}

function splitter(obj, field, split) {
  if (obj[field]) obj[field] = obj[field].split(split);
}
