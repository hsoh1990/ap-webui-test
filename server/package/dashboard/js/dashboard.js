function interface_box_fill(data) {
  var content = "";
  var type = "";

  type = "Interface_Information";
  content += "<h4 id=interface_infor>Interface Information</h4>";
  for (var name in data[type]) {
    content += "<div class=info-item id="+ name.replace(' ', '') +">" + name + "</div>" + data[type][name] + "</br>";
  }
  type = "Interface_Statistics";
  content += "<h4 id=interface_statis>Interface Statistics</h4>";
  for (var name in data[type]) {
    content += "<div class=info-item id="+ name.replace(' ', '') +">" + name + "</div>" + data[type][name] + "</br>";
  }
  return content;
}

function wireless_infor_box_fill(data) {
  var content = "";
  var type = "Wireless_Information";
  content += "<h4 id=wireless_infor>Wireless Information</h4>";
  for (var name in data[type]) {
    if (name == "Link Quality") {
      content += "<div class=info-item id="+ name.replace(/ /gi, '') +">" + name + "</div><div class=progress><div class='progress-bar progress-bar-info progress-bar-striped active' role=progressbar aria-valuenow aria-valuemin=0 aria-valuemax=100 style=width:" + data[type][name] +
        "%;></div></div>"
      break;
    }
    content += "<div class=info-item id="+ name.replace(/ /gi, '') +">" + name + "</div>" + data[type][name] + "</br>";
  }
  return content;
}

function refresh_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      infor_output(data);
      i18n_load();
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/dashboard?id=refresh");
  xhr.responseType = 'json';
  xhr.send();
}

function infor_output(data) {
  document.getElementById("interface_box_div").innerHTML = interface_box_fill(data); //interface_box_fill(data-target)
  document.getElementById("wireless_infor_box_div").innerHTML = wireless_infor_box_fill(data);
  document.getElementById("inteface_status_pid").innerHTML = interface_status(data); //inteface_status(data)
}

function interface_status(data) {
  var content = "<div class='alert alert-success alert-dismissable'>";
  if (data['alert_select']['Interface is'] == true) {
    content += "<div style=display:inline id=interface_up>";
    content += "Interface is ";
    content += "up";
  } else {
    content += "<div style=display:inline id=interface_down>";
    content += "Interface is ";
    content += "down";
  }
  content += "</div><button type=button class=close data-dismiss=alert aria-hidden=true>x</button>";
  content += "</div>";
  return content;
}

function init_wlan0_stopstart_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      button_input(data);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/dashboard?id=wlan0stopstart");
  xhr.responseType = 'json';
  xhr.send();
}

function button_input(data) {
  var content = "";
  if (data == 1) {
    content = "<input id=btn_stop type=button class='btn btn-warning' value='Stop wlan0' name=ifup_wlan0 onclick=change_wlan0_stopstart_button(0) />";
    content += "<input type=button id=refreshbuttonid class='btn btn-outline btn-primary' value=Refresh onclick=refresh_button() />";
  } else if (data == 0) {
    content = "<input id=btn_start type=button class='btn btn-success' value='Start wlan0' name=ifup_wlan0 onclick=change_wlan0_stopstart_button(1) />";
    content += "<input type=button id=refreshbuttonid class='btn btn-outline btn-primary' value=Refresh onclick=refresh_button() />";
  }
  document.getElementById("start_stop").innerHTML = content;
}

function change_wlan0_stopstart_button(select) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      button_input(data['success']);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/dashboard?id=wlan0stopstart&select=" + select);
  xhr.responseType = 'json';
  xhr.send();
}
