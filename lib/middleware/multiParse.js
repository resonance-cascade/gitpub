var multiparty = require('multiparty');

exports.parse = function() {
  return function (req, res, next) {
    console.log(req.is(['multipart']));
    console.log(req.get('Content-Type'));
    if (req.is('multipart/form-data') === true) {
      var form = new multiparty.Form();
      form.parse(req, function(err, fields, files) {
        if (err) return next(err);
        console.log(err);
        console.log(fields);
        console.log(files);
        console.log('multipart!');
        next();
      });
    } else {
      console.log('not multipart');
      next();
    }
  }
}