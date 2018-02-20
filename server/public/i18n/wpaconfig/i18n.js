// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "conf_client": "Configure client",
        "clientsetting": "Client settings",
        "rescan": "Rescan",
        "note": "Note,",
        "wep_conn_infor": "WEP access points appear as 'Open'. RaspAP does not currently support connecting to WEP.",
        "ssid": "SSID",
        "channel": "Channel",
        "security": "Security",
        "passphrase": "Passphrase"
      }
    },
    ko: {
      translation: {
        "conf_client": "클라이언트 구성",
        "clientsetting": "클라이언트 설정",
        "rescan": "재검색",
        "note": "주의,",
        "wep_conn_infor": "WEP 액세스 포인트는 '열기'로 나타납니다. RaspAP는 현재 WEP 연결을 지원하지 않습니다.",
        "ssid": "SSID",
        "channel": "채널",
        "security": "보안",
        "passphrase": "암호"
      }
    }
  }
}, function(err, t) {
  // init set content
  /*updateContent_nav();
  updateContent_infor();*/
});

function updateContent_nav() {


}

function updateContent_infor() {
  document.getElementById('i18_confclient').innerHTML = i18next.t('conf_client');
  document.getElementById('i18_clientsetting').innerHTML = i18next.t('clientsetting');
  document.getElementById('i18_rescan').value = i18next.t('rescan');
  document.getElementById('i18_note').innerHTML = i18next.t('note');
  document.getElementById('i18_wep_conn_infor').innerHTML = i18next.t('wep_conn_infor');
  document.getElementById('i18_ssid').innerHTML = i18next.t('ssid');
  document.getElementById('i18_channel').innerHTML = i18next.t('channel');
  document.getElementById('i18_security').innerHTML = i18next.t('security');
  document.getElementById('i18_passphrase').innerHTML = i18next.t('passphrase');
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent_infor();
});
