var fs = require("fs");
const {
  execSync
} = require('child_process');
var arp = require('node-arp');
var io = require('socket.io').listen(8080);

/**
 * 전역변수 선언 부분
 * @type {Array}
 */
var sockets = new Array();
var arp_count = 0;
var read_data = fs.readFileSync(__dirname + "/data/device_data.json", 'utf8');
var device_data = JSON.parse(read_data);

io.sockets.on('connect', function(socket) {
  socket_init(socket);


});


function socket_init(socket) {
  sockets.push(socket);
  console.log("소켓 연결 완료 : " + sockets.length);
}
