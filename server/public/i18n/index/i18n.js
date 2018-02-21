// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "ipenable": "IP Enable",
        "macenable": "MAC Enable",
        "hostnameenable": "Host name Enable",
        "ownerenable": "Owner Enable"
      }
    },
    ko: {
      translation: {
        "ipenable": "IP 주소 보이기",
        "macenable": "MAC 주소 보이기",
        "hostnameenable": "장치 이름 보이기",
        "ownerenable": "소유자 보이기"
      }
    }
  }
}, function(err, t) {
  i18n_load();
});

function updateContent_nav() {

  /*
    var contentData = window.document.getElementsByClassName("nav");
    var child_li = contentData[0].getElementsByTagName("li");
    for(var a = 0;a< child_li.length; a++) {
      var child_a = child_li[a].getElementsByTagName("a");
      child_a[0].innerHTML = i18next.t('name');
    }*/
}

function updateContent_infor() {
  document.getElementById('i18n_ip').innerHTML = i18next.t('ipenable');
  document.getElementById('i18n_mac').innerHTML = i18next.t('macenable');
  document.getElementById('i18n_hostname').innerHTML = i18next.t('hostnameenable');
  document.getElementById('i18n_owner').innerHTML = i18next.t('ownerenable');

}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

function i18n_load() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var check_data = this.response;
      var lang = document.getElementById("lang_select");
      for(var a = 0;a < lang.options.length; a++) {
        if (lang.options[a].value == check_data['language']) {
          lang.options[a].selected = true;
          changeLng();
        }
      }

    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/i18n_load");
  xhr.responseType = 'json';
  xhr.send();
}
i18next.on('languageChanged', () => {
  updateContent_nav();
  updateContent_infor();
});
