var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wilson F. wang' });
});

router.get('/resume', function(req, res, next) {
  res.redirect('/files/Resume.pdf');
})

module.exports = router;
