/**
 * 소켓 접속 부분 - 전역변수 선언
 * @return {[type]} 없음
 */
function init_() {
  socket = io.connect('http://172.16.171.181:8080');
  //connection_text(10, 1);
  //전역변수 선언
  connect_count = 0;
  disconnect_count = 0;
  device_count = 0;
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

/**
 * 최초 토폴로지 사이트 접속시 onload되는 함수
 * init_에서 전역변수 설정
 * @return {[type]} [description]
 */
function socket_connect_draw() {
  init_();

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
}

/**
 * 첫 소켓 접속 후 device_data 받아온 후 Konva.js 출력 부분
 * @param  {[type]} data device data
 * @return {[type]}      [description]
 */
function socket_event_device_data(data, type) {
  if(type == "second") {
    removeChapes();
    connect_data.splice(0,connect_data.length);//배열을 비운다.
    disconnect_data.splice(0,disconnect_data.length);//배열을 비운다.
  }
  devices_data = data;
  device_count = devices_data.length;
  for (let a = 0; a < devices_data.length; a++) {
    if (devices_data[a]['arp'] == 1) {
      connect_data.push(devices_data[a]);
    } else {
      disconnect_data.push(devices_data[a]);
    }
  }

  disconnect_draw(enable__, disconnect_data, disconnect_data.length);
  connect_draw(enable__, connect_data, connect_data.length)
  wlan_ex_net_draw(enable__, exnet_data, exnet_data.length)
  wlan_draw(enable__, wlan_data);
  addAp(enable__, ap_data);
}
