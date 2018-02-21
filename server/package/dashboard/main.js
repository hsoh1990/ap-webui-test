module.exports = function(app, fs, url){
	var router_dashboard = require('./dashboard.js');

  app.get('/dashboard', function(req, res) {
    var sess = req.session;
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

	app.get('/i18n_load', function(req, res) {
    router_dashboard.i18n_load(req, res);
  });

};
