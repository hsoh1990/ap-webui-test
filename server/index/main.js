module.exports = function(app, fs, url) {
  var router_index_login = require('./index_login.js');
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

  function arp_req(a, data__, data_key, resolve, reject) {
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

  function wait(msecs) {
    var start = new Date().getTime();
    var cur = start;
    while (cur - start < msecs) {
      cur = new Date().getTime();
    }
  }

  function hostname_rec() {
    const std_hostname = execSync('hostname -f', {
      encoding: 'utf8'
    });
    var hostname = std_hostname.split("\n");

    return hostname[0];
  }

  function eth0_ip_rec() {
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

  function eth0_mac_rec() {
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

  function wlan_whois() {
    var text = execSync('curl \"http://whois.kisa.or.kr/openapi/whois.jsp?query=39.119.118.152\&key=2018020617475141381350\&answer=json\"', {
      encoding: 'utf8'
    });
    text = JSON.parse(text);
    wlan_infor = {
      'IP Address': '39.119.118.152',
      'MAC Address': 'aa.aa.aa.aa.aa.aa',
      'orgName': text['whois']['english']['ISP']['netinfo']['orgName']
    }
    return wlan_infor;
  }

  function wlan_exnet_data() {
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

  io.sockets.on('connect', function(socket) {
    var connect_bool = true;
    var ap_ip = eth0_ip_rec();
    var ap_mac = eth0_mac_rec();
    var ap_hostname = hostname_rec();
    var wlan_infor = wlan_exnet_data();
    var wlan_exnetinfor = wlan_exnet_data();

    ap_infor = {
      'IP Address': ap_ip,
      'MAC Address': ap_mac,
      'Host name': ap_hostname
    }
    socket.emit('exnetinfor', wlan_exnetinfor);
    socket.emit('wlaninfor', wlan_infor);
    socket.emit('apinfor', ap_infor);
    console.log(wlan_exnetinfor);

    ! function arp_repeat() {
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      //반복하는 부분
      wait(1000);
      console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
      console.log("반복 시작");
      console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
      if (connect_bool == false) {
        return;
      }
      var data__ = data_get();
      var data_key = Object.getOwnPropertyNames(data__);
      for (var a = 0; a < Object.keys(data__).length; a++) {
        var _promise = function(a, data__, data_key) {
          return new Promise(function(resolve, reject) {
            arp_req(a, data__, data_key, resolve, reject);
          });
        };
        _promise(a, data__, data_key)
          .then(function(result) {
            // 성공시/*
            console.log(result['MAC Address'] + ',, ' + result['arp']);
            socket.emit('arp', result);
          }, function(result) {
            // 실패시
            console.log(result['MAC Address'] + ',, ' + result['arp']);
            socket.emit('arp', result);
          });

      }

      if (connect_bool == false) {
        return;
      }
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      setTimeout(function() {
        arp_repeat();
      }, 10000);
    }()

    socket.on('disconnect', function() {
      console.log("소켓 접속 종료");
      connect_bool = false;
    });

    // 클라이언트에서 my other event가 발생하면 데이터를 받는다.
    socket.on('my other event', function(data) {
      console.log(data);
    });
  });
}
