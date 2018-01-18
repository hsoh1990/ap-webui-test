var fs = require("fs");
var exec = require('child_process').exec,
  child;
const { execSync } = require('child_process');

exports.api_get = function(req, res) {
  exports.test_();

  //exports.savedata_2(arr[0]);
  fs.readFile(__dirname + "/../data/networking/" + "summary.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    res.send(wpaconfigdata);
  })
}
exports.test_ = function() {
  var asd = execSync('ls /sys/class/net | grep -v lo');
  console.log(asd);
}
exports.savedata_1 = function() {
  child = exec("ls /sys/class/net | grep -v lo", function(error, stdout1, stderr) {
    if (error) throw error;
    console.log(stdout1);
    var arr = stdout1.split("\n");
    return arr;
  });
}
exports.savedata_2 = function(text) {
  child = exec("ip a show " + text, function(error, stdout2, stderr) {
    var eth = {};
    var result_data = {};
    eth[text] = stdout2.replace(/\n/gi, "<br>");
    console.log("eth : " + text);
    var eng = "current_setting_" + text;
    result_data[eng] = eth;
    console.log("eth : " + result_data);
  });
}
exports.api_post = function(req, res) {
  req.accepts('application/json');
  // input message handling
  var result = {};
  var adapt_name = req.query.adaptname;
  json = req.body;
  exports.api_post_datasave(req, res, adapt_name, result);
}
exports.api_post_datasave = function(req, res, adapt_name, result) {
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
