// Test Post Route
var express = require('express');
var router = express.Router();
var url = require('url');

var settings = require('../settings');

/* GET Test Form */
router.get('/', function(req, res) {
  res.render('post', { title: 'Test Post'});
});

module.exports = router;