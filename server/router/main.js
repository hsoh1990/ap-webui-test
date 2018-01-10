module.exports = function(app, fs) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/dashboard', function(req, res) {
    res.render('dashboard.html');
  });
  app.get('/api/dashboard', function(req, res) {
    console.log(__dirname)
    fs.readFile( __dirname + "/../data/" + "dashboarddata.json", 'utf8', function (err, data) {
      var dashboarddata = JSON.parse(data);//json text -> json object
      alert(dashboarddata);
      res.send(dashboarddata);
    })
  });
  app.get('/wpaconfig', function(req, res) {
    res.render('wpaconfig.html');
  });
  app.get('/hotspot', function(req, res) {
    res.render('hotspot.html');
  });
  app.get('/networking', function(req, res) {
    res.render('networking.html');
  });
  app.get('/dhcpserver', function(req, res) {
    res.render('dhcpserver.html');
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
