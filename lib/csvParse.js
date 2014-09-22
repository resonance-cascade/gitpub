var async = require('async');

module.exports = function (req, res, next) {
  async.parallel([
  splitter(req.body, 'syndication'),
  splitter(req.body, 'syndicate-to')
  ],
  function(err, results) {
    if (err) next(err);
    next();
  });
}

function splitter (obj, field) {
  return function(cb) {
    if (obj[field]) obj[field] = obj[field].split(',');
    cb();
  }
}


