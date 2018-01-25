module.exports = function(app, fs, url){
	var router_hotspot = require('./hotspot.js');

	app.get('/hotspot', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('hotspot.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    var select = req.query.select;
    if (type == "basic") {
      router_hotspot.api_get_basic(req, res);
    } else if (type == "security") {
      router_hotspot.api_get_security(req, res);
    } else if (type == "advanced") {
      router_hotspot.api_get_advanced(req, res);
    } else if (type == "awk") {
      router_hotspot.api_get_awk(req, res);
    } else if (type == "get") {
      router_hotspot.api_get(req, res);
    } else if (type == "logging") {
      router_hotspot.api_get_log(req, res);
    } else if (type == "wlan0stopstart") {
      if (select == 0) { //stop 시키는 부분
        router_hotspot.hotspot_stop(req, res);
      } else if (select == 1) { //start 시키는 부분
        router_hotspot.hotspot_start(req, res);
      } else {
        router_hotspot.start_stopbutton(req, res);
      }
    }
  });
  app.post('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    json = req.body;

    console.log('type : ' + json.type);

    if (json.type == "basic") {
      router_hotspot.api_post_basic(req, res);
    } else if (json.type == "security") {
      router_hotspot.api_post_security(req, res);
    } else if (json.type == "advanced") {
      router_hotspot.api_post_advanced(req, res);
    }
  });

};
