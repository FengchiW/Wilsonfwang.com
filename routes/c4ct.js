var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('class4corona/index', { title: 'Wilson F. wang' });
});

module.exports = router;
