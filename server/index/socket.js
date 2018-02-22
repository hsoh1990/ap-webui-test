var fs = require("fs");
const {
  execSync
} = require('child_process');
var arp = require('node-arp');
var io = require('socket.io').listen(8080);

var sockets = new Array();
var arp_count = 0;
var read_data = fs.readFileSync(__dirname + "/data/device_data.json", 'utf8');
var device_data = JSON.parse(read_data);

exports.data_get = function() {
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
  return data__;
}

exports.arp_req = function(a, data__, data_key, resolve, reject) {
  arp.getMAC(data__[data_key[a]]['IP Address'], function(err, mac) {
    if (!err) {
      console.log("mac : " + mac);
      if (mac == "(incomplete)") {
        result = {
          'MAC Address': data__[data_key[a]]['MAC Address'],
          'IP Address': data__[data_key[a]]['IP Address'],
          'Host name': data__[data_key[a]]['Host name'],
          'arp': 0,
          'length': Object.keys(data__).length
        }
        resolve(result);
      } else {
        result = {
          'MAC Address': data__[data_key[a]]['MAC Address'],
          'IP Address': data__[data_key[a]]['IP Address'],
          'Host name': data__[data_key[a]]['Host name'],
          'arp': 1,
          'length': Object.keys(data__).length
        }
        reject(result);
      }

    } else {}
  });
}

exports.wait = function(msecs) {
  var start = new Date().getTime();
  var cur = start;
  while (cur - start < msecs) {
    cur = new Date().getTime();
  }
}

exports.hostname_rec = function() {
  const std_hostname = execSync('hostname -f', {
    encoding: 'utf8'
  });
  var hostname = std_hostname.split("\n");

  return hostname[0];
}

exports.eth0_ip_rec = function() {
  const text = execSync('ip a s eth0', {
    encoding: 'utf8'
  });
  var ip = text.match(/inet ([0-9.]+)/i);
  try {
    if (ip != null) {
      return ip[1];
    } else {
      throw "No IP Address Found";
    }
  } catch (e) {
    return "No IP Address Found";
  }
}

exports.eth0_mac_rec = function() {
  const text = execSync('ip a s eth0', {
    encoding: 'utf8'
  });
  var mac = text.match(/link\/ether ([0-9a-f:]+)/i);
  try {
    if (mac != null) {
      return mac[1];
    } else {
      throw "No MAC Address Found";
    }
  } catch (e) {
    return "No MAC Address Found";
  }
}

exports.ap_data_save = function(ip, mac, hostname) {
  var read_data = fs.readFileSync(__dirname + "/data/ap_data.json", 'utf8');
  var data_readed = JSON.parse(read_data);
  var data_ = {};
  data_['IP Address'] = ip;
  data_['MAC Address'] = mac;
  data_['Host name'] = hostname;
  data_['owner'] = data_readed['owner'];
  fs.writeFileSync(__dirname + "/data/" + "ap_data.json",
    JSON.stringify(data_, null, '\t'), "utf8",
    function(err, data) {})

  return data_;
}
exports.wlan_whois = function() {
  var read_data = fs.readFileSync(__dirname + "/data/wlan_data.json", 'utf8');
  var data_readed = JSON.parse(read_data);
  var text = execSync('curl \"http://whois.kisa.or.kr/openapi/whois.jsp?query=39.119.118.152\&key=2018020617475141381350\&answer=json\"', {
    encoding: 'utf8'
  });
  text = JSON.parse(text);
  data_readed['orgName'] = text['whois']['english']['ISP']['netinfo']['orgName'];

  fs.writeFileSync(__dirname + "/data/" + "wlan_data.json",
    JSON.stringify(data_readed, null, '\t'), "utf8",
    function(err, data) {})

  return data_readed;
}

exports.wlan_exnet_data = function() {
  /*var text = execSync('curl \"http://whois.kisa.or.kr/openapi/whois.jsp?query=39.119.118.152\&key=2018020617475141381350\&answer=json\"', {
    encoding: 'utf8'
  });
  text = JSON.parse(text);*/
  exnet = [{
      'IP Address': '1.2.3.4',
      'MAC Address': 'aa.aa.aa.aa.aa.aa',
      'Host name': 'test1'
    },
    {
      'IP Address': '11.22.33.44',
      'MAC Address': 'bb.bb.bb.bb.bb.bb',
      'Host name': 'test2'
    },
    {
      'IP Address': '11.12.13.14',
      'MAC Address': 'cc.cc.cc.cc.cc.cc',
      'Host name': 'test3'
    },
    {
      'IP Address': '110.120.130.140',
      'MAC Address': 'dd.dd.dd.dd.dd.dd',
      'Host name': 'test4'
    }
  ]
  return exnet;
}


exports.device_data_save = function(device_data, data__) {
  var data__ = data__;
  var check = 0;
  for (var a = 0; a < device_data.length; a++) {
    if (device_data[a]['MAC Address'] == data__['MAC Address']) { //연결 신규 추가
      check = 1;
      if (device_data[a]['arp'] != data__['arp']) {
        check = 2;
      }
      break;
    }
  }
  if (check == 1) {
    data__['check'] = 1;
    data__['a'] = a;
    data__['owner'] = device_data[a]['owner'];
    return data__;
  } else if (check == 2) {
    data__['check'] = 2;
    data__['a'] = a;
    data__['owner'] = device_data[a]['owner'];
    return data__;
  } else {
    data__['check'] = 3;
    data__['a'] = 0;
    data__['owner'] = device_data[a]['owner'];
    return data__;
  }
}


function device_data_arp_decide() { //expire time이 지난 기기들 수정 로직 구현
  var data__ = exports.data_get();
  var data_key = Object.getOwnPropertyNames(data__);
  for (var a = 0; a < device_data.length; a++) {
    var count = 0;
    for (b = 0; b < Object.keys(data__).length; b++) {
      if (device_data[a]['MAC Address'] == data__[data_key[b]]['MAC Address']) {
        count++;
      }
    }
    if (count == 0) {
      if (device_data[a]['arp'] == 1) {
        device_data[a]['arp'] = 0;
      }
    }
  }
  fs.writeFileSync(__dirname + "/data/" + "device_data.json",
    JSON.stringify(device_data, null, '\t'), "utf8",
    function(err, data) {})

}

device_data_arp_decide();

! function arp_repeat() {
  arp_count++;
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //반복하는 부분
  exports.wait(1000);
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
  console.log("반복 시작 : " + arp_count + "번째");
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");

  arp_promise();

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  setTimeout(function() {
    arp_repeat();
  }, 11000);
}()

function arp_promise() {
  var data__ = exports.data_get();
  var data_key = Object.getOwnPropertyNames(data__);
  for (var a = 0; a < Object.keys(data__).length; a++) {
    promise_arp_req(a, data__, data_key)
      .then(function(result) {
        // 성공시/*
        promise_resolve(result);
      }, function(result) {
        // 실패시
        promise_reject(result);
      });
  }
}

function promise_arp_req(a, data__, data_key) {
  return new Promise(function(resolve, reject) {
    exports.arp_req(a, data__, data_key, resolve, reject)
  });
}

function promise_resolve(result) {
  console.log(result['MAC Address'] + ',, ' + result['arp']);
  //socket.emit('arp', result);
  const data_check = exports.device_data_save(device_data, result);
  if (data_check['check'] == 1) {

  } else if (data_check['check'] == 2) {
    console.log("데이터 수정 완료");
    device_data_splice(data_check, result);
    data_arp_broadcasting(result);
  } else {
    console.log("데이터 저장 완료");
    device_data_push(data_check, result);
    data_arp_broadcasting(result);
  }
}

function promise_reject(result) {
  console.log(result['MAC Address'] + ',, ' + result['arp']);
  //socket.emit('arp', result);
  const data_check = exports.device_data_save(device_data, result);
  if (data_check['check'] == 1) {

  } else if (data_check['check'] == 2) {
    console.log("데이터 수정 완료");
    device_data_splice(data_check, result);
    data_arp_broadcasting(result);
  } else {
    console.log("데이터 저장 완료");
    device_data_push(data_check, result);
    data_arp_broadcasting(result);
  }
}

function data_arp_broadcasting(result_data) {
  for (var a = 0; a < sockets.length; a++) {
    console.log("브로드캐스팅 보냄");
    sockets[a].emit('arp', result_data);
  }
}

function data_ap_broadcasting(result_data) {
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('apinfor', result_data);
  }
}

function data_wlan_broadcasting(result_data) {
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('wlaninfor', result_data);
  }
}

function data_disconn_owner_broadcasting(result_data) {
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('owner_disconn_result', result_data);
  }
}

function data_conn_owner_broadcasting(result_data) {
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('owner_conn_result', result_data);
  }
}

function device_data_splice(data_check, result) {
  device_data.splice(data_check['a'], 1, result);
  delete device_data['check'];
  delete device_data['a'];
  fs.writeFileSync(__dirname + "/data/" + "device_data.json",
    JSON.stringify(device_data, null, '\t'), "utf8",
    function(err, data) {})
}

function device_data_push(data_check, result) {
  device_data.push(result);
  delete device_data['check'];
  delete device_data['a'];
  fs.writeFileSync(__dirname + "/data/" + "device_data.json",
    JSON.stringify(device_data, null, '\t'), "utf8",
    function(err, data) {})
}

io.sockets.on('connect', function(socket) {
  socket_init(socket);

  socket.on('disconnect', function() {
    disconnect_section(socket);
  });

  socket.on('owner__ap', function(data) {
    owner_ap_section(data);
  });

  socket.on('owner__wlan', function(data) {
    owner_wlan_section(data);
  });

  socket.on('owner__disconnect', function(data) {
    const parse_data = owner_device_section(data);
    data_disconn_owner_broadcasting(parse_data);
  });

  socket.on('owner__connect', function(data) {
    const parse_data = owner_device_section(data);
    data_conn_owner_broadcasting(parse_data);
  });

});

function socket_init(socket) {
  connect_bool = true;
  sockets.push(socket);
  console.log("소켓 연결 완료 : " + sockets.length);

  ap_ip = exports.eth0_ip_rec();
  ap_mac = exports.eth0_mac_rec();
  ap_hostname = exports.hostname_rec();
  wlan_infor = exports.wlan_whois();
  wlan_exnetinfor = exports.wlan_exnet_data();

  ap_infor = exports.ap_data_save(ap_ip, ap_mac, ap_hostname);

  socket.emit('exnetinfor', wlan_exnetinfor);
  socket.emit('apinfor', ap_infor);
  socket.emit('wlaninfor', wlan_infor);
  socket.emit('device_count', device_data.length);
  for (var a = 0; a < device_data.length; a++) {
    socket.emit('arp', device_data[a]);
  }
}

function disconnect_section(socket) {
  connect_bool = false;
  for (var a = 0; a < sockets.length; a++) {
    if (sockets[a] == socket) {
      sockets.splice(a, 1);
    }
  }
  console.log("소켓 접속 종료 : " + sockets.length);
}

function owner_ap_section(data) {
  ap_infor['MAC Address'] = data['mac'];
  ap_infor['owner'] = data['owner'];
  fs.writeFileSync(__dirname + "/data/" + "ap_data.json",
    JSON.stringify(ap_infor, null, '\t'), "utf8",
    function(err, data) {})
  data_ap_broadcasting(ap_infor);
}

function owner_wlan_section(data) {
  wlan_infor['MAC Address'] = data['mac'];
  wlan_infor['owner'] = data['owner'];
  fs.writeFileSync(__dirname + "/data/" + "wlan_data.json",
    JSON.stringify(wlan_infor, null, '\t'), "utf8",
    function(err, data) {})
  data_wlan_broadcasting(wlan_infor);
}

function owner_device_section(data) {
  var stringify_data = fs.readFileSync(__dirname + "/data/device_data.json", 'utf8');
  var parse_data = JSON.parse(stringify_data);
  for (var a = 0; a < parse_data.length; a++) {
    if (parse_data[a]['MAC Address'] == data['mac']) {
      parse_data[a]['owner'] = data['owner'];
      console.log("owner = " + data['owner']);
      break;
    }
  }
  device_data = parse_data;
  fs.writeFileSync(__dirname + "/data/" + "device_data.json",
    JSON.stringify(parse_data, null, '\t'), "utf8",
    function(err, data) {})
  return parse_data[a];
}
