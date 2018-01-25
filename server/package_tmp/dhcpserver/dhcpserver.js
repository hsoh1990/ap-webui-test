var fs = require("fs");
var exec = require('child_process').exec,
  child;
  const {
    execSync
  } = require('child_process');

exports.api_get = function(req, res) {
  const stdout2 = execSync('cat /etc/dnsmasq.conf', {
    encoding: 'utf8'
  });
  var arr = stdout2.split("\n");
  var interface_type = arr[0].split("=");
  var tmp = arr[6].split("=");
  var range = tmp[1].split(",");
  range[2] = range[2].match(/([0-9]*)([a-z])/i);
  var qwe = range[2][0].match(/([0-9]*)/i);
  exports.savedata_serversetting(req, res, interface_type[1], range, qwe[0]);

}
exports.api_get_awk = function(req, res) {

  child = exec("ip -o link show | awk -F': ' '{print $2}'", function(error, stdout, stderr) {
    var arr = stdout.split("\n");
    var awkdata = {};//오브젝트
    for(var a = 0;a < arr.length;a++){
      awkdata[a] = arr[a];
    }
    res.send(awkdata);

  });
}
exports.savedata_serversetting = function(req, res, interface_type, range, interval) {
  var s_setting_data = {}; //오브젝트
  s_setting_data["interface"] = interface_type;
  s_setting_data["starting_IP_address"] = range[0];
  s_setting_data["ending_IP_address"] = range[1];
  s_setting_data["Lease_time"] = interval;
  s_setting_data["interval"] = range[2][2];
  // SAVE DATA
  fs.writeFile(__dirname + "/data/" + "serversetting.json",
    JSON.stringify(s_setting_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(s_setting_data);
    })
}

exports.api_get_clientlist = function(req, res) {
  exports.write_clientlist(req, res);
}
exports.write_clientlist = function(req, res) {
  child = exec("cat /var/lib/misc/dnsmasq.leases", function(error, stdout, stderr) {
    console.log('stdout: ' + stdout[11]);

    var arr = []; //줄 단위로 배열 저장(마지막은 빈배열이 들어감.)
    arr = stdout.split("\n");
    var data__ = {};
    for (var i = 0; i < arr.length - 1; i++) { //2차원 배열에 data 저장
      arr[i] = arr[i].split(" ");
      var tmp = {};
      var string_num = "client_list_";
      string_num += String(i + 1);
      tmp['Expire time'] = arr[i][0];
      tmp['MAC Address'] = arr[i][1];
      tmp['IP Address'] = arr[i][2];
      tmp['Host name'] = arr[i][3];
      tmp['Client ID'] = arr[i][4];
      data__[string_num] = tmp;
      console.log('arr ' + i + ' : ' + arr[i]);
      console.log('arr ' + i + '[] : ' + arr[i][0]);
    }
    fs.writeFile(__dirname + "/data/" + "clientlist.json",
      JSON.stringify(data__, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
        res.json(data__);
      })
  });
}
exports.api_get_dnsmasq = function(req, res) {
  exports.write_pidof_dnsmasq(req, res);
}

exports.write_pidof_dnsmasq = function(req, res) {
  child = exec("pidof dnsmasq | wc -l", function(error, stdout, stderr) {
    var data = {}; //오브젝트
    if (stdout[0] == 0) {
      data['Dnsmasq is'] = false;
    } else if (stdout[0] == 1) {
      data['Dnsmasq is'] = true;
    }
    var dnsmasqdata = {};
    dnsmasqdata['alert_select'] = data;

    fs.writeFile(__dirname + "/data/" + "dnsmasq_dec.json",
      JSON.stringify(dnsmasqdata, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
        res.json(dnsmasqdata);
      })
  });
}

exports.api_post = function(req, res) {
  req.accepts('application/json');
  // input message handling
  json = req.body;

  // output message
  fs.writeFile(__dirname + "/data/" + "serversetting.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      exports.tmp_file_save();
      res.json(result);
    })
}

exports.tmp_file_save = function() {
  var text_tmp = "";
  var serversetting_data = fs.readFileSync(__dirname + "/data/" + "serversetting.json", 'utf8');

  serversetting_data = JSON.parse(serversetting_data);
  console.log("serversetting : " + serversetting_data);
  text_tmp += "interface=" + serversetting_data['interface'] + "\n";
  text_tmp += "listen-address=192.168.0.1\n";
  text_tmp += "bind-interfaces\n";
  text_tmp += "server=8.8.8.8\n";
  text_tmp += "domain-needed\n";
  text_tmp += "bogus-priv\n";
  text_tmp += "dhcp-range=" + serversetting_data['starting_IP_address'] + "," + serversetting_data['ending_IP_address'] + "," + serversetting_data['Lease_time'] + "" + serversetting_data['interval'];


  fs.writeFileSync(__dirname + "/data/" + "tmp.txt",
    text_tmp, "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
  const save = execSync('sudo cp ' + __dirname + '/data/tmp.txt /etc/dnsmasq.conf', {
    encoding: 'utf8'
  });
}

exports.start_stopbutton = function(req, res) {
  child = exec("pidof dnsmasq | wc -l", function(error, stdout, stderr) {
    res.send(stdout);
  });
}

exports.dnsmasq_stop = function(req, res) {
  child = exec("sudo /etc/init.d/dnsmasq stop", function(error, stdout, stderr) {
    result = {
      "success": 0
    };
    res.send(result);
  });
}
exports.dnsmasq_start = function(req, res) {
  child = exec("sudo /etc/init.d/dnsmasq start", function(error, stdout, stderr) {
    result = {
      "success": 1
    };
    res.send(result);
  });
}
