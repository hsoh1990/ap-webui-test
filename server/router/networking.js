var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  exports.savedata_();
  fs.readFile(__dirname + "/../data/networking/" + "summary.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    res.send(wpaconfigdata);
  })
}
exports.savedata_ = function () {
  child = exec("ls /sys/class/net | grep -v lo", function (error, stdout1, stderr) {
    var arr = stdout1.split("\n");
    var cs_data = {};//오브젝트
    for(var a = 0;a < arr.length;a++){
      cs_data[a] = arr[a];
    }
    console.log(arr[0]);
    var result_data = {};
    for(var i = 0;i < arr.length - 1;i++){
      child = exec("ip a show " + arr[i], function (error, stdout2, stderr) {
        var eth = {};
        eth[String(arr[i])] = stdout2.replace(/\n/gi, "<br>");
        var eng = "current_setting_" + String(arr[i]);
        result_data[eng] = eth;
        console.log(result_data);
        console.log("----------------------------------------------------");
      });
    }
    console.log("! == " + JSON.stringify(result_data));
    fs.writeFile(__dirname + "/../data/networking/" + "summary.json",
      JSON.stringify(result_data, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
      })
  });
}
exports.api_post = function (req, res) {
  req.accepts('application/json');
  // input message handling
  var result = {};
  var adapt_name = req.query.adaptname;
  json = req.body;
  exports.api_post_datasave(req, res, adapt_name, result);
}
exports.api_post_datasave = function (req, res, adapt_name, result) {
  // output message
  fs.readFile(__dirname + "/../data/networking/" + "connecting_lan_data.json", 'utf8', function(err, data) {
    var users = JSON.parse(data);
    // ADD TO DATA
    users[adapt_name] = req.body;

    // SAVE DATA
    fs.writeFile(__dirname + "/../data/networking/" + "connecting_lan_data.json",
      JSON.stringify(users, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
        res.json(result);
      })
  })
}
