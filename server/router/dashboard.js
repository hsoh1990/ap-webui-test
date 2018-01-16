var fs = require("fs");
var exec = require('child_process').exec,
  child;

exports.api_get = function(req, res) {
  fs.readFile(__dirname + "/../data/" + "dashboarddata.json", 'utf8', function(err, data) {
    var dashboarddata = JSON.parse(data); //json text -> json object
    var execresult;
    //console.log(dashboarddata);
    res.send(dashboarddata);
  })
}

exports.consolelog_serverdata = function () {
  child = exec("ip a s wlan0", function(error, stdout1, stderr) {
    child = exec("iwconfig wlan0", function(error, stdout2, stderr) {
      child = exec("ifconfig wlan0", function(error, stdout3, stderr) {
        var text = stdout1 + stdout2;
        console.log('text: ' + text);
        stdout = text.replace(/\s\s+/, ' ');
        console.log('replace: ' + text);

        exports.serverdata_get_ip(text);
        var netmask = stdout3.match(/netmask ([0-9.]+)/i);
        console.log('netmask: ' + netmask[1]);
        var mac = text.match(/link\/ether ([0-9a-f:]+)/i);
        console.log('mac: ' + mac[1]);
        var RX_packets = text.match(/RX packets:(\d+)/);
        var TX_packets = text.match(/TX packets:(\d+)/);
        var RX_bytes = text.match(/RX bytes:(\d+ \(\d+.\d+ [K|M|G]iB\))/i);
        var TX_bytes = text.match(/TX Bytes:(\d+ \(\d+.\d+ [K|M|G]iB\))/i);
        var ssid = text.match(/ESSID:\"([a-zA-Z0-9\s]+)\"/i);
        var access_point = text.match(/Access Point: ([0-9a-f:]+)/i);
        var Bit_Rate = text.match(/Bit Rate=([0-9\.]+ Mb\/s)/i);
        var Tx_Power = text.match(/Tx-Power=([0-9]+ dBm)/i);
        var Link_Quality = text.match(/Link Quality=([0-9]+)/i);
        var Signal_level = text.match(/Signal level=(-?[0-9]+ dBm)/i);
        var Frequency = text.match(/Frequency:(\d+.\d+ GHz)/i);
        try {
          if (RX_packets != null) {
            console.log('RX_packets: ' + RX_packets[1]);
          } else {
            throw "RX_packets: No Data";
          }
        } catch (e) {
          console.log(e);
        }

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
