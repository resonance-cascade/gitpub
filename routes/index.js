var express = require('express');
var router = express.Router();
var debug = require('debug')('routes:index');
var request = require ('request');
var qs = require('querystring');
var busboy =  require('connect-busboy');
var inspect = require('util').inspect;
var ejs = require('ejs');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

var settings = require('../settings');
var template = fs.readFileSync(path.join(__dirname,'postTemplate.ejs'), 'utf8');

var Git = require('git-wrapper');
var git = new Git({
      'work-tree': settings.worktree,
      'git-dir': settings.gitdir
    });

function clone (url, callback) {
  var gitC = new Git();
  gitC.exec('clone', null, [url], callback);
}

var repoPath = settings.worktree;

function deBug (err, msg) {
  if (err) throw err;
  debug(msg || 'Cloned');
}

var cloned = false;

var authedHttp = 'https://' + process.env.USERNAME + ':' + process.env.PASSWORD + '@github.com/' + settings.github.user + '/' + settings.github.repo + '.git';

fs.exists(repoPath, function (exists){
  if (exists === true) {
    // If the repo folder exists do something
    debug('aready cloned...');
    git.exec('pull', function (err, msg) {
      deBug(err,msg);
      cloned = true;
    });
  } else {
    // If it does not exist clone it!
    debug('cloning...');
    clone(authedHttp, function (err, msg) {
      deBug(err,msg);
      cloned = true;
    });
  }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gitpub µPub Endpoint', status: cloned  });
});

router.post('/', busboy(), function (req, res) {
  var token = req.get('Authorization') || req.body.access_token;

  var options = {
    method: 'GET',
    url: settings.tokenUrl,
    headers: { 'Authorization': token }
  };

  function checkRes(error, response, body) {
    if (!error && response.statusCode === 200) {
      var tokenData = qs.parse(body);

      if (tokenData.me === settings.domain) {
        var incomingData = {};

        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          incomingData.filename = filename;
          incomingData.encoding = encoding;
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding);
          file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
          });
          file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
          });
          var saveTo = path.join(repoPath,'media', 'ownyourgram', path.basename(filename));
          file.pipe(fs.createWriteStream(saveTo));
        });

        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
          console.log('Field [' + fieldname + ']: value: ' + inspect(val));
          incomingData[fieldname] = val;
        });

        req.busboy.on('finish', function() {
          console.log('Done parsing form!');
          createPost(req, incomingData,  function() {
            git.exec('add',{A: true}, ['media', '_posts/ownyourgram'], function (err, msg) {
              console.log(err);
              console.log(msg);
              git.exec('commit', {m: true},  ["'Ownyourgram posted a file'"], function(err,msg){
                console.log(err);
                console.log(msg);
                git.exec('push', null, ['origin', 'master'], function(err,msg){
                  var postPath = tokenData.me + '/testpost';
                  res.set('Location', postPath);
                  res.send(201, 'Created Post at ' + postPath);
                  console.log(err);
                  console.log(msg);
                });
              });
            });
          });
        });

        req.pipe(req.busboy);
      } else {
        res.send(403,'You gotta be authorized to do that');
      }
    } else {
        res.send(500, error.name + ': ' + error.message || 'Something went terribly wrong');
    }
  }


  function createPost(req, incomingData, callback) {
    var fileTitle = incomingData.content.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/-$/,'');
    var date = moment(incomingData.published);
    var jekyllName = date.format('YYYY-MM-DD') + '-' + fileTitle + '.md';
    var jekyllPostFile = path.join(settings.worktree, '_posts', 'ownyourgram',jekyllName);
    var postContents = ejs.render(template, incomingData);
    var rendered = ejs.render(template, incomingData);

    console.log(jekyllPostFile);

    fs.writeFile(jekyllPostFile, postContents, function(err) {
      if (err) throw err;
      console.log('I did it');
      callback();
    });
  }

  if (token) {
    request(options, checkRes);
  } else {
    res.send(401, 'Unauthorized: No token was provided');
  }

});

module.exports = router;
