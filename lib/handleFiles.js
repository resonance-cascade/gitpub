var debug = require('debug')('lib:files');
var fs = require('fs-extra');
var path = require('path');
var async = require('async');

var settings = require('../settings');

// TODO: File handler selector and handlers
module.exports = function (req, res, next) {
  debug('Looking for Files');
  if (req.files) {
    debug('Yes there are files')
    // Git FS File Handler
    var saveDir = path.join(settings.worktree,
                            settings.mediaFolder,
                            req.tokenData.client);
    var webDir = path.join(settings.mediaFolder,
                            req.tokenData.client);
    debug('saveDir: ' + saveDir);
    debug('webDir: ' + webDir);


    function saveToDisk (file, cb) {
      debug('Trying to Save ' + file.filename + ' to Disk');

      var filename = path.basename(file.filename);
      file.savePath = path.join(saveDir, filename);
      file.webPath = path.join('/',webDir, filename);

      debug('savePath: ' + file.savePath);
      debug('webPath:' + file.webPath);

      var writeStream = fs.createWriteStream(file.savePath)

      writeStream.on('finish', function(cb) {
        debug(file.filename + ' saved to Disk.');
        cb();
      });

      writeStream.on('error', cb);
      writeStream.on('start', function() {
        debug('fs Start');
      });
      writeStream.on('end', function() {
        debug('End event caught');
      });

      file.fileData.pipe(writeStream);
    }

    fs.ensureDir(saveDir, function(err) {
      if (err) next(err);
      debug('Saving files');

      async.each(req.files, saveToDisk, function (err) {
        if (err){
          debug(err);
          next(err);
        }
        debug('Files Saved to Disk');
        next();
      });
    });

  } else {
    debug('No files to handle.');
    next();
  }
}
