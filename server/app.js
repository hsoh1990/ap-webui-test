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
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

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
  secret: 'LeeJinWoo',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 600000 }//600000 = 10분
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

passport.use(new GoogleStrategy({
        clientID: '93407170622-6aj2r2k85m4td8hk2jf250h96tv0asac.apps.googleusercontent.com',
        clientSecret: 'jayLRcvfHCrirMwbpuGrnDs4',
        callbackURL: 'http://172.16.171.181/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            user = profile;
            return done(null, user);
        });
    }
));

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
