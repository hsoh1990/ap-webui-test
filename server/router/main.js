module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/dashboard', function(req, res) {
    res.render('dashboard.html');
  });
  app.get('/wificlient', function(req, res) {
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
  app.get('/theme', function(req, res) {
    res.render('changetheme.html');
  });
  app.get('/system', function(req, res) {
    res.render('system.html');
  });
}
