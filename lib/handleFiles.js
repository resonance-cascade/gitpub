var debug = require('debug')('lib:files');
var fs = require('fs-extra');

var settings = require('../settings');

// TODO: File handler selector and handlers
module.exports = function (req, res, next) {


  // Git FS File Handler
  function gitFiler (files) {
    var saveDir = path.join(settings.worktree,
                            settings.mediaFolder,
                            req.tokenData.client_id);
    var webDir = path.join(settings.mediaFolder,
                            req.tokenData.client_id);

    fs.ensureDir(saveDir, function(err) {
      if (err) next(err);
      for (file in files) {

        var filename = path.basename(file.filename);

        file.savePath = path.join(saveDir, filename);
        file.webPath = path.join(webDir, filename);
        file.pipe(fs.createWriteStream(file.savePath));
      }
    });
  }
}
