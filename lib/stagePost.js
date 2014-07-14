// stagePost.js
// This will likely need a lot of work and will be subject to opinion

var moment = require('moment');
var debug = require('debug')('lib:stage');

module.exports = function (req, res, next) {
  
  // This takes the content and removes and does some stuff. 
  // TODO: Fix file title/slug generator since it does not work in all cases!
  var fileTitle = req.content.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/-$/,'');
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