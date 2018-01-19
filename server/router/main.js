module.exports = function(app, fs, url) {

  var router_dashboard = require('./dashboard.js');
  var router_wpaconfig = require('./wpaconfig.js');
  var router_hotspot = require('./hotspot.js');
  var router_networking = require('./networking.js');
  var router_dhcpserver = require('./dhcpserver.js');
  var router_auth = require('./auth.js');
  var router_system = require('./system.js');
  var router_login = require('./login.js');
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/index_login', function(req, res) {
    var sess;
    sess = req.session;
    if (sess.logincheck == "0") {
      res.render('index.html');
    } else {
      res.render('index_login.html');
    }
  })

  app.get('/login_check', function(req, res) {
    var sess;
    sess = req.session;
    var id = req.query.id;
    var password = req.query.password;
    fs.readFile(__dirname + "/../data/" + "userdata.json", 'utf8', function(err, data) {
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
    res.render('dashboard.html');
  });
  app.get('/api/dashboard', function(req, res) {
    router_dashboard.api_get(req, res);
  });


  app.get('/wpaconfig', function(req, res) {
    res.render('wpaconfig.html');
  });
  app.get('/api/wpaconfig', function(req, res) {
    router_wpaconfig.api_get(req, res);
  });


  app.get('/hotspot', function(req, res) {
    res.render('hotspot.html');
  });
  app.get('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;

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
    res.render('networking.html');
  });
  app.get('/api/networking', function(req, res) {
    router_networking.api_get(req, res);
  });
  app.post('/api/networking', function(req, res) {
    router_networking.api_post(req, res);
  });

  app.get('/dhcpserver', function(req, res) {
    res.render('dhcpserver.html');
  });
  app.get('/api/dhcpserver', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;

    if (type == "clientlist") {
      router_dhcpserver.api_get_clientlist(req, res);
    } else if (type == "dnsmasq") {
      router_dhcpserver.api_get_dnsmasq(req, res);
    } else if (type == "get") {
      router_dhcpserver.api_get(req, res);
    } else if (type == "awk") {
      router_dhcpserver.api_get_awk(req, res);
    }
  });
  app.post('/api/dhcpserver', function(req, res) {
    router_dhcpserver.api_post(req, res);
  });

  app.get('/auth', function(req, res) {
    res.render('auth.html');
  });
  app.get('/api/auth', function(req, res) {
    router_auth.api_get(req, res);
  });
  app.post('/api/auth', function(req, res) {
    router_auth.api_post(req, res);
  });


  app.get('/changetheme', function(req, res) {
    res.render('changetheme.html');
  });


  app.get('/system', function(req, res) {
    res.render('system.html');
  });
  app.get('/api/system', function(req, res) {
    router_system.api_get(req, res);
  });
}
