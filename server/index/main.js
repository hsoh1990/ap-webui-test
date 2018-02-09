module.exports = function(app, fs, url) {
  var router_index_login = require('./index_login.js');
  var router_socket = require('./socket.js');

  var exec = require('child_process').exec,
    child;
  const {
    execSync
  } = require('child_process');
  var arp = require('node-arp');
  var io = require('socket.io').listen(8080);


  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/index_login', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('index_login.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/index_login', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;

    if (type == "sidemenu") {
      router_index_login.sidemenu_get(req, res);
    }
  });

  app.get('/login_check', function(req, res) {
    var sess;
    sess = req.session;
    var id = req.query.id;
    var password = req.query.password;
    fs.readFile(__dirname + "/../userdata/" + "userdata.json", 'utf8', function(err, data) {
      var userdata = JSON.parse(data); //json text -> json object
      var check = {};
      if (id == userdata['admin']['username'] && password == userdata['admin']['password']) {
        sess.logincheck = "1";
        res.cookie('string', 'cookie');
        res.cookie('json', {
          name: 'check',
          property: 'delicious'
        });
      } else {
        sess.logincheck = "0";

      }
      check['check'] = sess.logincheck;
      console.log('session : ' + sess.logincheck);

      res.send(check);
    })
  });


  var sockets = new Array();
  var device_data = new Array();
  var arp_count = 0;

  ! function arp_repeat() {
    arp_count++;
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    //반복하는 부분
    router_socket.wait(1000);
    console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
    console.log("반복 시작 : " + arp_count + "번째");
    console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
    if (connect_bool == false) {
      return;
    }
    var data__ = router_socket.data_get();
    var data_key = Object.getOwnPropertyNames(data__);
    for (var a = 0; a < Object.keys(data__).length; a++) {
      var _promise = function(a, data__, data_key) {
        return new Promise(function(resolve, reject) {
          router_socket.arp_req(a, data__, data_key, resolve, reject);
        });
      };
      _promise(a, data__, data_key)
        .then(function(result) {
          // 성공시/*
          console.log(result['MAC Address'] + ',, ' + result['arp']);
          //socket.emit('arp', result);
        }, function(result) {
          // 실패시
          console.log(result['MAC Address'] + ',, ' + result['arp']);
          //socket.emit('arp', result);
        });

    }

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    setTimeout(function() {
      arp_repeat();
    }, 10000);
  }()
  io.sockets.on('connect', function(socket) {
    var connect_bool = true;
    sockets.push(socket);
    console.log("소켓 연결 완료 : " + sockets.length);

    socket.on('disconnect', function() {
      connect_bool = false;
      for(var a = 0;a < sockets.length; a++) {
        if(sockets[a] == socket){
          sockets.splice(a, 1);
        }
      }
      console.log("소켓 접속 종료 : " + sockets.length);
    });

  }
/*
  io.sockets.on('connect', function(socket) {
    var socket = socket;
    sockets.push(socket);
    console.log("소켓 연결 완료 : " + sockets.length);
    var connect_bool = true;
    var ap_ip = router_socket.eth0_ip_rec();
    var ap_mac = router_socket.eth0_mac_rec();
    var ap_hostname = router_socket.hostname_rec();
    var wlan_infor = router_socket.wlan_whois();
    var wlan_exnetinfor = router_socket.wlan_exnet_data();

    ap_infor = {
      'IP Address': ap_ip,
      'MAC Address': ap_mac,
      'Host name': ap_hostname
    }
    socket.emit('exnetinfor', wlan_exnetinfor);
    socket.emit('wlaninfor', wlan_infor);
    socket.emit('apinfor', ap_infor);
    console.log(wlan_exnetinfor);

    socket.on('disconnect', function() {
      connect_bool = false;
      for(var a = 0;a < sockets.length; a++) {
        if(sockets[a] == socket){
          sockets.splice(a, 1);
        }
      }
      console.log("소켓 접속 종료 : " + sockets.length);
    });

    // 클라이언트에서 my other event가 발생하면 데이터를 받는다.
    socket.on('owner__', function(data) {
      console.log(data);
    });
  });
}*/
