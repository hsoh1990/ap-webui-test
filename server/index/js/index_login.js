function socket_connect_draw() {
  init_();

}

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
