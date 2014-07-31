var debug = require('debug')('lib:files');
var fs = require('fs-extra');

var settings = require('../settings');

// TODO: File handler selector and handlers
module.exports = function (req, res, next) {
  if req.files {
    // Git FS File Handler
    var saveDir = path.join(settings.worktree,
                            settings.mediaFolder,
                            req.tokenData.client_id);
    var webDir = path.join(settings.mediaFolder,
                            req.tokenData.client_id);

    function saveToDisk (file, cb) {
      var filename = path.basename(file.filename);
      file.savePath = path.join(saveDir, filename);
      file.webPath = path.join('/',webDir, filename);

      var writeStream = fs.createWriteStream(file.savePath)

      file.pipe(writeStream);

      writeStream.on('finish', function() {
        debug(file.filename + ' saved to Disk.');
        cb(null);
      });

      writeWStream.on('error', cb);
    }

    fs.ensureDir(saveDir, function(err) {
      if (err) next(err);

      async.each(req.files, saveToDisk, function (err) {
        if (err) next(err);
        debug('Files Saved to Disk');
        next(null);
      });
    });

  } else {
    debug('No files to handle.');
    next();
  }
}
