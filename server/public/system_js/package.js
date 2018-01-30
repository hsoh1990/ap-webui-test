function package_get() { //package 데이터를 받아옵니다
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/system?type=package", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      package_output(this.response);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function package_output(package_data) {
  var package_data_key = Object.getOwnPropertyNames(package_data);

  var content = "";
  for (var a = 0; a < Object.keys(package_data).length; a++) {
    content += "<tr>";
    content += "<td>" + (a + 1) + "</td>";
    content += "<td>" + package_data_key[a] + "</td>";
    content += "<td>" + package_data[package_data_key[a]]['version'] + "</td>";
    content += "<td>100</td>";
    if (package_data_key[a] == "System" || package_data_key[a] == "Dashboard") {

    } else {
      content += "<td><button type=button class='btn btn-danger' onclick='uninstall_button(" + a + ")'>uninstall</button></td>";
    }
    content += "</tr>";
  }
  document.getElementById("package_installed").innerHTML = content;
}
function uninstall_button(select) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/system?type=uninstallbutton&select=" + select, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function install_get() { //install 데이터를 받아옵니다
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/system?type=install", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      install_output(this.response);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function install_output(install_data) {
  var install_data_key = Object.getOwnPropertyNames(install_data);

  var content = "";
  for (var a = 0; a < Object.keys(install_data).length; a++) {
    content += "<tr>";
    content += "<td>" + (a + 1) + "</td>";
    content += "<td>" + install_data[install_data_key[a]]['pack_name'] + "</td>";
    content += "<td> </td>";
    content += "<td> </td>";
    content += "<td><button type=button class='btn btn-primary' onclick='install_button(" + a + ")'>install</button></td>";
    content += "</tr>";
  }
  document.getElementById("package_no_install").innerHTML = content;
}

function install_button(select) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/system?type=installbutton&select=" + select, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));

    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}
