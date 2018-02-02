var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');
var arp = require('node-arp');


exports.sidemenu_get = function(req, res) {
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
  res.send(sidemenus);
}

exports.arp_receive = function(req, res) {
  arp.getMAC('192.168.0.158', function(err, mac) {
    if (!err) {
      console.log(mac);
      result = {
        'success' : 1
      }
      res.send(result);
    } else {
      console.log("error : " + err);
      result = {
        'success' : 0
      }
      res.send(result);
    }
  });
}
