// Gitpub Default Route
var express = require('express');
var router = express.Router();
var debug = require('debug')('routes:index');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gitpub'  });
});

module.exports = router;