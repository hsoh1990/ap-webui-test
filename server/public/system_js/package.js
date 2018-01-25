function package_get() { //사이드 메뉴 데이터를 받아옵니다
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
    content += "<td>" + (a+1) + "</td>";
    content += "<td>" + package_data_key[a] + "</td>";
    content += "<td>" + package_data[package_data_key[a]]['version'] + "</td>";
    content += "<td>100</td>";
    content += "<td>uninstall</td>";
    content += "</tr>";
  }
  document.getElementById("package_installed").innerHTML = content;
}