var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var busboy =  require('connect-busboy');
var debug = require('debug')('gitpub:app');

var routes = require('./routes/index');
var micropub = require('./routes/micropub');
var post = require('./routes/post');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);
app.use('/micropub', micropub);
app.use('/post', post);
//TODO: webmention client


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handlers
// will print stacktrace
debug('env: ' + app.get('env'));
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
