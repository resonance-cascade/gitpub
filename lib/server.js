var debug = require('debug')('gitpub');
var app = require('../app');
var settings = require('../settings');

var server
var Repo = require('../lib/repo');

function startServer (cb) {
  app.set('port', process.env.PORT || 3000);

  app.locals.repo = new Repo(settings);
  app.locals.repo.init(function() {
    server = app.listen(app.get('port'), function() {
      debug('Express server listening on port ' + server.address().port);
      if (cb) cb();
    });
  });
}

function stopServer (cb) {
  var port = server.address().port;
  server.close(function() {
    debug('Express server running on port ' + port + ' closed.');
    if (cb) cb();
  });
}

exports.start = startServer;
exports.stop = stopServer;