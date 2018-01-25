var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');

exports.sidemenu_get = function(req, res) {
  var files = fs.readdirSync(__dirname + '/../package');
  console.log(files.length);
  var sidemenus = {};
  for (var i = 0; i < files.length; i++) {
    var dir_name = files[i];
    var data = fs.readFileSync(__dirname + "/../package/" + dir_name + "/sidename.json", 'utf8');
    var side_name = "side_name_" + String(i);
    var sidemenu = JSON.parse(data);
    console.log(sidemenu['side_name']);
    sidemenus[side_name] = sidemenu['side_name'];
  }
  console.log(sidemenus);
  res.send(sidemenus);
}
