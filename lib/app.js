var express = require('express');
var app = express();
var port = 18080;
app.get('/', function(req, res){
  res.send('hello world \n'+ process.version);

  // console.log('Listening on port %d', server.address().port);
});
app.listen(port);
console.log('Listening on port %d', port);
