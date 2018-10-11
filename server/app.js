global.interface = require('./config').interface;
global.apHubUrl = require('./config').apHubUrl;
global.wlan = require('./config').wlan;

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
var cookie = require('cookie-parser');
var passport = require('passport');
var cors = require('cors');
app.use(cors());
require('./server.js')(app, fs, url);

require('./init-ui-db').runWebUiInitDb();
app.engine('html', require('ejs').renderFile);
var server = app.listen(80, function() {
  console.log("RaspAP server has started on port 80");
});

app.use(cookie());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + "/index/js"));
app.use('/js', express.static(__dirname + "/package/system/js"));
app.use('/js', express.static(__dirname + "/package/dashboard/js"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'LeeJinWoo',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 600000 }//600000 = 10분
}));

require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());



var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

app.get('/logout', isAuthenticated, function(req, res) {
  console.log("로그아웃 확인");
  req.logout();
  res.redirect('/');
});

require('./package_set.js')(app, fs, url, isAuthenticated, passport);
