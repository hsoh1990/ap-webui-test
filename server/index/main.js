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

  app.get('/index_login', isAuthenticated, function(req, res) {
    res.render('index_login.html');
  });

  //로컬 로그인 시작
  app.post('/login_check', passport.authenticate('local-login', {
      failureRedirect: '/',
      failureFlash: true
    }),
    function(req, res) {
      res.redirect('/index_login');
    });

  /*
    // 구글 로그인 시작
    app.get('/google', passport.authenticate('google', {
      scope: ['profile']
    }));
  */

  app.get('/google', (req, res) => {
    res.send('good');
  });

  // 구글 로그인 결과 콜백
  app.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
  }), function(req, res) {
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
