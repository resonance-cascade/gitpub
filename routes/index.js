var express = require('express');
var router = express.Router();
var debug = require('debug')('routes:index');
var request = require ('request');
var qs = require('querystring');
var busboy =  require('connect-busboy');
var inspect = require('util').inspect;

var fs = require('fs');
var path = require('path');
var url = require('url');

var settings = require('../settings.js');

var Git = require('git-wrapper');
var git = new Git({
      'work-tree': settings.git.repo.worktree,
      'git-dir': settings.git.repo.gitdir
    });

function clone (url, callback) {
  var gitC = new Git();
  gitC.exec('clone', null, [url], callback);
}

var repoPath = settings.git.repo.worktree;

function deBug (err, msg) {
  if (err) throw err;
  debug(msg || 'Cloned');
}

var cloned = false;

var authedHttp = 'https://' + process.env.USERNAME + ':' + process.env.PASSWORD + '@github.com/bcomnes/bcomnes.github.io.git'

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
    debug('cloning...')
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

console.log(process.env.TESTVAR);

router.post('/', busboy(), function (req, res) {
  
  
  var token = req.get('Authorization') || req.body.access_token;
  console.log(req.body);
  console.log(req.body.access_token + " :access");
  console.log(token + " :token");

  var options = {
    method: 'GET',
    url: settings.tokenUrl,
    headers: { 'Authorization': token }
  }

  function checkRes(error, response, body) {
    if (!error && response.statusCode === 200) {
      var tokenData = qs.parse(body);
      if (tokenData.me === settings.authed) {
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding);
          file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
          });
          file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
          });
          var saveTo = path.join(repoPath,'media', path.basename(filename));
          file.pipe(fs.createWriteStream(saveTo));
        });
        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
          console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        });
        req.busboy.on('finish', function() {
          console.log('Done parsing form!');
          createPost(req, function() {
            git.exec('add',{A: true}, ['media'], function (err, msg) {
              console.log(err);
              console.log(msg);
              git.exec('commit', {m: true},  ['Ownyourgram posted a file'], function(err,msg){
                console.log(err);
                console.log(msg);
                git.exec('push', null, ['origin', 'master'], function(err,msg){
                  var postPath = tokenData.me + '/testpost';
                  res.set('Location', postPath)
                  res.send(201, 'Created Post at ' + postPath)
                  console.log(err);
                  console.log(msg);
                })
              });
            });
          })
        });
        req.pipe(req.busboy);
      } else {
        res.send(403,'You gotta be authorized to do that')
      }
    } else {
        res.send(500, error.name + ': ' + error.message || 'Something went terribly wrong');
    }
  }
  

  if (token) {
    request(options, checkRes);
  } else {
    res.send(401, 'Unauthorized: No token was provided');
  }

})

function createPost(req, callback) {
  console.log(req.body);
  callback();
}

module.exports = router;
