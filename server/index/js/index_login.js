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
  wlan_data = new Array();
  exnet_data = new Array();
  enable__ = {
    'ip': 1,
    'mac': 1,
    'hostname': 1,
    'owner': 1
  }
  arp_data = new Object();
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
      console.log("device_data = " + data);
      socket_event_arp(data);
    });
  socket.on('device_count',
    function(data) {
      console.log("device_count = " + data);
      device_count = data;
    });
  socket.on('exnetinfor',
    function(data) {
      console.log("exnetinfor = " + data);
      exnet_data.push(data);
    });
  socket.on('wlaninfor',
    function(data) {
      console.log("wlaninfor = " + data);
    });
  socket.on('apinfor',
    function(data) {
      console.log("apinfor = " + data);
    });

}

function socket_event_arp(data) {
  arp_data = data;
}
