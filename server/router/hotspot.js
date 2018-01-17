var fs = require("fs");
var exec = require('child_process').exec,
  child;

exports.api_get = function(req, res) {
  fs.readFile(__dirname + "/../data/hotspot/" + "hotspotdata.json", 'utf8', function(err, data) {
    var hotspotdata = JSON.parse(data); //json text -> json object
    child = exec("cat /etc/hostapd/hostapd.conf", function(error, stdout, stderr) {
      console.log('hostapd: ' + stdout);
      var arr = stdout.split("\n");
      //console.log('split: ' + arr[0]);
      for (var i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i].split("=");
        console.log('split: ' + arr[i][0] + ", " + arr[i][1]);
      }
      exports.savedata_dasic(arr);

    });
    res.send(hotspotdata);
  })
}
exports.savedata_dasic = function(arr) {
  var basic_data = {}; //오브젝트
  basic_data["type"] = "basic";
  basic_data["interface"] = arr[0][1];
  basic_data["ssid"] = arr[2][1];
  basic_data["wireless_mode"] = arr[3][1];
  basic_data["channel"] = arr[4][1];
  console.log(JSON.stringify(basic_data));
  // SAVE DATA
  fs.writeFile(__dirname + "/../data/hotspot/" + "basicdata.json",
    JSON.stringify(basic_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}

exports.api_post_basic = function(req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "basicdata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(result);
    })
}

exports.api_post_security = function(req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "securitydata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(result);
    })
}

exports.api_post_advanced = function(req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "advanceddata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(result);
    })
}
