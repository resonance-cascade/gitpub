// publishPost.js
//
// Commits new files to repo, pulls repo, then pushes and
// Returns the published URL...

// TODO Pull here.
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