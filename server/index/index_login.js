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

  const stdout = execSync('cat /var/lib/misc/dnsmasq.leases', {
    encoding: 'utf8'
  });

  var arr = []; //줄 단위로 배열 저장(마지막은 빈배열이 들어감.)
  arr = stdout.split("\n");
  var data__ = {};
  for (var i = 0; i < arr.length - 1; i++) { //2차원 배열에 data 저장
    arr[i] = arr[i].split(" ");
    var tmp = {};
    var string_num = "client_list_";
    string_num += String(i + 1);
    tmp['Expire time'] = arr[i][0];
    tmp['MAC Address'] = arr[i][1];
    tmp['IP Address'] = arr[i][2];
    tmp['Host name'] = arr[i][3];
    tmp['Client ID'] = arr[i][4];
    data__[string_num] = tmp;
  }
  var data_key = Object.getOwnPropertyNames(data__);
  for (var a = 0;a < Object.keys(data__).length; a++) {
    arp.getMAC(data__[data_key[a]]['IP Address'], function(err, mac) {
      if (!err) {
        console.log("mac : " + mac);
        result = {
          'success': 1
        }
      } else {
        console.log("error : " + err);
        result = {
          'success': 0
        }
      }
    });
  }
}
