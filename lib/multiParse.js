var debug = require('debug')('lib:multiParse');
var inspect = require('util').inspect;

var settings = require('../settings');

module.exports = function (req, res, next) {
  debug('Content-Type: ' + req.get('Content-Type'));
  if ( req.is('multipart') ) {
    debug('Its multipart!')
    // Handle file
    req.busboy.on('file', function(fieldname,fileStream,filename,encoding,mimetype) {
      debug('The was a file field');

      if (filename) {
        debug('And it contains a file');

        if (!req.files) req.files = [];
        var fileInfo = {
          "filename": filename,
          "fieldname": fieldname,
          "encoding": encoding,
          "mimetype": mimetype
        };
        req.files.push(fileInfo);
        // Handle the readableStream;
        gitFs(fileInfo, fileStream);
      } else {
        debug('No file was submitted however');
        fileStream.resume(); // Kill the readableStream for these
      }

      // Debug Info
      debug('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding);

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

function gitFs(fileInfo, fileStream) {
  var saveDir = path.join(settings.worktree,
                          settings.mediaFolder,
                          req.tokenData.client);
  var webDir = path.join( settings.mediaFolder,
                          req.tokenData.client);

  debug('Trying to Save ' + fileInfo.filename + ' to Disk');

  var filename = path.basename(fileInfo.filename);
  fileInfo.savePath = path.join(saveDir, filename);
  fileInfo.webPath = path.join('/',webDir, filename);

  debug('savePath: ' + fileInfo.savePath);
  debug('webPath:' + fileInfo.webPath);

  var writeStream = fs.createWriteStream(fileInfo.savePath)
  writeStream.on('error', cb);

  fs.ensureDir(saveDir, function(err) {
    if (err) next(err);
    debug('Saving file ' + filename);
    fileStream.pipe(writeStream);
  });
}
