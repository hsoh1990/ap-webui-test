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
]);


require('./index/main.js')(app, fs, url);
require('./package/dashboard/main.js')(app, fs, url);
require('./package/system/main.js')(app, fs, url);
