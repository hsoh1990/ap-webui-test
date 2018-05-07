var fs = require("fs");
const {
  execSync
} = require('child_process');
var arp = require('node-arp');
var io = require('socket.io').listen(8080);

var pcap = require('pcap2');

var pcapSession = new pcap.Session('wlan0');

pcapSession.on('packet', function(raw_packet) {

  var packet = pcap.decode.packet(raw_packet);
  console.log(packet.payload.EthernetPacket.payload.IPv4);
});

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
