var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');
var arp = require('node-arp');

exports.ip_get = function() {
  var ips = execSync("ifconfig | grep inet | grep -v inet6 | awk '{gsub(/addr:/,\"\");print $2}'").toString().trim().split("\n");
  console.log('ip : ' + ips);
  return ips;
}

exports.sidemenu_get = function() {
  var files = fs.readdirSync(__dirname + '/../package');
  console.log(files.length);
  var sidemenus = {};
  for (var i = 0; i < files.length; i++) {
    var dir_name = files[i];
    var data = fs.readFileSync(__dirname + "/../package/" + dir_name + "/sidename.json", 'utf8');
    var sidemenu = JSON.parse(data);
    console.log(sidemenu['side_name']);
    sidemenus[dir_name] = sidemenu['side_name'];
  }
  console.log(sidemenus);
  return sidemenus;
}

exports.login_check = function(id, password) {
  let data = fs.readFileSync(__dirname + "/../userdata/" + "userdata.json", 'utf8');
  var userdata = JSON.parse(data); //json text -> json object
  var check = {};
  if (id == userdata['admin']['username'] && password == userdata['admin']['password']) {
    return 1;
  } else {
    return 0;
  }
}

exports.i18n_load = function() {
  var data = JSON.parse(fs.readFileSync(__dirname + "/../public/i18n/config.js", 'utf8'));
  console.log(data);
  return data;
}

exports.i18n_save = function(language) {
  var lang_json = new Object();
  lang_json.language = language;
  fs.writeFileSync(__dirname + "/../public/i18n/config.js",
    JSON.stringify(lang_json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
  return language;
}
