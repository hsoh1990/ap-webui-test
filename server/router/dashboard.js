var fs = require("fs");
var exec = require('child_process').exec,
  child;

exports.api_get = function(req, res) {
  exports.consolelog_serverdata();
  fs.readFile(__dirname + "/../data/" + "dashboarddata.json", 'utf8', function(err, data) {
    var dashboarddata = JSON.parse(data); //json text -> json object
    //console.log(dashboarddata);
    res.send(dashboarddata);
  })
}

exports.consolelog_serverdata = function () {
  child = exec("ip a s wlan0", function(error, stdout1, stderr) {
    child = exec("iwconfig wlan0", function(error, stdout2, stderr) {
      child = exec("ifconfig wlan0", function(error, stdout3, stderr) {
        var text = stdout1 + stdout2;

        //ifconfig wlan0
        exports.serverdata_get_ip(text);
        exports.serverdata_get_netmask(stdout3);
        exports.serverdata_get_mac(text);
        exports.serverdata_RX_packets(stdout3);

        var TX_bytes = text.match(/TX Bytes:(\d+ \(\d+.\d+ [K|M|G]iB\))/i);
        var ssid = text.match(/ESSID:\"([a-zA-Z0-9\s]+)\"/i);
        var access_point = text.match(/Access Point: ([0-9a-f:]+)/i);
        var Bit_Rate = text.match(/Bit Rate=([0-9\.]+ Mb\/s)/i);
        var Tx_Power = text.match(/Tx-Power=([0-9]+ dBm)/i);
        var Link_Quality = text.match(/Link Quality=([0-9]+)/i);
        var Signal_level = text.match(/Signal level=(-?[0-9]+ dBm)/i);
        var Frequency = text.match(/Frequency:(\d+.\d+ GHz)/i);

        var numReturn = text.indexOf("UP");
        if (numReturn != -1) {
          console.log('Interface is: UP');
        } else {
          console.log('Interface is: DOWN');
        }
        console.log('indexOf: ' + numReturn);

        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    });
  });
}
exports.serverdata_get_ip = function (text) {
  var ip = text.match(/inet ([0-9.]+)/i);
  try {
    if (ip != null) {
      console.log('ip: ' + ip[1]);
    } else {
      throw "No IP Address Found";
    }
  } catch (e) {
    console.log(e);
  }
}
exports.serverdata_get_netmask = function (text) {
  var netmask = text.match(/netmask ([0-9.]+)/i);
  try {
    if (netmask != null) {
      console.log('netmask: ' + netmask[1]);
    } else {
      throw "No Subnet Mask Found";
    }
  } catch (e) {
    console.log(e);
  }
}
exports.serverdata_get_mac = function (text) {
  var mac = text.match(/link\/ether ([0-9a-f:]+)/i);

  try {
    if (mac != null) {
      console.log('mac: ' + mac[1]);
    } else {
      throw "No MAC Address Found";
    }
  } catch (e) {
    console.log(e);
  }
}
exports.serverdata_RX_packets = function (text) {
  var RX_packets = text.match(/RX packets (\d+)/);

  try {
    if (RX_packets != null) {
      console.log('RX packets: ' + RX_packets[1]);
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
  }
}
exports.serverdata_TX_packets = function (text) {
  var TX_packets = text.match(/TX packets (\d+)/);

  try {
    if (TX_packets != null) {
      console.log('TX packets: ' + TX_packets[1]);
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
  }
}
exports.serverdata_RX_bytes = function (text) {
  var RX_bytes = text.match(/bytes (\d+ \(\d+.\d+ [K|M|G]iB\))/i);

  try {
    if (RX_bytes != null) {
      console.log('RX bytes: ' + RX_bytes[1]);
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
  }
}
exports.serverdata_TX_bytes = function (text) {
  var TX_bytes = text.match(/bytes (\d+ \(\d+.\d+ [K|M|G]iB\))/i);

  try {
    if (TX_bytes != null) {
      console.log('TX bytes: ' + TX_bytes[1]);
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
  }
}
