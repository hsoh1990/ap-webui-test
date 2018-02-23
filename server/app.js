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

require('./server.js')(app, fs, url);

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
  secret: '@#@$MYSIGN#@$#$',
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serializeUser() 호출됨.');
  console.dir(user);

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializeUser() 호출됨.');
  console.dir(user);

  done(null, user);
});

var LocalStrategy = require('passport-local').Strategy;

passport.use('local-login', new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, id, password, done) {
  if (id === 'admin' && password === '12341234') {
    return done(null, {
      'user_id': id,
    });
  } else {
    return done(false, null)
  }
}))

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

require('./package_set.js')(app, fs, url, isAuthenticated);
