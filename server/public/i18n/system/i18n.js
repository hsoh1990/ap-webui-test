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
        "refresh": "Refresh",
        "name": "Name",
        "version": "Version",
        "downloads": "Downloads",
        "install_btn": "Install",
        "uninstall_btn": "Uninstall",
        "logout": "Logout"
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
        "refresh": "새로고침",
        "name": "이름",
        "version": "버전",
        "downloads": "다운로드 수",
        "install_btn": "설치",
        "uninstall_btn": "삭제",
        "logout": "로그아웃"
      }
    }
  }
}, function(err, t) {

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

  document.getElementById('pac_name').innerHTML = i18next.t('name');
  document.getElementById('pac_version').innerHTML = i18next.t('version');
  document.getElementById('pac_downloads').innerHTML = i18next.t('downloads');

  document.getElementById('ins_name').innerHTML = i18next.t('name');
  document.getElementById('ins_version').innerHTML = i18next.t('version');
  document.getElementById('ins_downloads').innerHTML = i18next.t('downloads');

}

function updateContent_uninstallbtn() {
  var contentData = window.document.getElementsByClassName("pac_installed_class");
  var child_tr = contentData[0].getElementsByTagName("tr");
  for (var a = 0; a < child_tr.length; a++) {
    var child_td = child_tr[a].getElementsByTagName("td");
    for (var b = 0; b < child_td.length; b++) {
      if (child_td[b].getElementsByTagName("a").length != 0) {
        var btn__ = child_td[b].getElementsByTagName("a");
        btn__[0].innerHTML = i18next.t('uninstall_btn');
      }
    }
  }
}

function updateContent_installbtn() {
  var contentData = window.document.getElementsByClassName("pac_noinstall_class");
  var child_tr = contentData[0].getElementsByTagName("tr");
  for (var a = 0; a < child_tr.length; a++) {
    var child_td = child_tr[a].getElementsByTagName("td");
    for (var b = 0; b < child_td.length; b++) {
      if (child_td[b].getElementsByTagName("a").length != 0) {
        var btn__ = child_td[b].getElementsByTagName("a");
        btn__[0].innerHTML = i18next.t('install_btn');
      }
    }
  }
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
function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      console.log(this.response);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/i18n_save?lang=" + selectValue);
  xhr.send();
}

i18next.on('languageChanged', () => {
  updateContent_nav();
  updateContent_infor();
  updateContent_uninstallbtn();
  updateContent_installbtn();
});
