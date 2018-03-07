module.exports = function(app, fs, url, isAuthenticated, passport) {
  var router_index_login = require('./index_login.js');
  var leeeeee;

  var fs = require("fs");
  var exec = require('child_process').exec,
    child;
  const {
    execSync
  } = require('child_process');


  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get('/api/index_login', isAuthenticated, function(req, res) {
    req.accepts('application/json');
    var type = req.query.type;
    if (type == "sidemenu") {
      let res_data = router_index_login.sidemenu_get();
      res.send(res_data);
    }
  });
  /*
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
  app.post('/login_check', function(req, res) {
    req.accepts('application/json');
    var sess = req.session;
    var id = req.body.id;
    var password = req.body.password;
    console.log(JSON.stringify(req.body) + ", ");
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
  });*/
  app.get('/index_login', isAuthenticated, function(req, res) {
    res.render('index_login.html');
  });

  app.post('/login_check', passport.authenticate('local-login', {
      failureRedirect: '/',
      failureFlash: true
    }),
    function(req, res) {
      res.redirect('/index_login');
    });

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/i18n_load', isAuthenticated, function(req, res) {
    let data = router_index_login.i18n_load();
    res.send(data);
  });

  app.get('/i18n_save', isAuthenticated, function(req, res) {
    let language = req.query.lang;
    let data = router_index_login.i18n_save(language);
    res.send(data);
  });

  require('./socket.js');
}
