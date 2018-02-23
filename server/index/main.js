module.exports = function(app, fs, url) {
  var router_index_login = require('./index_login.js');


  var fs = require("fs");
  var exec = require('child_process').exec,
    child;
  const {
    execSync
  } = require('child_process');


  app.get('/', app.oauth.authorise(), function(req, res) {
    res.render('index.html');
  });
  app.get('/index_login', function(req, res) {
    let sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('index_login.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/index_login', function(req, res) {
    req.accepts('application/json');
    var type = req.query.type;
    if (type == "sidemenu") {
      let res_data = router_index_login.sidemenu_get();
      res.send(res_data);
    }
  });
  app.get('/login_check', function(req, res) {
    var sess = req.session;
    var id = req.query.id;
    var password = req.query.password;
    let check = new Object();
    let logincheck = router_index_login.login_check(id, password);
    if (logincheck == 1) {
      sess.logincheck = "1";
      res.cookie('string', 'cookie');
      res.cookie('json', {
        name: 'check',
        property: 'delicious'
      });
    } else {
      sess.logincheck = "0";
    }
    check['check'] = sess.logincheck;
    console.log('session : ' + sess.logincheck);
    res.send(check);
  });

  app.get('/i18n_load', function(req, res) {
    let data = router_index_login.i18n_load();
    res.send(data);
  });

  app.get('/i18n_save', function(req, res) {
    let language = req.query.lang;
    let data = router_index_login.i18n_save(language);
    res.send(data);
  });

  require('./socket.js');
}
