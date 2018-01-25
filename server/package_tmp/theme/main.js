module.exports = function(app, fs, url){
	var router_theme = require('./theme.js');

	app.get('/changetheme', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('changetheme.html');
    } else {
      res.render('index.html');
    }
  });

};
