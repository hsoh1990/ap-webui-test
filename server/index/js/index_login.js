console.log("conn | disconn");


function socket_connect_draw() {
  init_();

  socket.on('arp',
    function(data) {
      socket_event_arp(data);
    });
  socket.on('device_count',
    function(data) {
      device_count = data;
    });
  socket.on('exnetinfor',
    function(data) {
      exnet_data.push(data);
      wlan_ex_net_draw(enable__, exnet_data, exnet_data[0].length);
    });
  socket.on('wlaninfor',
    function(data) {
      var check_apcount = 0;
      for (var a = 0; a < wlan_data.length; a++) {
        if (wlan_data[a]['owner'] != data['owner']) {
          wlan_data.splice(a, 1, data);
          check_apcount++;
        } else if (wlan_data[a]['owner'] == data['owner']) {
          check_apcount++;
        }
      }
      if (check_apcount == 0) {
        wlan_data.push(data);
      }
      wlan_draw(enable__, wlan_data);
      ap_draw(enable__, ap_data);
    });
  socket.on('apinfor',
    function(data) {
      var check_apcount = 0;
      for (var a = 0; a < ap_data.length; a++) {
        if (ap_data[a]['owner'] != data['owner']) {
          ap_data.splice(a, 1, data);
          check_apcount++;
        } else if (ap_data[a]['owner'] == data['owner']) {
          check_apcount++;
        }
      }
      if (check_apcount == 0) {
        ap_data.push(data);
      }
      ap_draw(enable__, ap_data);
    });
  socket.on('owner_conn_result',
    function(data) {
      for (var e = 0; e < connect_data.length; e++) {
        if (connect_data[e]['MAC Address'] == data['MAC Address']) {
          connect_data[e]['owner'] = data['owner'];
          break;
        }
      }
      conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, data, connect_data, disconnect_data, connect_count, disconnect_count);
    });
  socket.on('owner_disconn_result',
    function(data) {
      for (var e = 0; e < disconnect_data.length; e++) {
        if (disconnect_data[e]['MAC Address'] == data['MAC Address']) {
          disconnect_data[e]['owner'] = data['owner'];
          break;
        }
      }
      conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, data, connect_data, disconnect_data, connect_count, disconnect_count);
    });
}

function socket_event_arp(data) {
  arp_data = data;

  if (data['length'] == device_count && device_count == (connect_count + disconnect_count)) {
    arp_event_conn_change_disconn(data);
    arp_event_disconn_change_conn(data);
    conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, data, connect_data, disconnect_data, connect_count, disconnect_count);
  }
  else if (data['length'] < device_count) {
    console.log("count = " + device_count);
    let check = elseif_datalength_small_devicecount(data);
    elseif_check_eval_conn_disconn(data, check);
    conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, data, connect_data, disconnect_data, connect_count, disconnect_count);
  }
  else {
    else_arp_eval_conn_disconn_push(data);
    conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, data, connect_data, disconnect_data, connect_count, disconnect_count);
  }
  console.log("  " + connect_count + "    ,    " + disconnect_count);

}

/**
 * [init_ 소켓 관련 전역변수 선언]
 * @return {[type]} [없음]
 *
 */
function init_() {
  socket = io.connect('http://172.16.171.181:8080');
  connection_text(10, 1);
  //전역변수 선언
  connect_count = 0;
  disconnect_count = 0;
  device_count = 0;
  connect_data = new Array();
  disconnect_data = new Array();
  ap_data = new Array();
  wlan_data = new Array();
  exnet_data = new Array();
  enable__ = {
    'ip': 1,
    'mac': 1,
    'hostname': 1,
    'owner': 1
  }
  arp_data = new Object();
}

/**
 * [arp_event_conn_change_disconn 연결된 기기가 연결해제할때]
 * @param  {[type]} data [해당 기기의 data]
 * @return {[type]}      [없음]
 */
function arp_event_conn_change_disconn(data) {
  for (var a = 0; a < connect_count; a++) {
    var i = arp_eval_true(data, connect_data, disconnect_data, a, connect_count, disconnect_count);
    if (i == true) {
      connect_count -= 1;
      disconnect_count += 1;
      connect_data.splice(a, 1);
      disconnect_data.push(data);
    }
  }
}

/**
 * [arp_event_disconn_change_conn 연결 안된 기기가 연결할때]
 * @param  {[type]} data [해당 기기의 data]
 * @return {[type]}      [없음]
 */
function arp_event_disconn_change_conn(data) {
  for (var a = 0; a < disconnect_count; a++) {
    var i = arp_eval_false(data, connect_data, disconnect_data, a, connect_count, disconnect_count);
    if (i == true) {
      connect_count += 1;
      disconnect_count -= 1;
      disconnect_data.splice(a, 1);
      connect_data.push(data);
    }
  }
}

function arp_eval_true(data, connect_data, disconnect_data, a, connect_count, disconnect_count) {
  if (data['MAC Address'] == connect_data[a]['MAC Address']) {
    if (data['arp'] != connect_data[a]['arp']) {
      return true;
    }
  }
}

function arp_eval_false(data, connect_data, disconnect_data, a, connect_count, disconnect_count) {
  if (data['MAC Address'] == disconnect_data[a]['MAC Address']) {
    if (data['arp'] != disconnect_data[a]['arp']) {
      return true;
    }
  }
}

function elseif_datalength_small_devicecount(data) {
  var check = false;
  for (var a = 0; a < disconnect_count; a++) {
    if (data['MAC Address'] == disconnect_data[a]['MAC Address']) {
      connect_count += 1;
      disconnect_count -= 1;
      disconnect_data.splice(a, 1);
      connect_data.push(data);
      check = true;
      break;
    }
  }
  return check;
}
function elseif_check_eval_conn_disconn(data, check) {
  if (check == false) {
    if (data['arp'] == 1) {
      connect_count += 1;
      connect_data.push(data);
    } else if (data['arp'] == 0) {
      disconnect_count += 1;
      disconnect_data.push(data);
    }
  }
  if( device_count < (connect_count + disconnect_count)){
    device_count += 1;
  }
  return check;
}
function else_arp_eval_conn_disconn_push(data) {
  if (data['arp'] == 1) {
    connect_count += 1;
    connect_data.push(data);
  } else if (data['arp'] == 0) {
    disconnect_count += 1;
    disconnect_data.push(data);
  }
  if( device_count < (connect_count + disconnect_count)){
    device_count += 1;
  }
}

function ip_onoff() {
  var value = document.getElementById("ipenable").value;

  if (value == 1) {
    document.getElementById("ipenable").value = 0;
    enable__['ip'] = 0;
  } else if (value == 0) {
    document.getElementById("ipenable").value = 1;
    enable__['ip'] = 1;
  }
  conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, arp_data, connect_data, disconnect_data, connect_count, disconnect_count);
}

function mac_onoff() {
  var value = document.getElementById("macenable").value;

  if (value == 1) {
    document.getElementById("macenable").value = 0;
    enable__['mac'] = 0;
  } else if (value == 0) {
    document.getElementById("macenable").value = 1;
    enable__['mac'] = 1;
  }
  conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, arp_data, connect_data, disconnect_data, connect_count, disconnect_count);
}

function hostname_onoff() {
  var value = document.getElementById("hostnameenable").value;

  if (value == 1) {
    document.getElementById("hostnameenable").value = 0;
    enable__['hostname'] = 0;
  } else if (value == 0) {
    document.getElementById("hostnameenable").value = 1;
    enable__['hostname'] = 1;
  }
  conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, arp_data, connect_data, disconnect_data, connect_count, disconnect_count);
}

function owner_onoff() {
  var value = document.getElementById("ownerenable").value;

  if (value == 1) {
    document.getElementById("ownerenable").value = 0;
    enable__['owner'] = 0;
  } else if (value == 0) {
    document.getElementById("ownerenable").value = 1;
    enable__['owner'] = 1;
  }
  conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, arp_data, connect_data, disconnect_data, connect_count, disconnect_count);
}

function conn_disconn_draw(enable__, exnet_data, wlan_data, ap_data, data, connect_data, disconnect_data, connect_count, disconnect_count) {
  layer_removechildren();
  disconnect_draw(enable__, disconnect_data, disconnect_count);
  connect_draw(enable__, connect_data, connect_count);
  wlan_ex_net_draw(enable__, exnet_data, 4);
  wlan_draw(enable__, wlan_data);
  ap_draw(enable__, ap_data);
  connection_text(data['length'], (connect_count + disconnect_count));
}
