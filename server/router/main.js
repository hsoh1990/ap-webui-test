module.exports = function(app, fs) {
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
    fs.readFile(__dirname + "/../data/" + "hotspotdata.json", 'utf8', function(err, data) {
      var hotspotdata = JSON.parse(data); //json text -> json object
      console.log(hotspotdata);
      res.send(hotspotdata);
    })
  });

  app.get('/networking', function(req, res) {
    res.render('networking.html');
  });
  app.get('/api/networking', function(req, res) {
    fs.readFile(__dirname + "/../data/" + "networkingdata.json", 'utf8', function(err, data) {
      var wpaconfigdata = JSON.parse(data); //json text -> json object
      console.log(wpaconfigdata);
      res.send(wpaconfigdata);
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
  app.post('/api/dhcpserver/send', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var data_name = "serversetting_data";
    json = req.body;

    console.log('interface :' + json.interface);
    console.log('starting_IP_address :' + json.starting_IP_address);
    console.log('ending_IP_address :' + json.ending_IP_address);
    console.log('Lease_time :' + json.Lease_time);
    console.log('interval :' + json.interval);

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
