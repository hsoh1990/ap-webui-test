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

  io.sockets.on('connect', function(socket) {


    ! function arp_repeat() {
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      //반복하는 부분
      console.log("반복 시작");
      var data__ = data_get();
      var data_key = Object.getOwnPropertyNames(data__);
      console.log(data__);
      // 클라이언트로 news 이벤트를 보낸다.
      for (var a = 0; a < Object.keys(data__).length; a++) {

        var _promise = function(a, data__, data_key) {
          return new Promise(function(resolve, reject) {
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

              } else {
                /*
                console.log("error : " + err);
                result = {
                  'MAC Address': data__[data_key[a]]['MAC Address'],
                  'IP Address': data__[data_key[a]]['IP Address'],
                  'Host name': data__[data_key[a]]['Host name'],
                  'arp': 0
                }
                reject(result);*/
              }
            });
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
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      setTimeout(function() {
        arp_repeat();
      }, 10000);
    }()

    // 클라이언트에서 my other event가 발생하면 데이터를 받는다.
    socket.on('my other event', function(data) {
      console.log(data);
    });
  });
}
