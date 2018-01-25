module.exports = function(app, fs, url){
	var router_system = require('./system.js');

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
    } else if (type == "package") {
      router_system.package_data_get(req, res);
    } else if (type == "install") {
      router_system.install_data_get(req, res);
    }
  });
};
