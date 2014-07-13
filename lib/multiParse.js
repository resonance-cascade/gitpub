var settings = require('../settings');

module.exports = function = function(req, res, next) {
  if (req.is('multipart')) {
    var fileData;
    // Handle file
    req.busboy.on('file', function( fieldname,
                                    file,
                                    filename,
                                    encoding,
                                    mimetype) {
      req.mp.filename = filename;
      req.mp.encoding = encoding;
      req.mp.file = file;
    });
    // Handle fields
    req.busboy.on('field', function(fieldname, 
                                    val, 
                                    fieldnameTruncated, 
                                    valTruncated) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
      req.mp[fieldname] = val;
    });
    // Handle the finished event.
    req.busboy.on('finish', function() {
      next();
    })
  } else {
    next();
  }
}
