module.exports = function(app, fs, url){
	var router_system = require('./system.js');
	var qwe = 123;
	app.get('/system', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
		console.log('cookie.name : ' + req.cookies['json']['name']);
		if(req.cookies['json']['name'] == "check") {
			sess.logincheck = "1";
			res.render('system.html');
		}
		else {
			sess.logincheck = "0";
			res.render('index.html');
		}
  });

  app.get('/api/system', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
		var select = req.query.select;
		let data;
    if (type == "refresh") {
      data = router_system.api_get();
			res.send(data);
    } else if (type == "reboot") {
      data = router_system.system_reboot();
			res.send(data);
    } else if (type == "shutdown") {
      data = router_system.system_shutdown();
			res.send(data);
    } else if (type == "package") {
      data = router_system.package_data_get();
			res.send(data);
    } else if (type == "install") {
      data = router_system.install_data_get();
			res.send(data);
    } else if (type == "uninstallbutton") {
      router_system.uninstall_package(req, res, select);
    } else if (type == "installbutton") {
      router_system.install_package(req, res, select);
    }
  });
	app.get('/i18n_load', function(req, res) {
    router_system.i18n_load(req, res);
  });
	app.get('/i18n_save', function(req, res) {
    router_system.i18n_save(req, res);
  });
};
