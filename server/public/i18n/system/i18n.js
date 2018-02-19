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
        "cpuload": "CPU Load",
        "reboot": "Reboot",
        "shutdown": "Shutdown",
        "refresh": "Refresh"
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
        "cpuload": "CPU 사용량",
        "reboot": "재시작",
        "shutdown": "종료",
        "refresh": "새로고침"
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
  document.getElementById('system_infor').innerHTML = i18next.t('system_infor');
  document.getElementById('Hostname').innerHTML = i18next.t('hostname');
  document.getElementById('PiRevision').innerHTML = i18next.t('revision');
  document.getElementById('Uptime').innerHTML = i18next.t('uptime');
  document.getElementById('MemoryUsed').innerHTML = i18next.t('memused');
  document.getElementById('CPULoad').innerHTML = i18next.t('cpuload');

  document.getElementById('reboot_id').value = i18next.t('reboot');
  document.getElementById('shutdown_id').value = i18next.t('shutdown');
  document.getElementById('refresh_id').value = i18next.t('refresh');

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
