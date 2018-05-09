var fs = require("fs");
const {
  execSync
} = require('child_process');
const { exec } = require('child_process');
var arp = require('node-arp');
var io = require('socket.io').listen(8080);

/**
 * 전역변수 선언 부분
 * @type {Array} 접속한 모든 사용자의 소켓들
 */
var sockets = new Array();
var arp_count = 0;
var read_data = fs.readFileSync(__dirname + "/data/device_data.json", 'utf8');
var device_data = JSON.parse(read_data);

/**
 * 소켓 접속 부분
 * @param  {[type]} socket 해당 사용자의 접속 소켓
 * @return {[type]}
 */
io.sockets.on('connect', function(socket) {
  socket_init(socket);

  socket.on('disconnect', function() {
    disconnect_section(socket);
  });


});

/**
 * 소켓 연결 후 해당 사용자의 소켓 저장, 확인
 * @param  {[type]} socket 접속한 사용자의 소켓
 * @return {[type]}        [description]
 */
function socket_init(socket) {
  sockets.push(socket);
  console.log("소켓 연결 완료 : " + sockets.length);

  let ap_ip = exports.eth0_ip_rec();
  let ap_mac = exports.eth0_mac_rec();
  let ap_ssid = exports.ssid_rec();
  let wlan_infor = exports.wlan_whois();
  let wlan_exnetinfor = exports.wlan_exnet_data();

  let ap_infor = exports.ap_data_save(ap_ip, ap_mac, ap_ssid);

  socket.emit('apinfor', ap_infor);
  socket.emit('wlaninfor', wlan_infor);
  socket.emit('exnetinfor', wlan_exnetinfor);
  //socket.emit('device_count', device_data.length);
  /*
  for (var a = 0; a < device_data.length; a++) {
    socket.emit('arp', device_data[a]);
  }
  */
  socket.emit('device_data', device_data);
}

/**
 * wait 함수
 * @param  {[type]} msecs 밀리세컨드/초
 * @return {[type]}       없음
 */
exports.wait = function(msecs) {
  var start = new Date().getTime();
  var cur = start;
  while (cur - start < msecs) {
    cur = new Date().getTime();
  }
}

/**
 * -----------------------------------------------------------------
 * AP 관련 값 얻어오는 부분
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */
exports.ssid_rec = function() {
  const std_hostname = execSync('cat /etc/hostapd/hostapd.conf', {
    encoding: 'utf8'
  });
  var hostname = std_hostname.split("\n");
  var ssid = hostname[2].split("=");
  console.log("---------------" + ssid[1] + "----------------")
  return ssid[1];
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

exports.ap_data_save = function(ip, mac, ssid) {
  var read_data = fs.readFileSync(__dirname + "/data/ap_data.json", 'utf8');
  var data_readed = JSON.parse(read_data);
  var data_ = {};
  data_['IP Address'] = ip;
  data_['MAC Address'] = mac;
  data_['SSID'] = ssid;
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
/**
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 * AP 관련 값 얻어오는 부분
 * ------------------------------------------------------------------------------------------------
 */

/**
 * wlan에 접속한 사이트들 Dummy값
 * @return {[type]} 데이터
 */
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

/**
 * 해당 사용자의 소켓 Array에서 제거 - 접속 종료 처리
 * @param  {[type]} socket 접속한 사용자의 소켓
 * @return {[type]}        [description]
 */
function disconnect_section(socket) {
  connect_bool = false;
  for (var a = 0; a < sockets.length; a++) {
    if (sockets[a] == socket) {
      sockets.splice(a, 1);
    }
  }
  console.log("소켓 접속 종료 : " + sockets.length);
}

/**
 * 12초에 1번씩 arp를 요청하기 위한 자기실행함수 부분
 * @return {[type]} 없음
 */
! function arp_repeat() {
  arp_count++;
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //반복하는 부분
  exports.wait(500);
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
  console.log("반복 시작 : " + arp_count + "번째");
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");

  arp_req2();

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  setTimeout(function() {
    arp_repeat();
  }, 500);
}()

/**
 * 12초에 1번씩 arp를 요청하기 위한 자기실행함수 부분
 * @return {[type]} 없음
 */
/*
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
  }, 1000);
}()
*/
function arp_promise() {
  var data__ = data_get();
  var data_key = Object.getOwnPropertyNames(data__);
  for (var a = 0; a < Object.keys(data__).length; a++) {
    promise_arp_req(a, data__, data_key)
      .then(function(result) {
        // 성공시/*
        //promise_resolve(result);
      }, function(result) {
        // 실패시
        //promise_reject(result);
      });
  }
}
/*
function promise_arp_req(a, data__, data_key) {
  return new Promise(function(resolve, reject) {
    exports.arp_req(a, data__, data_key, resolve, reject)
  });
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


function promise_resolve(result) {
  console.log(result['MAC Address'] + ',, ' + result['arp']);
  //socket.emit('arp', result);
  const data_check = device_data_save(device_data, result);
  if(data_check['change'] == null) {
    device_data = data_check;
    data_arp_broadcasting(device_data);
  }
}

function promise_reject(result) {
  console.log(result['MAC Address'] + ',, ' + result['arp']);
  //socket.emit('arp', result);
  const data_check = device_data_save(device_data, result);
  if(data_check['change'] == null) {
    device_data = data_check;
    data_arp_broadcasting(device_data);
  }
}
*/

function promise_arp_req(a, data__, data_key) {
  return new Promise(function(resolve, reject) {
    exports.arp_req(a, data__, data_key, resolve, reject)
  });
}


exports.arp_req = function(a, data__, data_key, resolve, reject) {
  exec('arp -n ' + data__[data_key[a]]['IP Address'] + ' | awk NR==2 | awk \'{print $3}\' | grep -o : | wc -l', (error, stdout, stderr) => {
   if (error) {
     console.log("ARP exec Error 발생");
     return;
   }
   console.log(data__[data_key[a]]['IP Address'] + " : " + stdout);
   if(stdout == '5') {
     console.log("MAC 주소를 찾음.");
   }
  });
}


function device_data_save(device_data, resultData) {
  for(var a = 0;a < device_data.length; a++) {
    if(device_data[a]['MAC Address'] == resultData['MAC Address']) {
      if(device_data[a]['arp'] != resultData['arp']) {
        device_data[a]['arp'] = resultData['arp']
        fs.writeFileSync(__dirname + "/data/" + "device_data.json",
          JSON.stringify(device_data, null, '\t'), "utf8",
          function(err, data) {})
        return device_data;
      }
      else {
        return Changefailed = {
          'change' : 'fail'
        };
      }
    }
  }
  return Changefailed = {
    'change' : 'fail'
  };
}
/*
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
*/
function data_arp_broadcasting(result_data) {
  for (var a = 0; a < sockets.length; a++) {
    console.log("브로드캐스팅 보냄");
    sockets[a].emit('arp', result_data);
  }
}

function data_get() {
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
