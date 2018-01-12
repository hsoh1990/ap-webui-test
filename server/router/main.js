module.exports = function(app, fs, url) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/dashboard', function(req, res) {
    res.render('dashboard.html');
  });
  app.get('/api/dashboard', function(req, res) {
    fs.readFile(__dirname + "/../data/" + "dashboarddata.json", 'utf8', function(err, data) {
      var dashboarddata = JSON.parse(data); //json text -> json object
      console.log(dashboarddata);
      res.send(dashboarddata);
    })
  });


  app.get('/wpaconfig', function(req, res) {
    res.render('wpaconfig.html');
  });
  app.get('/api/wpaconfig', function(req, res) {
    fs.readFile(__dirname + "/../data/" + "wpaconfigdata.json", 'utf8', function(err, data) {
      var wpaconfigdata = JSON.parse(data); //json text -> json object
      console.log(wpaconfigdata);
      res.send(wpaconfigdata);
    })
  });


  app.get('/hotspot', function(req, res) {
    res.render('hotspot.html');
  });
  app.get('/api/hotspot', function(req, res) {
    fs.readFile(__dirname + "/../data/hotspot/" + "hotspotdata.json", 'utf8', function(err, data) {
      var hotspotdata = JSON.parse(data); //json text -> json object
      res.send(hotspotdata);
    })
  });
  app.post('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    json = req.body;

    console.log('type : ' + json.type);

    if (json.type == "basic") {
      fs.writeFile(__dirname + "/../data/hotspot/" + "basicdata.json",
        JSON.stringify(json, null, '\t'), "utf8",
        function(err, data) {
          result = {
            "success": 1
          };
          res.json(result);
        })
    } else if (json.type == "security") {
      fs.writeFile(__dirname + "/../data/hotspot/" + "securitydata.json",
        JSON.stringify(json, null, '\t'), "utf8",
        function(err, data) {
          result = {
            "success": 1
          };
          res.json(result);
        })
    } else if (json.type == "advanced") {
      fs.writeFile(__dirname + "/../data/hotspot/" + "advanceddata.json",
        JSON.stringify(json, null, '\t'), "utf8",
        function(err, data) {
          result = {
            "success": 1
          };
          res.json(result);
        })
    }
  });


  app.get('/networking', function(req, res) {
    res.render('networking.html');
  });
  app.get('/api/networking', function(req, res) {
    fs.readFile(__dirname + "/../data/networking/" + "summary.json", 'utf8', function(err, data) {
      var wpaconfigdata = JSON.parse(data); //json text -> json object
      //console.log(wpaconfigdata);
      res.send(wpaconfigdata);
    })
  });
  app.post('/api/networking', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var result = {};
    var adapt_name = req.query.adaptname;
    json = req.body;
    console.log(adapt_name);
    console.log('--------------------------------------');
    console.log('ip_address : ' + json.ip_address);
    console.log('subnet_mask : ' + json.subnet_mask);
    console.log('default_gateway : ' + json.default_gateway);
    console.log('dns_server : ' + json.dns_server);
    console.log('alternate_dns_server : ' + json.alternate_dns_server);

    // output message
    fs.readFile(__dirname + "/../data/networking/" + "connecting_lan_data.json", 'utf8', function(err, data) {
      var users = JSON.parse(data);
      // ADD TO DATA
      users[adapt_name] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/networking/" + "connecting_lan_data.json",
        JSON.stringify(users, null, '\t'), "utf8",
        function(err, data) {
          result = {
            "success": 1
          };
          res.json(result);
        })
    })
  });

  app.get('/dhcpserver', function(req, res) {
    res.render('dhcpserver.html');
  });
  app.get('/api/dhcpserver', function(req, res) {
    fs.readFile(__dirname + "/../data/dhcpserver/" + "clientlist.json", 'utf8', function(err, data) {
      var dhcpserverdata = JSON.parse(data); //json text -> json object
      console.log(dhcpserverdata);
      res.send(dhcpserverdata);
    })
  });
  app.post('/api/dhcpserver', function(req, res) {
    req.accepts('application/json');
    // input message handling
    json = req.body;

    console.log('interface : ' + json.interface);
    console.log('starting_IP_address : ' + json.starting_IP_address);
    console.log('ending_IP_address : ' + json.ending_IP_address);
    console.log('Lease_time : ' + json.Lease_time);
    console.log('interval : ' + json.interval);

    // output message
    fs.writeFile(__dirname + "/../data/dhcpserver/" + "serversetting.json",
      JSON.stringify(json, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
        res.json(result);
      })
  });

  app.get('/auth', function(req, res) {
    res.render('auth.html');
  });
  app.get('/api/auth', function(req, res) {
    fs.readFile(__dirname + "/../data/" + "userdata.json", 'utf8', function(err, data) {
      var userdata = JSON.parse(data); //json text -> json object
      console.log(userdata);
      res.send(userdata);
    })
  });
  app.post('/api/auth', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var result = {};
    var user_name = req.query.id;
    json = req.body;
    console.log(user_name);
    console.log('--------------------------------------');
    console.log('changed password : ' + json.password);

    // output message
    fs.readFile(__dirname + "/../data/" + "userdata.json", 'utf8', function(err, data) {
      var users = JSON.parse(data);

      // ADD TO DATA
      users[user_name] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/" + "userdata.json",
        JSON.stringify(users, null, '\t'), "utf8",
        function(err, data) {
          result = {
            "success": 1
          };
          res.json(result);
        })
    })
  });


  app.get('/changetheme', function(req, res) {
    res.render('changetheme.html');
  });


  app.get('/system', function(req, res) {
    res.render('system.html');
  });
  app.get('/api/system', function(req, res) {
    fs.readFile(__dirname + "/../data/" + "systeminfordata.json", 'utf8', function(err, data) {
      var systeminfordata = JSON.parse(data); //json text -> json object
      console.log(systeminfordata);
      res.send(systeminfordata);
    })
  });
}
