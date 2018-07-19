var fs = require("fs");
const {
  execSync
} = require('child_process');
const {
  exec
} = require('child_process');

var io = require('socket.io').listen(8080);

/**
 * 전역변수 선언 부분
 * @type {Array} 접속한 모든 사용자의 소켓들
 */
var sockets = new Array();
var arp_count = 0;
var device_data = JSON.parse(fs.readFileSync(__dirname + "/data/device_data.json", 'utf8'));

/**
 * 소켓이 접속되기전, arp함수가 실행되기 전에 device_data의 ip들에 대한
 * ARP 값을 얻어보고, 반영한다.
 * @return {[type]}    없음
 */
deviceDataConnDecide();
/**
 * 소켓 접속 부분
 * @param  {[type]} socket 해당 사용자의 접속 소켓
 * @return {[type]}
 */
io.sockets.on('connect', function(socket) {
  socket_init(socket);

  socket.emit('isConnect', 1);

  socket.on('disconnect', function() {
    socket.emit('isDisconnect', 0);
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
    data_Disconn_owner_broadcasting(parse_data);
  });

  socket.on('owner__connect', function(data) {
    const parse_data = owner_device_section(data);
    data_Conn_owner_broadcasting(parse_data);
  });
});

function owner_ap_section(data) {
  ap_infor['MAC Address'] = data['mac'];
  ap_infor['owner'] = data['owner'];
  fs.writeFileSync(__dirname + "/data/" + "ap_data.json",
    JSON.stringify(ap_infor, null, '\t'), "utf8",
    function(err, data) {})
  data_ap_broadcasting(ap_infor);
}

function data_ap_broadcasting(result_data) {
  console.log("AP 소유자 이름 변경 - broadcasting");
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('APtextchange', result_data);
  }
}

function owner_wlan_section(data) {
  wlan_infor['MAC Address'] = data['mac'];
  wlan_infor['owner'] = data['owner'];
  fs.writeFileSync(__dirname + "/data/" + "wlan_data.json",
    JSON.stringify(wlan_infor, null, '\t'), "utf8",
    function(err, data) {})
  data_wlan_broadcasting(wlan_infor);
}

function data_wlan_broadcasting(result_data) {
  console.log("Wlan 소유자 이름 변경 - broadcasting");
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('Wlantextchange', result_data);
  }
}

function owner_device_section(data) {
  var stringify_data = fs.readFileSync(__dirname + "/data/device_data.json", 'utf8');
  var parse_data = JSON.parse(stringify_data);
  for (var a = 0; a < parse_data.length; a++) {
    if (parse_data[a]['MAC Address'] == data['mac']) {
      parse_data[a]['owner'] = data['owner'];
      break;
    }
  }
  device_data = parse_data;
  fs.writeFileSync(__dirname + "/data/" + "device_data.json",
    JSON.stringify(parse_data, null, '\t'), "utf8",
    function(err, data) {})
  return parse_data[a];
}

function data_Disconn_owner_broadcasting(result_data) {
  console.log("Disconnect 소유자 이름 변경 - broadcasting");
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('Disconntextchange', result_data);
  }
}

function data_Conn_owner_broadcasting(result_data) {
  console.log("Connect 소유자 이름 변경 - broadcasting");
  for (var a = 0; a < sockets.length; a++) {
    sockets[a].emit('Conntextchange', result_data);
  }
}

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
  wlan_infor = exports.wlan_whois();
  let wlan_exnetinfor = exports.wlan_exnet_data();

  ap_infor = exports.ap_data_save(ap_ip, ap_mac, ap_ssid);

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
  var data_readed = JSON.parse(fs.readFileSync(__dirname + "/data/ap_data.json", 'utf8'));
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
  var data_readed = JSON.parse(fs.readFileSync(__dirname + "/data/wlan_data.json", 'utf8'));
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
 * 12초에 1번씩 arp를 요청하기 위한 자기실행함수 부분,
 * ARP 함수 실행 전에,  device_data 값에대한 ARP를 던져서 반영한다.
 * @return {[type]} 없음
 */
! function arp_repeat() {
  arp_count++;
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //반복하는 부분
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
  console.log("반복 시작 : " + arp_count + "번째");
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");

  arp_promise();

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  setTimeout(function() {
    arp_repeat();
  }, 1000);
}()

function deviceDataConnDecide() {
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
  console.log("device_data 검사 시작");
  for (let a = 0; a < device_data.length; a++) {
    const result = execSync('arp -n ' + device_data[a]['IP Address'] + ' | awk NR==2 | awk \'{print $3}\'', {
      encoding: 'utf8'
    });
    if (result.match(/:/g) != null) {
      if (result.match(/:/g).length == 5) {
        device_data[a]['arp'] = 1;

      }

    } else {
      console.log(device_data[a]['IP Address'] + " : MAC 주소를 못찾음.");
      device_data[a]['arp'] = 0;
    }
  }
  fs.writeFileSync(__dirname + "/data/" + "device_data.json",
    JSON.stringify(device_data, null, '\t'), "utf8",
    function(err, data) {})
  console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
}

function arp_promise() {
  var data__ = data_get();
  var data_key = Object.getOwnPropertyNames(data__);
  for (var a = 0; a < Object.keys(data__).length; a++) {
    promise_arp_req(a, data__, data_key)
      .then(function(result) {
        // 성공시
        promise_resolve(result);
      }, function(result) {
        // 실패시
        promise_reject(result);
      });
  }
}

function promise_arp_req(a, data__, data_key) {
  return new Promise(function(resolve, reject) {
    arp_req(a, data__, data_key, resolve, reject)
  });
}


function arp_req(a, data__, data_key, resolve, reject) {
  exec('arp -n ' + data__[data_key[a]]['IP Address'] + ' | awk NR==2 | awk \'{print $3}\'', (error, stdout, stderr) => {
    if (error) {
      console.log("ARP exec Error 발생");
      return;
    }
    if (stdout.match(/:/g) != null) {
      if (stdout.match(/:/g).length == 5) {
        let MAC = stdout.replace('\n', '');
        console.log(data__[data_key[a]]['IP Address'] + " : " + MAC);
        result = {
          'MAC Address': data__[data_key[a]]['MAC Address'],
          'IP Address': data__[data_key[a]]['IP Address'],
          'Host name': data__[data_key[a]]['Host name'],
          'arp': 1,
          'length': Object.keys(data__).length
        }
        resolve(result);
      }

    } else {
      console.log(data__[data_key[a]]['IP Address'] + " : MAC 주소를 못찾음.");
      result = {
        'MAC Address': data__[data_key[a]]['MAC Address'],
        'IP Address': data__[data_key[a]]['IP Address'],
        'Host name': data__[data_key[a]]['Host name'],
        'arp': 0,
        'length': Object.keys(data__).length
      }
      reject(result);
    }
  });
}

function promise_resolve(result) {
  const data_check = device_data_save(device_data, result);
  if (data_check['change'] == null) {
    device_data = data_check;
    data_arp_broadcasting(device_data);
  }
}

function promise_reject(result) {
  const data_check = device_data_save(device_data, result);
  if (data_check['change'] == null) {
    device_data = data_check;
    data_arp_broadcasting(device_data);
  }
}

function device_data_save(device_data, resultData) {
  for (var a = 0; a < device_data.length; a++) {
    if (device_data[a]['MAC Address'] == resultData['MAC Address']) { //전에 연결했었던 기기
      if (device_data[a]['arp'] != resultData['arp'] || device_data[a]['IP Address'] != resultData['IP Address']) {
        device_data[a]['arp'] = resultData['arp']
        device_data[a]['IP Address'] = resultData['IP Address'];
        console.log("연결 상태 변경");
        fs.writeFileSync(__dirname + "/data/" + "device_data.json",
          JSON.stringify(device_data, null, '\t'), "utf8",
          function(err, data) {})
        return device_data;
      } else {
        return Changefailed = {
          'change': 'fail'
        };
      }
    }
  }
  return Newdevice_data_push(resultData); //새로운 기기 추가
}

function Newdevice_data_push(deviceData) {
  deviceData['owner'] = 'default';
  device_data.push(deviceData);
  fs.writeFileSync(__dirname + "/data/" + "device_data.json",
    JSON.stringify(device_data, null, '\t'), "utf8",
    function(err, data) {})
  return device_data;
}

function data_arp_broadcasting(result_data) {
  console.log(sockets.length + "명에게 브로드캐스팅 보냄");
  for (var a = 0; a < sockets.length; a++) {
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
