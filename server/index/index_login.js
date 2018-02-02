var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');
var arp = require('node-arp');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


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
  result = {
    'success' : 1
  }
  res.send(result);
  io.sockets.on('connection', function(socket) {
    // 클라이언트로 news 이벤트를 보낸다.
    for (var a = 0; a < Object.keys(data__).length; a++) {
      arp.getMAC(data__[data_key[a]]['IP Address'], function(err, mac) {
        if (!err) {
          console.log("mac : " + mac);
          result = {
            'MAC Address': data__[data_key[a]]['MAC Address'],
            'IP Address': data__[data_key[a]]['IP Address'],
            'Host name': data__[data_key[a]]['Host name'],
            'arp': 1
          }
          socket.emit('arp', result);
        } else {
          console.log("error : " + err);
          result = {
            'MAC Address': data__[data_key[a]]['MAC Address'],
            'IP Address': data__[data_key[a]]['IP Address'],
            'Host name': data__[data_key[a]]['Host name'],
            'arp': 0
          }
          socket.emit('arp', result);
        }
      });
    }


    // 클라이언트에서 my other event가 발생하면 데이터를 받는다.
    socket.on('my other event', function(data) {
      console.log(data);
    });
  });
}
