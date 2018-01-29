module.exports = function(app, fs, url){
	var router_system = require('./system.js');
	var qwe = 123;
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
		var select = req.query.select;

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
    } else if (type == "uninstallbutton") {
      router_system.uninstall_package(req, res, select);
    } else if (type == "installbutton") {
      router_system.install_package(req, res, select);
    } else if (type == "session_maintain") {
			var sess;
	    sess = req.session;
			sess.logincheck = "1";
			console.log("test 12345");
    }
  });
};
