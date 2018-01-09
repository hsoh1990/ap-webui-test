var express = require('express');
var app = express();
var router = require('./router/main')(app);

app.set('',__dirname + '../');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(80, function() {
  console.log("Express server has started on port 80");
})
