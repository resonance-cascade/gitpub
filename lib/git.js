var cp = require('child_process');
var path = require('path');
var fs = require('fs-extra');

var gitBin = 'git';


function git(workpath) {
  var self;

  var fullwp = path.resolve(workpath);
  var exec = [gitBin, '-C ' + fullwp].join(' ');
  var execFile = ['-C', fullwp];
  var self;

  function clone(remote, cb) {
    fs.ensureDir(path.dirname(fullwp), function(err) {
      if (err) return cb(err);
      cp.execFile(gitBin, ['clone', remote, fullwp], cb)
    })
  }



  function init(cb) {
    fs.ensureDir(fullwp, function(err) {
      if (err) return cb(err);
      cp.execFile(gitBin, ['init', fullwp], cb)
    })
  }


  function gitRun(args /*[[, options], callback] */ ) {

    switch (args.constructor) {

      case String:

        arguments[0] = [exec, args].join(' ');
        cp.exec(arguments[0], arguments[1], arguments[2])

        break;
      case Array:
        arguments[0] = execFile.concat(args)
        if (arguments.length === 2) { //TODO Eliminate this if else
          cp.execFile(gitBin, arguments[0], arguments[1])
        } else {
          cp.execFile(gitBin, arguments[0], arguments[1], arguments[2])
        }
        break;
    }
  }

  self = gitRun;
  self.init = init;
  self.clone = clone;

  return self;
}


module.exports = git;
