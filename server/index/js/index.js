function session_check() {
  var id = document.getElementById("id").value;
  var password = document.getElementById("pwd").value;
  var data = {
    "id" : id,
    "password" : password
  }
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var check_data = this.response;
      if (check_data['check'] == "1") {
        alert("로그인 확인");
        location.href="index_login";
      }else {
        alert("아이디 혹은 비밀번호가 다릅니다.");
        location.href="/";
      }
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("post", "/login_check");
  xhr.responseType = 'json';
  xhr.send(data);
}
