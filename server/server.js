var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var exec = require('child_process').exec,
  child;
var path = require('path');


app.set('views', [
  __dirname + '/index',
  __dirname + '/package/dashboard',
  __dirname + '/package/system',
  __dirname + '/package/wpaconfig'
]);

app.engine('html', require('ejs').renderFile);


var server = app.listen(80, function() {
  console.log("RaspAP server has started on port 80");
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  saveUninitialized: true,
  resave: false
}));

require('./index/main.js')(app, fs, url);
require('./package/dashboard/main.js')(app, fs, url);
require('./package/system/main.js')(app, fs, url);
require('./package/wpaconfig/main.js')(app, fs, url);
//require('./package/auth/main.js')(app, fs, url);
//require('./package/dhcpserver/main.js')(app, fs, url);
//require('./package/hotspot/main.js')(app, fs, url);
//require('./package/networking/main.js')(app, fs, url);
//require('./package/theme/main.js')(app, fs, url);
