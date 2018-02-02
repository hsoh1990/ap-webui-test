module.exports = function(app, fs, url){
	var router_dhcpserver = require('./dhcpserver.js');

	app.get('/dhcpserver', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('dhcpserver.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/dhcpserver', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    var select = req.query.select;
    if (type == "clientlist") {
      router_dhcpserver.api_get_clientlist(req, res);
    } else if (type == "dnsmasq") {
      router_dhcpserver.api_get_dnsmasq(req, res);
    } else if (type == "get") {
      router_dhcpserver.api_get(req, res);
    } else if (type == "awk") {
      router_dhcpserver.api_get_awk(req, res);
    } else if (type == "dnsstopstart") {
      if (select == 0) { //stop 시키는 부분
        router_dhcpserver.dnsmasq_stop(req, res);
      } else if (select == 1) { //start 시키는 부분
        router_dhcpserver.dnsmasq_start(req, res);
      } else {
        router_dhcpserver.start_stopbutton(req, res);
      }
    }
  });
  app.post('/api/dhcpserver', function(req, res) {
    router_dhcpserver.api_post(req, res);
  });

};
