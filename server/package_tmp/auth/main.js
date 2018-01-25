module.exports = function(app, fs, url){
	var router_auth = require('./auth.js');

	app.get('/auth', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('auth.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/auth', function(req, res) {
    var sess;
    sess = req.session;
    var id = req.query.id;
    var password = req.query.password;
    fs.readFile(__dirname + "/../userdata/" + "userdata.json", 'utf8', function(err, data) {
      var userdata = JSON.parse(data); //json text -> json object
      var check = {};
      if (id == userdata['admin']['username'] && password == userdata['admin']['password']) {
        check['check'] = "1";
      } else {
        check['check'] = "0";
      }
      res.send(check);
    })
  });
  app.post('/api/auth', function(req, res) {
    router_auth.api_post(req, res);
  });

};
