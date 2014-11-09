var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'FM.javapk.net' });
});
router.get('/item/:id', function(req, res) {
  var id = req.params.id;
  console.log(id)
  res.render('item', { title: 'Item' });
});
module.exports = router;
