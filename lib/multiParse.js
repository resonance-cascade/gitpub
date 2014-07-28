var debug = require('debug')('lib:multiParse');
var inspect = require('util').inspect;

var settings = require('../settings');

module.exports = function (req, res, next) {
  debug(req.get('Content-Type'));
  if ( req.is('multipart') ) {
    debug('Its multipart!')
    // Handle file
    req.busboy.on('file', function(fieldname,file,filename,encoding,mimetype) {

      if (!req.files) req.files = [];

      req.files.push({
        "filename": filename,
        "file": file,
        "fieldname": fieldname,
        "encoding": encoding,
        "mimetype": mimetype
      });

      // Debug Info
      debug('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding)

      file.on('data', function(data) {
        debug('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        debug('File [' + fieldname + '] Finished');
      });

    });

    // Handle fields
    req.busboy.on('field', function(fieldname,val,fieldnameTruncated,valTruncated) {
      debug('Field [' + fieldname + ']: value: ' + inspect(val));
      req.body[fieldname] = val;
    });

    // Handle the finished event.
    req.busboy.on('finish', function() {
      debug('Busboy: finish - Done parsing form.');
      next();
    })

    // Busboy, Do it!
    req.pipe(req.busboy);

  } else {
    debug('Nope, not multipart')
    next();
  }
}
