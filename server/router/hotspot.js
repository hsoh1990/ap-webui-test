var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/hotspot/" + "hotspotdata.json", 'utf8', function(err, data) {
    var hotspotdata = JSON.parse(data); //json text -> json object
    child = exec("cat /etc/hostapd/hostapd.conf", function (error, stdout, stderr) {
    console.log('hostapd: ' + stdout);
    var arr = stdout.split("\n");
    //console.log('split: ' + arr[0]);
    console.log('split: ' + arr[0]);
    //console.log('split: ' + arr[2]);
    //console.log('split: ' + arr[3]);
    });
    res.send(hotspotdata);
  })
}

exports.api_post_basic = function (req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "basicdata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(result);
    })
}

exports.api_post_security = function (req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "securitydata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(result);
    })
}

exports.api_post_advanced = function (req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "advanceddata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(result);
    })
}
