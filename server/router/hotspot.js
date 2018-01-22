var fs = require("fs");
var exec = require('child_process').exec,
  child;
  const {
    execSync
  } = require('child_process');

exports.api_get = function(req, res) {
  exports.read_pidof_hostapd();
  fs.readFile(__dirname + "/../data/hotspot/" + "hotspotdata.json", 'utf8', function(err, data) {
    var hotspotdata = JSON.parse(data); //json text -> json object
    child = exec("cat /etc/hostapd/hostapd.conf", function(error, stdout, stderr) {
      console.log('hostapd: ' + stdout);
      var arr = stdout.split("\n");
      //console.log('split: ' + arr[0]);
      for (var i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i].split("=");
        console.log('split: ' + arr[i][0] + ", " + arr[i][1]);
      }
      exports.savedata_basic(arr);
      exports.savedata_security(arr);
      exports.savedata_advanced(arr);

    });
    res.send(hotspotdata);
  })
}
exports.read_pidof_hostapd = function() {
  child = exec("pidof hostapd | wc -l", function(error, stdout, stderr) {
    var data = {}; //오브젝트
    if (stdout[0] == 0) {
      data['HostAPD is'] = false;
    } else if (stdout[0] == 1) {
      data['HostAPD is'] = true;
    }
    var hostapddata = {};
    hostapddata['alert_select'] = data;

    fs.writeFile(__dirname + "/../data/hotspot/" + "hotspotdata.json",
      JSON.stringify(hostapddata, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
      })
  });
}
exports.api_get_basic = function(req, res) {
  fs.readFile(__dirname + "/../data/hotspot/" + "basicdata.json", 'utf8', function(err, data) {
    var basicdata = JSON.parse(data); //json text -> json object
    res.send(basicdata);
  })
}
exports.api_get_advanced = function(req, res) {
  fs.readFile(__dirname + "/../data/hotspot/" + "advanceddata.json", 'utf8', function(err, data) {
    var advanceddata = JSON.parse(data); //json text -> json object

    res.send(advanceddata);
  })
}
exports.api_get_security = function(req, res) {
  fs.readFile(__dirname + "/../data/hotspot/" + "securitydata.json", 'utf8', function(err, data) {
    var securitydata = JSON.parse(data); //json text -> json object

    res.send(securitydata);
  })
}
exports.api_get_awk = function(req, res) {

  child = exec("ip -o link show | awk -F': ' '{print $2}'", function(error, stdout, stderr) {
    var arr = stdout.split("\n");
    var awkdata = {}; //오브젝트
    for (var a = 0; a < arr.length; a++) {
      awkdata[a] = arr[a];
    }
    res.send(awkdata);

  });
}
exports.savedata_basic = function(arr) {
  var basic_data = {}; //오브젝트
  basic_data["type"] = "basic";
  basic_data["interface"] = arr[0][1];
  basic_data["ssid"] = arr[2][1];
  basic_data["wireless_mode"] = arr[3][1];
  basic_data["channel"] = arr[4][1];
  console.log(JSON.stringify(basic_data));
  // SAVE DATA
  fs.writeFile(__dirname + "/../data/hotspot/" + "basicdata.json",
    JSON.stringify(basic_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}
exports.savedata_security = function(arr) {
  var security_data = {}; //오브젝트
  security_data["type"] = "security";
  security_data["security_type"] = arr[8][1];
  security_data["encryption_type"] = arr[11][1];
  security_data["psk"] = arr[9][1];
  console.log(JSON.stringify(security_data));
  // SAVE DATA
  fs.writeFile(__dirname + "/../data/hotspot/" + "securitydata.json",
    JSON.stringify(security_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}

exports.savedata_advanced = function(arr) {
  var advanced_data = {}; //오브젝트
  advanced_data["type"] = "advanced";
  advanced_data["enable_logging"] = "test";
  advanced_data["country_code"] = "KR";
  console.log(JSON.stringify(advanced_data));
  // SAVE DATA
  fs.writeFile(__dirname + "/../data/hotspot/" + "advancedata.json",
    JSON.stringify(advanced_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}


exports.api_post_basic = function(req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "basicdata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      exports.tmp_file_save();
      res.json(result);
    })
}

exports.api_post_security = function(req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "securitydata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      exports.tmp_file_save();
      res.json(result);
    })
}

exports.api_post_advanced = function(req, res) {
  fs.writeFile(__dirname + "/../data/hotspot/" + "advanceddata.json",
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
  var basic_data = fs.readFileSync(__dirname + "/../data/hotspot/" + "basicdata.json", 'utf8');
  var security_data = fs.readFileSync(__dirname + "/../data/hotspot/" + "securitydata.json", 'utf8');
  basic_data = JSON.parse(basic_data);
  security_data = JSON.parse(security_data);
  console.log("베이직 : " + basic_data);
  text_tmp += "interface=" + basic_data['interface'] + "\n";
  text_tmp += "driver=nl80211\n";
  text_tmp += "ssid=" + basic_data['ssid'] + "\n";
  text_tmp += "hw_mode=" + basic_data['wireless_mode'] + "\n";
  text_tmp += "channel=" + basic_data['channel'] + "\n";
  text_tmp += "wmm_enabled=0\n";
  text_tmp += "macaddr_acl=0\n";
  text_tmp += "auth_algs=1\n";

  text_tmp += "wpa=" + security_data['security_type'] + "\n";
  text_tmp += "wpa_passphrase=" + security_data['psk'] + "\n";
  text_tmp += "wpa_key_mgmt=WPA-PSK\n";
  text_tmp += "wpa_pairwise=" + security_data['encryption_type'] + "\n";
  text_tmp += "rsn_pairwise=CCMP\n";

  fs.writeFileSync(__dirname + "/../data/hotspot/" + "tmp.txt",
    text_tmp, "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
  const save = execSync('sudo cp ' + __dirname + '/../data/hotspot/tmp.txt /etc/hostapd/hostapd.conf', {
    encoding: 'utf8'
  });
}

exports.start_stopbutton = function(req, res) {
  child = exec("pidof hostapd | wc -l", function(error, stdout, stderr) {
    res.send(stdout);
  });
}

exports.hotspot_stop = function(req, res) {
  child = exec("sudo /etc/init.d/hostapd stop", function(error, stdout, stderr) {
    result = {
      "success": 0
    };
    res.send(result);
  });
}
exports.hotspot_start = function(req, res) {
  child = exec("sudo /etc/init.d/hostapd start", function(error, stdout, stderr) {
    result = {
      "success": 1
    };
    res.send(result);
  });
}
