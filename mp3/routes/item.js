var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('item', { title: 'Item' });
});

module.exports = router;
