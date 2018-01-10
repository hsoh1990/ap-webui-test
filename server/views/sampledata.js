function dashboard_data() {
  console.log("1");
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.status == 200) { // onload called even on 404 etc so check the status
      console.log("2");
      alert(this.response);
      //console.log(data); // No need for JSON.parse()
    }
  };

  xhr.onerror = function() {
    console.log("confirm");
    // error
  };

  xhr.open('GET', '/api/dashboard');
  xhr.responseType = 'json';

  console.log("3");
  xhr.send();
  console.log("4");
}

function clientsetting_data() {

  var data = {
    example_1: {
      "SSID": "1",
      "Channel": "10",
      "Security": "yes",
      "Passpharse": "a"
    },
    example_2: {
      "SSID": "2",
      "Channel": "20",
      "Security": "no",
      "Passpharse": "b"
    },
    example_3: {
      "SSID": "3",
      "Channel": "30",
      "Security": "yes",
      "Passpharse": "c"
    },
    example_4: {
      "SSID": "4",
      "Channel": "40",
      "Security": "no",
      "Passpharse": "d"
    }
  }
  return data;
}

function user_data() {
  var userData = {
    admin: {
      "username": "admin",
      "password": "00000000"
    }
  }
  return userData;
}

function dhcpserver_clientlist_data() {
  var clientlist_data = {
    example_1: {
      "Expire time": "1",
      "MAC Address": "aa.aa.aa.aa.aa.aa",
      "IP Address": "1.1.1.1",
      "Host name": "qqqq",
      "Client ID": "lee"
    },
    example_2: {
      "Expire time": "2",
      "MAC Address": "bb.bb.bb.bb.bb.bb",
      "IP Address": "2.2.2.2",
      "Host name": "wwww",
      "Client ID": "park"
    },
    example_3: {
      "Expire time": "3",
      "MAC Address": "cc.cc.cc.cc.cc.cc",
      "IP Address": "3.3.3.3",
      "Host name": "eeee",
      "Client ID": "kim"
    },
    example_4: {
      "Expire time": "4",
      "MAC Address": "dd.dd.dd.dd.dd.dd",
      "IP Address": "4.4.4.4",
      "Host name": "rrrr",
      "Client ID": "yune"
    },
    alert_select: {
      "Dnsmasq is": true
    }
  }
  return clientlist_data;
}

function hotspot_data() {
  var hotspotData = {
    Interface_Information: {
      "Interface Name": "wlan0",
      "IP Address": "192.168.0.1",
      "Subnet Mask": "255.255.255.0",
      "Mac Address": "b8.27.eb.c6.4f.e3"
    },
    Interface_Statistics: {
      "Received Packets": "No Data",
      "Received Bytes": "No Data",
      "Transferred Packets": "No Data",
      "Transferred Bytes": "No Data"
    },
    Wireless_Information: {
      "Connected To": "Not connected",
      "AP Mac Address": "",
      "Bitrate": "",
      "Signal Level": "",
      "Transmit Power": "31 dBm",
      "Frequency": "",
      "Link Quality": "50"
    },
    alert_select: {
      "HostAPD is": true
    }
  }
  return hotspotData;
}

function current_setting_data() {
  var SCvalue = {
    current_setting_eth0: {
      "eth0": "2:eth0: mtu 1500 qdisc pfifo_fast state UP group default qlen 1000<br>link/ether b8:27:eb:93:la:b6 brd ff:ff:ff:ff:ff:ff<br>inet 10.100.2.100/16 brd 10.100.255.255 scope global eth0<br>valid_lft forever preferred_lft forever<br>inet6 fdle:5cca:1fae:0:ba27:ebff:fe93:lab6/64 scope global mngtmpaddr dynamic<br>valid_lft forever preferred_lft forever<br>inet6 fe80::ba27:ebff:fe93:lab6/64 scope link<br>valid_lft forever preferred_lft forever"
    },
    current_setting_wlan0: {
      "wlan0": "3:wlan0: mtu 1500 qdisc pfifo_fast state DOWN group default qlen 1000<br>link/ether b8:27:eb:c6:4f:e3 brd ff:ff:ff:ff:ff:ff<br>inet 192.168.0.1/24 brd 192.168.0.255 scope global wlan0<br>valid_lft forever preferred_lft forever<br>inet6 fe80::ba27::ebff::fec6::4fe3/64 scope link<br>valid_lft forever preferred_lft forever"
    }
  }
  return SCvalue;
}

function system_information_data() {

  var system_info_Data = {
    system_Information: {
      "Hostname": "raspberry-pi3-ap",
      "Pi Revision": "UnKnown Pi",
      "Uptime": "12 days 20 hours 20 minutes",
      "Memory Used": "10",
      "CPU Load": "20"
    }
  }
  return system_info_Data;
}
