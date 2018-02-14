function sidemenu_get() { //사이드 메뉴 데이터를 받아옵니다
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/index_login?type=sidemenu", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      sidemenu_output(this.response);
      updateContent_nav();
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function sidemenu_output(sidemenu_data) {
  var sidemenu_data_key = Object.getOwnPropertyNames(sidemenu_data);
  var content = "";
  for (var a = 0; a < Object.keys(sidemenu_data).length; a++) {
    content += "<li>";
    //content += "<a href=" + sidemenu_data_key[a] + " id=\"" + sidemenu_data_key[a] + "_navid\"><i class=''></i> " + sidemenu_data[sidemenu_data_key[a]] + "</a>";
    content += "<a href=" + sidemenu_data_key[a] + " id=\"" + sidemenu_data_key[a] + "_navid\"><i class=''></i> </a>";
    content += "</li>";
  }
  document.getElementById("side-menu").innerHTML = content;
}
