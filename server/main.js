module.exports = function(app, fs, url) {

  var router_dashboard = require('./package/dashboard/dashboard.js');
  var router_wpaconfig = require('./package/wpaconfig/wpaconfig.js');
  //var router_hotspot = require('./package/hotspot/hotspot.js');
  //var router_networking = require('./package/networking/networking.js');
  //var router_dhcpserver = require('./package/dhcpserver/dhcpserver.js');
  //var router_auth = require('./package/auth/auth.js');
  var router_system = require('./package/system/system.js');
  var router_index_login = require('./index/index_login.js');

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
  })
  app.get('/api/index_login', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;

    if (type == "sidemenu") {
      router_index_login.sidemenu_get(req, res);
    }
  })

  app.get('/login_check', function(req, res) {
    var sess;
    sess = req.session;
    var id = req.query.id;
    var password = req.query.password;
    fs.readFile(__dirname + "/userdata/" + "userdata.json", 'utf8', function(err, data) {
      var userdata = JSON.parse(data); //json text -> json object
      var check = {};
      if (id == userdata['admin']['username'] && password == userdata['admin']['password']) {
        sess.logincheck = "1";
      } else {
        sess.logincheck = "0";
      }
      check['check'] = sess.logincheck;
      console.log('session : ' + sess.logincheck);
      res.send(check);
    })
  })


  app.get('/dashboard', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('dashboard.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/dashboard', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.id;
    var select = req.query.select;

    if (type == "refresh") {
      router_dashboard.api_get(req, res);
    } else if (type == "wlan0stopstart") {
      if (select == 0) { //stop 시키는 부분
        router_dashboard.wlan0_stop(req, res);
      } else if (select == 1) { //start 시키는 부분
        router_dashboard.wlan0_start(req, res);
      } else {
        router_dashboard.start_stopbutton(req, res);
      }
    }
  });


  app.get('/wpaconfig', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('wpaconfig.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/wpaconfig', function(req, res) {
    router_wpaconfig.api_get(req, res);
  });


  app.get('/hotspot', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('hotspot.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    var select = req.query.select;
    if (type == "basic") {
      router_hotspot.api_get_basic(req, res);
    } else if (type == "security") {
      router_hotspot.api_get_security(req, res);
    } else if (type == "advanced") {
      router_hotspot.api_get_advanced(req, res);
    } else if (type == "awk") {
      router_hotspot.api_get_awk(req, res);
    } else if (type == "get") {
      router_hotspot.api_get(req, res);
    } else if (type == "logging") {
      router_hotspot.api_get_log(req, res);
    } else if (type == "wlan0stopstart") {
      if (select == 0) { //stop 시키는 부분
        router_hotspot.hotspot_stop(req, res);
      } else if (select == 1) { //start 시키는 부분
        router_hotspot.hotspot_start(req, res);
      } else {
        router_hotspot.start_stopbutton(req, res);
      }
    }
  });
  app.post('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    json = req.body;

    console.log('type : ' + json.type);

    if (json.type == "basic") {
      router_hotspot.api_post_basic(req, res);
    } else if (json.type == "security") {
      router_hotspot.api_post_security(req, res);
    } else if (json.type == "advanced") {
      router_hotspot.api_post_advanced(req, res);
    }
  });


  app.get('/networking', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('networking.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/networking', function(req, res) {
    router_networking.api_get(req, res);
  });
  app.post('/api/networking', function(req, res) {
    router_networking.api_post(req, res);
  });

  app.get('/dhcpserver', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('dhcpserver.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/dhcpserver', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    var select = req.query.select;
    if (type == "clientlist") {
      router_dhcpserver.api_get_clientlist(req, res);
    } else if (type == "dnsmasq") {
      router_dhcpserver.api_get_dnsmasq(req, res);
    } else if (type == "get") {
      router_dhcpserver.api_get(req, res);
    } else if (type == "awk") {
      router_dhcpserver.api_get_awk(req, res);
    } else if (type == "dnsstopstart") {
      if (select == 0) { //stop 시키는 부분
        router_dhcpserver.dnsmasq_stop(req, res);
      } else if (select == 1) { //start 시키는 부분
        router_dhcpserver.dnsmasq_start(req, res);
      } else {
        router_dhcpserver.start_stopbutton(req, res);
      }
    }
  });
  app.post('/api/dhcpserver', function(req, res) {
    router_dhcpserver.api_post(req, res);
  });

  app.get('/auth', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('auth.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/auth', function(req, res) {
    var sess;
    sess = req.session;
    var id = req.query.id;
    var password = req.query.password;
    fs.readFile(__dirname + "/userdata/" + "userdata.json", 'utf8', function(err, data) {
      var userdata = JSON.parse(data); //json text -> json object
      var check = {};
      if (id == userdata['admin']['username'] && password == userdata['admin']['password']) {
        check['check'] = "1";
      } else {
        check['check'] = "0";
      }
      res.send(check);
    })
  });
  app.post('/api/auth', function(req, res) {
    router_auth.api_post(req, res);
  });


  app.get('/changetheme', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('changetheme.html');
    } else {
      res.render('index.html');
    }
  });


  app.get('/system', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('system.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/system', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    if (type == "refresh") {
      router_system.api_get(req, res);
    } else if (type == "reboot") {
      router_system.system_reboot(req, res);
    } else if (type == "shutdown") {
      router_system.system_shutdown(req, res);
    }
  });
}