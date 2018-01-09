var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

/*
require('express')
const express = require('express');
const router = express.Router();


module.exports = function(app, fs)
{

     app.get('/',function(req,res){
         res.render('index', {
             title: "MY HOMEPAGE",
             length: 5
         })
     });

    app.get('/dashboard', function (req, res) {
       fs.readFile( __dirname + "/data/" + "dashboard.json", 'utf8', function (err, data) {
           console.log( data );
           res.end( data );
       });
    })
}
*/
