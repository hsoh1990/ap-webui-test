function logout_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status

    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/logout");
  xhr.responseType = 'json';
  xhr.send();
}
