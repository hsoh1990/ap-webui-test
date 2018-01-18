var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  exports.savedata_();
  fs.readFile(__dirname + "/../data/networking/" + "summary.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    var select_lan = "eth0";
    child = exec("ip a show " + select_lan, function (error, stdout, stderr) {
    console.log("stdout: " + stdout);
    });
    res.send(wpaconfigdata);
  })
}
exports.savedata_ = function () {
  child = exec("ls /sys/class/net | grep -v lo", function (error, stdout1, stderr) {
    var arr = stdout.split("\n");
    var cs_data = {};//오브젝트
    for(var a = 0;a < arr.length;a++){
      cs_data[a] = arr[a];
    }
    child = exec("ip a show " + arr[0], function (error, stdout2, stderr) {
      var eth = {};
      eth['eth0'] = stdout2;
      var result_data = {};
      result_data['current_setting_eth0'] = eth;
      console.log(result_data);
    });
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
