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

exports.consolelog_serverdata = function() {
  child = exec("ip a s wlan0", function(error, stdout1, stderr) {
    child = exec("iwconfig wlan0", function(error, stdout2, stderr) {
      child = exec("ifconfig wlan0", function(error, stdout3, stderr) {
        var text = stdout1 + stdout2 + stdout3;

        var interface_name = "wlan0";
        var ip = exports.serverdata_get_ip(text);
        var netmask = exports.serverdata_get_netmask(text);
        var mac = exports.serverdata_get_mac(text);

        var rx_packet = exports.serverdata_RX_packets(stdout3);
        var rx_byte = exports.serverdata_RX_bytes(stdout3);
        var tx_packet = exports.serverdata_TX_packets(stdout3);
        var tx_byte = exports.serverdata_TX_bytes(stdout3);

        var ssid = exports.serverdata_ssid(text);
        var access_point = exports.serverdata_access_point(text);
        var bitrate = exports.serverdata_Bit_Rate(text);
        var signallevel = exports.serverdata_Signal_level(text);
        var tx_power = exports.serverdata_Tx_Power(text);
        var frequency = exports.serverdata_Frequency(text);
        var link_quality = exports.serverdata_Link_Quality(text);
        var interfaceis = exports.serverdata_get_interfaceis(stdout1);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }

        // ADD TO DATA
        var Interface_Information = {}; //오브젝트
        Interface_Information["Interface Name"] = "wlan0";
        Interface_Information["IP Address"] = ip;
        Interface_Information["Subnet Mask"] = netmask;
        Interface_Information["Mac Address"] = mac;

        var Interface_Statistics = {}; //오브젝트
        Interface_Statistics["Received Packets"] = rx_packet;
        Interface_Statistics["Received Bytes"] = rx_byte;
        Interface_Statistics["Transferred Packets"] = tx_packet;
        Interface_Statistics["Transferred Bytes"] = tx_byte;

        var Wireless_Information = {}; //오브젝트
        Wireless_Information["Connected To"] = ssid;
        Wireless_Information["AP Mac Address"] = access_point;
        Wireless_Information["Bitrate"] = bitrate;
        Wireless_Information["Signal Level"] = signallevel;
        Wireless_Information["Transmit Power"] = tx_power;
        Wireless_Information["Frequency"] = frequency;
        Wireless_Information["Link Quality"] = link_quality;

        var alert_select = {};
        alert_select["Interface is"] = interfaceis;
        var dashboard_json = {};
        dashboard_json["Interface_Information"] = Interface_Information;
        dashboard_json["Interface_Statistics"] = Interface_Statistics;
        dashboard_json["Wireless_Information"] = Wireless_Information;
        dashboard_json["alert_select"] = alert_select;

        // SAVE DATA
        fs.writeFile(__dirname + "/../data/" + "dashboarddata.json",
          JSON.stringify(dashboard_json, null, '\t'), "utf8",
          function(err, data) {
            result = {
              "success": 1
            };
          })


      });
    });
  });
}
exports.serverdata_get_interfaceis = function(text) {
  var numReturn = text.indexOf("UP");
  if (numReturn != -1) {
    console.log('Interface is: UP');
    return true;
  } else {
    console.log('Interface is: DOWN');
    return false;
  }
}
exports.serverdata_get_ip = function(text) {
  var ip = text.match(/inet ([0-9.]+)/i);
  try {
    if (ip != null) {
      console.log('ip: ' + ip[1]);
      return ip[1];
    } else {
      throw "No IP Address Found";
    }
  } catch (e) {
    console.log(e);
    return "No IP Address Found";
  }
}
exports.serverdata_get_netmask = function(text) {
  var netmask = text.match(/netmask ([0-9.]+)/i);
  try {
    if (netmask != null) {
      console.log('netmask: ' + netmask[1]);
      return netmask[1];
    } else {
      throw "No Subnet Mask Found";
    }
  } catch (e) {
    console.log(e);
    return "No Subnet Mask Found";
  }
}
exports.serverdata_get_mac = function(text) {
  var mac = text.match(/link\/ether ([0-9a-f:]+)/i);

  try {
    if (mac != null) {
      console.log('mac: ' + mac[1]);
      return mac[1];
    } else {
      throw "No MAC Address Found";
    }
  } catch (e) {
    console.log(e);
    return "No MAC Address Found";
  }
}
exports.serverdata_RX_packets = function(text) {
  var RX_packets = text.match(/RX packets (\d+)/);

  try {
    if (RX_packets != null) {
      console.log('RX packets: ' + RX_packets[1]);
      return RX_packets[1];
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
    return "No Data";
  }
}
exports.serverdata_TX_packets = function(text) {
  var TX_packets = text.match(/TX packets (\d+)/);

  try {
    if (TX_packets != null) {
      console.log('TX packets: ' + TX_packets[1]);
      return TX_packets[1];
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
    return "No Data";
  }
}
exports.serverdata_RX_bytes = function(text) {
  var RX_bytes = text.match(/bytes (\d+ \(\d+.\d+ [Ki|Mi|Gi]B\))/i);

  try {
    if (RX_bytes != null) {
      console.log('RX bytes: ' + RX_bytes[1]);
      return RX_bytes[1];
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
    return "No Data";
  }
}
exports.serverdata_TX_bytes = function(text) {
  var TX_bytes = text.match(/bytes (\d+ \(\d+.\d+ [Ki|Mi|Gi]B\))/gi);
  console.log(TX_bytes);
  /*var split_TX_bytes = TX_bytes[1].split(" ");
  TX_bytes = split_TX_bytes[1] + " " + split_TX_bytes[2] + " " + split_TX_bytes[3];
  try {
    if (TX_bytes != null) {
      console.log('TX bytes: ' + TX_bytes);
      return TX_bytes;
    } else {
      throw "No Data";
    }
  } catch (e) {
    console.log(e);
    return "No Data";
  }*/
}
exports.serverdata_ssid = function(text) {
  var ssid = text.match(/ESSID:\"([a-zA-Z0-9\s]+)\"/i);

  try {
    if (ssid != null) {
      console.log('ssid: ' + ssid[1]);
      return ssid[1];
    } else {
      throw "Not connected";
    }
  } catch (e) {
    console.log(e);
    return "Not connected";
  }
}
exports.serverdata_access_point = function(text) {
  var access_point = text.match(/Access Point: ([0-9a-f:]+)/i);

  try {
    if (access_point != null) {
      console.log('access point: ' + access_point[1]);
      return access_point[1];
    } else {
      throw "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}
exports.serverdata_Bit_Rate = function(text) {
  var Bit_Rate = text.match(/Bit Rate=([0-9\.]+ Mb\/s)/i);

  try {
    if (Bit_Rate != null) {
      console.log('Bit Rate: ' + Bit_Rate[1]);
      return Bit_Rate[1];
    } else {
      throw "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}
exports.serverdata_Signal_level = function(text) {
  var Signal_level = text.match(/Signal level=(-?[0-9]+ dBm)/i);

  try {
    if (Signal_level != null) {
      console.log('Signal level: ' + Signal_level[1]);
      return Signal_level[1];
    } else {
      throw "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}
exports.serverdata_Tx_Power = function(text) {
  var Tx_Power = text.match(/Tx-Power=([0-9]+ dBm)/i);

  try {
    if (Tx_Power != null) {
      console.log('Tx Power: ' + Tx_Power[1]);
      return Tx_Power[1];
    } else {
      throw "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}
exports.serverdata_Frequency = function(text) {
  var Frequency = text.match(/Frequency:(\d+.\d+ GHz)/i);

  try {
    if (Frequency != null) {
      console.log('Frequency: ' + Frequency[1]);
      return Frequency[1];
    } else {
      throw "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}
exports.serverdata_Link_Quality = function(text) {
  var Link_Quality = text.match(/Link Quality=([0-9]+)/i);

  try {
    if (Link_Quality != null) {
      console.log('Link Quality: ' + Link_Quality[1]);
      return Link_Quality[1];
    } else {
      throw "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}
