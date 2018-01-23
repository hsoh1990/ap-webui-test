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

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(80, function() {
  console.log("Express server has started on port 80");
});

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  store: new RedisStore(),
  secret: '@#@$MYSIGN#@$#$',
  saveUninitialized: true,
  resave: false
}));

var router = require('./router/main')(app, fs);
