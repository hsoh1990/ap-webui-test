module.exports = function(app, fs, url) {
  var router_index_login = require('./index_login.js');
  var router_socket = require('./socket.js');

  var fs = require("fs");
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
  var arp_count = 0;
  var read_data = fs.readFileSync(__dirname + "/data/device_data.json", 'utf8');
  var device_data = JSON.parse(read_data);

  console.log("read_data : " + read_data);

  function data_arp_broadcasting(result_data) {
    for(var a = 0;a < sockets.length; a++) {
      console.log("브로드캐스팅 보냄");
      sockets[a].emit('arp', result_data);
    }
  }

  function data_ap_broadcasting(result_data) {
    for(var a = 0;a < sockets.length; a++) {
      sockets[a].emit('apinfor', result_data);
    }
  }
  function data_wlan_broadcasting(result_data) {
    for(var a = 0;a < sockets.length; a++) {
      sockets[a].emit('wlaninfor', result_data);
    }
  }
  function data_disconn_owner_broadcasting(result_data) {
    for(var a = 0;a < sockets.length; a++) {
      sockets[a].emit('owner_disconn_result', result_data);
    }
  }

  ! function arp_repeat() {
    arp_count++;
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    //반복하는 부분
    router_socket.wait(1000);
    console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
    console.log("반복 시작 : " + arp_count + "번째");
    console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
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
          const data_check = router_socket.device_data_save(device_data, result);
          if (data_check['check'] == 1) {

          }
          else if (data_check['check'] == 2) {
            console.log("데이터 수정 완료");
            device_data.splice(data_check['a'], 1, result);
            delete device_data['check'];
            delete device_data['a'];
            const stringify_data = JSON.stringify(device_data, null, '\t');
            fs.writeFileSync(__dirname + "/data/" + "device_data.json",
              stringify_data, "utf8",
              function(err, data) {})
            data_arp_broadcasting(result);
          }
          else {
            console.log("데이터 저장 완료");
            device_data.push(result);
            delete device_data['check'];
            delete device_data['a'];
            const stringify_data = JSON.stringify(device_data, null, '\t');
            fs.writeFileSync(__dirname + "/data/" + "device_data.json",
              stringify_data, "utf8",
              function(err, data) {})
            data_arp_broadcasting(result);
          }
        }, function(result) {
          // 실패시
          console.log(result['MAC Address'] + ',, ' + result['arp']);
          //socket.emit('arp', result);
          const data_check = router_socket.device_data_save(device_data, result);
          if (data_check['check'] == 1) {

          }
          else if (data_check['check'] == 2) {
            console.log("데이터 수정 완료");
            delete device_data['check'];
            delete device_data['a'];
            device_data.splice(data_check['a'], 1, result);
            const stringify_data = JSON.stringify(device_data, null, '\t');
            fs.writeFileSync(__dirname + "/data/" + "device_data.json",
              stringify_data, "utf8",
              function(err, data) {})
            data_arp_broadcasting(result);
          }
          else {
            console.log("데이터 저장 완료");
            device_data.push(result);
            delete device_data['check'];
            delete device_data['a'];
            const stringify_data = JSON.stringify(device_data, null, '\t');
            fs.writeFileSync(__dirname + "/data/" + "device_data.json",
              stringify_data, "utf8",
              function(err, data) {})
            data_arp_broadcasting(result);
          }
        });

    }

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    setTimeout(function() {
      arp_repeat();
    }, 11000);
  }()
  io.sockets.on('connect', function(socket) {
    var connect_bool = true;
    sockets.push(socket);
    console.log("소켓 연결 완료 : " + sockets.length);

    var ap_ip = router_socket.eth0_ip_rec();
    var ap_mac = router_socket.eth0_mac_rec();
    var ap_hostname = router_socket.hostname_rec();
    var wlan_infor = router_socket.wlan_whois();
    var wlan_exnetinfor = router_socket.wlan_exnet_data();

    var ap_infor = router_socket.ap_data_save(ap_ip, ap_mac, ap_hostname);

    socket.emit('exnetinfor', wlan_exnetinfor);
    socket.emit('apinfor', ap_infor);
    socket.emit('wlaninfor', wlan_infor);
    for(var a = 0;a < device_data.length; a++) {
      socket.emit('arp', device_data[a]);
    }
    socket.on('disconnect', function() {
      connect_bool = false;
      for(var a = 0;a < sockets.length; a++) {
        if(sockets[a] == socket){
          sockets.splice(a, 1);
        }
      }
      console.log("소켓 접속 종료 : " + sockets.length);
    });
    socket.on('owner__ap', function(data) {
      ap_infor['MAC Address'] = data['mac'];
      ap_infor['owner'] = data['owner'];
      fs.writeFileSync(__dirname + "/data/" + "ap_data.json",
        JSON.stringify(ap_infor, null, '\t'), "utf8",
        function(err, data) {})
      data_ap_broadcasting(ap_infor);
    });
    socket.on('owner__wlan', function(data) {
      wlan_infor['MAC Address'] = data['mac'];
      wlan_infor['owner'] = data['owner'];
      fs.writeFileSync(__dirname + "/data/" + "wlan_data.json",
        JSON.stringify(wlan_infor, null, '\t'), "utf8",
        function(err, data) {})
      data_wlan_broadcasting(wlan_infor);
    });

    socket.on('owner__disconnect', function(data) {
      var stringify_data = fs.readFileSync(__dirname + "/data/device_data.json", 'utf8');
      var parse_data = JSON.parse(stringify_data);
      console.log(parse_data);
      for (var a = 0;a < parse_data.lrngth; a++) {
        if(parse_data[a]['MAC Address'] == data['mac']) {
          parse_data[a]['owner'] = data['owner'];
          console.log("owner = " + data['owner']);
          break;
        }
      }
      fs.writeFileSync(__dirname + "/data/" + "device_data.json",
        JSON.stringify(parse_data, null, '\t'), "utf8",
        function(err, data) {})
      data_disconn_owner_broadcasting(parse_data[a]);
    });

  });
}
