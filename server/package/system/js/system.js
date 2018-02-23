function system_infor_box_fill(data) {
  var content = "<h4 id=system_infor>System Information</h4>";
  var type = "system_Information";
  var index = 0;

  for (var name in data[type]) {
    index++;
    if (index > 3) {
      break;
    }
    content += "<div class=info-item id="+ name.replace(/ /gi, '') +">" + name + "</div>" + data[type][name] + "</br>";
  }
  content += "<br>";
  return content;
}

function system_infor_bar_box_fill(data) {
  var content = "";
  var index = 0;
  var type = "system_Information";
  for (var name in data[type]) {
    index++;
    if (index > 3) {
      content += "<div class=info-item id="+ name.replace(/ /gi, '') +">" + name + "</div><div class=progress>";
      content += "<div class='progress-bar progress-bar-info progress-bar-striped active' role=progressbar aria-valuenow aria-valuemin=0 aria-valuemax=100 style=width:" + data[type][name] + "%;></div></div>"
    }
  }
  return content;
}

function refresh_button(data) {
  document.getElementById("system_infor_div_id").innerHTML = system_infor_box_fill(data);
  document.getElementById("system_infor_bar_div_id").innerHTML = system_infor_bar_box_fill(data);
  updateContent_infor();
}

function connect_data_get() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      refresh_button(data);
      i18n_load();
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/system?type=refresh");
  xhr.responseType = 'json';
  xhr.send();
}

function Reboot_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      //button_input(data['success']);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/system?type=reboot");
  xhr.responseType = 'json';
  xhr.send();
}

function shutdown_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      //button_input(data['success']);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/system?type=shutdown");
  xhr.responseType = 'json';
  xhr.send();
}

function button_input(data) {
  var content = "";
  if (data == 1) {
    content = "<input type=button class='btn btn-outline btn-primary' value='Save settings' name=savedhcpdsettings onclick=savesetting_button() />";
    content += "<input type=button class='btn btn-warning' value='Stop dnsmasq' name='stopdhcpd' onclick=change_dnsmasq_stopstart_button(0) />";
  } else if (data == 2) {
    content = "<input type=button class='btn btn-outline btn-primary' value='Save settings' name=savedhcpdsettings onclick=savesetting_button() />";
    content += "<input type=button class='btn btn-success' value='Start dnsmasq' name='stopdhcpd' onclick=change_dnsmasq_stopstart_button(1) />";
  }
  document.getElementById("startstop_button_id").innerHTML = content;
}
