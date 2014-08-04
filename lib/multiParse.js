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
  var fsDir = path.join(settings.worktree,
                          settings.mediaFolder,
                          req.tokenData.client);
  var srcDir = path.join( settings.mediaFolder,
                          req.tokenData.client);

  debug('Trying to Save ' + fileInfo.filename + ' to Disk');

  var filename = path.basename(fileInfo.filename);
  fileInfo.fsPath = path.join(saveDir, filename);
  fileInfo.workPath = path.join('/',
                                settings.mediaFolder,
                                req.tokenData.client);
  fileInfo.src = path.join('/',srcDir, filename);

  debug('fsPath: ' + fileInfo.savePath);
  debug('workPath: '+ fileInfo.workPath);
  debug('src:' + fileInfo.src);

  var writeStream = fs.createWriteStream(fileInfo.fsPath);
  writeStream.on('error', cb);

  fs.ensureDir(fsDir, function(err) {
    if (err) next(err);
    debug('Saving file ' + filename);
    fileStream.pipe(writeStream);
  });
}
