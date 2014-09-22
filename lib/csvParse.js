var async = require('async');

module.exports = function (req, res, next) {
  console.log(req.body.syndication)
  console.log(req.body['syndicate-to'])
  async.parallel([function(cb){
    if (req.body.syndication) {
      req.body.syndication = req.body.syndication.split(',')
    }
    cb(null);
  },
  function(cb) {
    if (req.body['syndicate-to']) {
      req.body['syndicate-to'] = req.body['syndicate-to'].split(',')
    }
    cb(null);
  }],
  function(err, results) {
    console.log(req.body.syndication)
    console.log(req.body['syndicate-to'])
    if (err) next(err);
    next();
  })
}


function splitter (obj, field) {
  return function(cb) {
    obj[field] = obj[field].split(',');
    cb();
  }
}


