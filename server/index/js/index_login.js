/**
 * 소켓 접속 부분 - 전역변수 선언
 * @return {[type]} 없음
 */
function init_() {
  socket = io.connect('http://172.16.171.181:8080');
  //connection_text(10, 1);
  //전역변수 선언
  isConnect = 0;
  connect_data = new Array();
  disconnect_data = new Array();
  ap_data = new Array();
  wlan_data = new Object();
  exnet_data = new Object();
  enable__ = {
    'ip': 1,
    'mac': 1,
    'hostname': 1,
    'owner': 1
  }
  devices_data = new Object();
  devices_data = null;
}

! function Connect_repeat() {
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //반복하는 부분
  IsConnect();
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  setTimeout(function() {
    Connect_repeat();
  }, 400);
}()

function IsConnect() {
  let content = "";
  if (isConnect == 0) {
    content += "연결을 확인하는 중입니다...";
    document.getElementById("connent_text").innerHTML = content;
  } else if (isConnect == 1) {
    content += "연결 확인이 완료되었습니다.";
    document.getElementById("connent_text").innerHTML = content;
  }
}

/**
 * 최초 토폴로지 사이트 접속시 onload되는 함수
 * init_에서 전역변수 설정
 * @return {[type]} [description]
 */
function socket_connect_draw() {
  init_();

  socket.on('isConnect',
    function(data) {
      isConnect = data;
      }
    });
  socket.on('isDisconnect',
    function(data) {
      isConnect = data;
      }
    });
  socket.on('device_data',
    function(data) {
      console.log("device_data = " + JSON.stringify(data));
      if (devices_data == null) {
        socket_event_device_data(data, "first");
      }
    });
  socket.on('exnetinfor',
    function(data) {
      console.log("exnetinfor = " + JSON.stringify(data));
      exnet_data = data;
    });
  socket.on('wlaninfor',
    function(data) {
      console.log("wlaninfor = " + JSON.stringify(data));
      wlan_data = data;
    });
  socket.on('apinfor',
    function(data) {
      console.log("apinfor = " + JSON.stringify(data));
      ap_data = data;
    });
  socket.on('arp',
    function(data) {
      console.log("ARP - infor = " + JSON.stringify(data));
      devices_data = data;
      socket_event_device_data(data, "second")
    });
  socket.on('APtextchange',
    function(data) {
      ap_data = data;
      addApOwnerText(enable__, ap_data);
    });
  socket.on('Wlantextchange',
    function(data) {
      wlan_data = data;
      addWlanOwnerText(enable__, wlan_data);
    });
  socket.on('Disconntextchange',
    function(data) {
      ChangeDisconnOwner(data);
    });
  socket.on('Conntextchange',
    function(data) {
      ChangeConnOwner(data);
    });
}

function ChangeDisconnOwner(data) {
  for (var e = 0; e < disconnect_data.length; e++) {
    if (disconnect_data[e]['MAC Address'] == data['MAC Address']) {
      disconnect_data[e]['owner'] = data['owner'];
      DisconnOwnerChange(disconnect_data[e]['MAC Address'], disconnect_data[e]['owner']);
      ////
      break;
    }
  }
}

function ChangeConnOwner(data) {
  for (var e = 0; e < connect_data.length; e++) {
    if (connect_data[e]['MAC Address'] == data['MAC Address']) {
      connect_data[e]['owner'] = data['owner'];
      ConnOwnerChange(connect_data[e]['MAC Address'], connect_data[e]['owner']);
      ////
      break;
    }
  }
}
/**
 * 첫 소켓 접속 후 device_data 받아온 후 Konva.js 출력 부분
 * @param  {[type]} data device data
 * @return {[type]}      [description]
 */
function socket_event_device_data(data, type) {
  if (type == "second") {
    removeChapes();
    connect_data.splice(0, connect_data.length); //배열을 비운다.
    disconnect_data.splice(0, disconnect_data.length); //배열을 비운다.
  }
  devices_data = data;
  for (let a = 0; a < devices_data.length; a++) {
    if (devices_data[a]['arp'] == 1) {
      connect_data.push(devices_data[a]);
    } else {
      disconnect_data.push(devices_data[a]);
    }
  }

  ReDraw();
}

function ReDraw() {
  removeChapes();
  ConnentDeviceCheck(connect_data.length);
  disconnect_draw(enable__, disconnect_data, disconnect_data.length);
  connect_draw(enable__, connect_data, connect_data.length)
  wlan_ex_net_draw(enable__, exnet_data, exnet_data.length)
  wlan_draw(enable__, wlan_data);
  addAp(enable__, ap_data);
}

function ipOnoff() {

  if (document.getElementById("ipenable").value == 1) {
    document.getElementById("ipenable").value = 0;
    enable__['ip'] = 0;
  } else if (document.getElementById("ipenable").value == 0) {
    document.getElementById("ipenable").value = 1;
    enable__['ip'] = 1;
  }
  ReDraw();
}
function macOnoff() {
  if (document.getElementById("macenable").value == 1) {
    document.getElementById("macenable").value = 0;
    enable__['mac'] = 0;
  } else if (document.getElementById("macenable").value == 0) {
    document.getElementById("macenable").value = 1;
    enable__['mac'] = 1;
  }
  ReDraw();
}
function hostnameOnoff() {
  if (document.getElementById("hostnameenable").value == 1) {
    document.getElementById("hostnameenable").value = 0;
    enable__['hostname'] = 0;
  } else if (document.getElementById("hostnameenable").value == 0) {
    document.getElementById("hostnameenable").value = 1;
    enable__['hostname'] = 1;
  }
  ReDraw();
}
function ownerOnoff() {
  if (document.getElementById("ownerenable").value == 1) {
    document.getElementById("ownerenable").value = 0;
    enable__['owner'] = 0;
  } else if (document.getElementById("ownerenable").value == 0) {
    document.getElementById("ownerenable").value = 1;
    enable__['owner'] = 1;
  }
  ReDraw();
}
