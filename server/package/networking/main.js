module.exports = function(app, fs, url){
	var router_networking = require('./networking.js');

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

};
