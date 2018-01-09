module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/dashboard', function(req, res) {
    res.render('dashboard.html');
  });
  app.get('/api/dashboard', function(req, res) {
    var json = "{"a":3,"b":4}"
    res.send(json);
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
