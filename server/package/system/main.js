module.exports = function(app, fs, url, isAuthenticated, passport) {
  var router_system = require('./system.js');
  var qwe = 123;
  app.get('/system', isAuthenticated, function(req, res) {
    res.render('system.html');
  });

  app.get('/api/system', isAuthenticated, function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    var select = req.query.select;
    let data;
    let result = {
      'success': 1
    }
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
      res.send(result);
      router_system.uninstall_package(select);
    } else if (type == "installbutton") {
      let result = router_system.hash_check(select);
      res.send(result);
      if (result['success'] == 1) {
        router_system.install_package(result);
      } else if (result['success'] == 0) {}
    }
  });
  app.get('/i18n_load', isAuthenticated, function(req, res) {
    let data = router_system.i18n_load();
    res.send(data);
  });
  app.get('/i18n_save', isAuthenticated, function(req, res) {
    let data = router_system.i18n_save(req.query.lang);
    res.send(data);
  });
};
