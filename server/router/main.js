module.exports = function(app, fs) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/dashboard', function(req, res) {
    res.render('dashboard.html');
  });
  app.get('/api/dashboard', function(req, res) {
    fs.readFile( __dirname + "/../data/" + "dashboarddata.json", 'utf8', function (err, data) {
      var dashboarddata = JSON.parse(data);//json text -> json object
      console.log(dashboarddata);
      res.send(dashboarddata);
    })
  });
  app.get('/wpaconfig', function(req, res) {
    res.render('wpaconfig.html');
  });
  app.get('/api/wpaconfig', function(req, res) {
    fs.readFile( __dirname + "/../data/" + "wpaconfigdata.json", 'utf8', function (err, data) {
      var wpaconfigdata = JSON.parse(data);//json text -> json object
      console.log(wpaconfigdata);
      res.send(wpaconfigdata);
    })
  });
  app.get('/hotspot', function(req, res) {
    res.render('hotspot.html');
  });
  app.get('/networking', function(req, res) {
    res.render('networking.html');
  });
  app.get('/api/networking', function(req, res) {
    fs.readFile( __dirname + "/../data/" + "networkingdata.json", 'utf8', function (err, data) {
      var wpaconfigdata = JSON.parse(data);//json text -> json object
      console.log(wpaconfigdata);
      res.send(wpaconfigdata);
    })
  });
  app.get('/dhcpserver', function(req, res) {
    res.render('dhcpserver.html');
  });
  app.get('/api/dhcpserver', function(req, res) {
    fs.readFile( __dirname + "/../data/" + "dhcpserverdata.json", 'utf8', function (err, data) {
      var dhcpserverdata = JSON.parse(data);//json text -> json object
      console.log(dhcpserverdata);
      res.send(dhcpserverdata);
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
}
