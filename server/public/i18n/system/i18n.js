// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "tab_system": "System",
        "tab_package": "Package",
        "tab_install": "Install",
        "system_infor": "System Information",
        "hostname": "Hostname",
        "revision": "Pi Revision",
        "uptime": "Uptime",
        "memused": "Memory Used",
        "cpuload": "CPU Load"
      }
    },
    ko: {
      translation: {
        "tab_system": "시스템",
        "tab_package": "패키지",
        "tab_install": "설치",
        "system_infor": "시스템 정보",
        "hostname": "기기 이름",
        "revision": "라즈베리파이 버전",
        "uptime": "실행시간",
        "memused": "메모리 사용량",
        "cpuload": "CPU 사용량"
      }
    }
  }
}, function(err, t) {
  // init set content
  /*updateContent_nav();
  updateContent_infor();*/
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
  document.getElementById('panel_system').innerHTML = i18next.t('tab_system');
  document.getElementById('tab_system').innerHTML = i18next.t('tab_system');
  document.getElementById('tab_package').innerHTML = i18next.t('tab_package');
  document.getElementById('tab_install').innerHTML = i18next.t('tab_install');
  /*
  if(document.getElementById('btn_stop') != null) {
    document.getElementById('btn_stop').value = i18next.t('btn_stop');
  }
  if(document.getElementById('btn_start') != null) {
    document.getElementById('btn_start').value = i18next.t('btn_start');
  }*/
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent_nav();
  updateContent_infor();
});
