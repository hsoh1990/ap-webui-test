var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');

exports.api_get = function(req, res) {
  var qwe = exports.savedata_1();
  exports.savedata_2(qwe);
  fs.readFile(__dirname + "/data/" + "summary.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    res.send(wpaconfigdata);
  })
}
exports.savedata_1 = function() {
  const asd = execSync('ls /sys/class/net | grep -v lo', {
    encoding: 'utf8'
  });
  var arr = asd.split("\n");
  return arr;
}
exports.savedata_2 = function(text) {
  var result_data = {};
  for (var a = 0; a < text.length - 1; a++) {
    const stdout2 = execSync('ip a show ' + text[a], {
      encoding: 'utf8'
    });
    var eth = {};
    eth[text[a]] = stdout2.replace(/\n/gi, "<br>");
    //console.log("eth : " + text[a]);
    var eng = "current_setting_" + text[a];
    result_data[eng] = eth;
    //console.log("eth : " + JSON.stringify(result_data));
    fs.writeFileSync(__dirname + "/data/" + "summary.json",
      JSON.stringify(result_data, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
      })
  }
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
  fs.readFile(__dirname + "/data/" + "connecting_lan_data.json", 'utf8', function(err, data) {
    var users = JSON.parse(data);
    // ADD TO DATA
    users[adapt_name] = req.body;
    exports.datasave_AP(users, adapt_name);
    // SAVE DATA
    fs.writeFile(__dirname + "/data/" + "connecting_lan_data.json",
      JSON.stringify(users, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
        res.json(result);
      })
  })
}
exports.datasave_AP = function(data, adapt_name) {

}
