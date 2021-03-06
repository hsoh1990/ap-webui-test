// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "name": "Dashboard",
        "bottom_expla": "Information provided by ifconfig and iwconfig",
        "interface_up": "Interface is up",
        "interface_down": "Interface is down",
        "interface_infor": "Interface Information",
        "interface_name": "Interface Name",
        "ip": "IP Address",
        "sub_mask": "Subnet Mask",
        "mac": "Mac Address",
        "interface_statistics": "Interface Statistics",
        "receive_packet": "Received Packets",
        "receive_bytes": "Received Bytes",
        "trans_packet": "Transferred Packets",
        "trans_bytes": "Transferred Bytes",
        "wireless_infor": "Wireless Information",
        "conn_to": "Connected To",
        "ap_mac_add": "AP Mac Address",
        "bitrate": "Bitrate",
        "signal_level": "Signal Level",
        "trans_power": "Transmit Power",
        "frequency": "Frequency",
        "link_quality": "Link Quality",
        "btn_stop": "Stop wlan0",
        "btn_start": "Start wlan0",
        "refresh": "Refresh",
        "logout": "Logout"
      }
    },
    ko: {
      translation: {
        "name": "대시보드",
        "bottom_expla": "ifconfig 및 iwconfig에서 제공하는 정보입니다.",
        "interface_up": "인터페이스가 작동중입니다.",
        "interface_down": "인터페이스가 멈췄습니다.",
        "interface_infor": "인터페이스 정보",
        "interface_name": "인터페이스 이름",
        "ip": "IP 주소",
        "sub_mask": "서브넷 마스크",
        "mac": "Mac 주소",
        "interface_statistics": "인터페이스 통계",
        "receive_packet": "수신된 패킷",
        "receive_bytes": "수신된 바이트 수",
        "trans_packet": "전송된 패킷",
        "trans_bytes": "전송된 바이트 수",
        "wireless_infor": "무선 정보",
        "conn_to": "연결 대상",
        "ap_mac_add": "AP Mac 주소",
        "bitrate": "전송률",
        "signal_level": "신호 레벨",
        "trans_power": "송신 전력",
        "frequency": "회수",
        "link_quality": "링크 품질",
        "btn_stop": "wlan0 정지",
        "btn_start": "wlan0 시작",
        "refresh": "새로고침",
        "logout": "로그아웃"
      }
    }
  }
}, function(err, t) {

});

function updateContent_nav() {

}
function updateContent_infor() {
  document.getElementById('name_id').innerHTML = i18next.t('name');
  if(document.getElementById('interface_up') != null) {
    document.getElementById('interface_up').innerHTML = i18next.t('interface_up');
  }
  if(document.getElementById('interface_down') != null) {
    document.getElementById('interface_down').innerHTML = i18next.t('interface_down');
  }
  document.getElementById('interface_infor').innerHTML = i18next.t('interface_infor');
  document.getElementById('InterfaceName').innerHTML = i18next.t('interface_name');
  document.getElementById('IPAddress').innerHTML = i18next.t('ip');
  document.getElementById('SubnetMask').innerHTML = i18next.t('sub_mask');
  document.getElementById('MacAddress').innerHTML = i18next.t('mac');

  document.getElementById('interface_statis').innerHTML = i18next.t('interface_statistics');
  document.getElementById('ReceivedPackets').innerHTML = i18next.t('receive_packet');
  document.getElementById('ReceivedBytes').innerHTML = i18next.t('receive_bytes');
  document.getElementById('TransferredPackets').innerHTML = i18next.t('trans_packet');
  document.getElementById('TransferredBytes').innerHTML = i18next.t('trans_bytes');

  document.getElementById('wireless_infor').innerHTML = i18next.t('wireless_infor');
  document.getElementById('ConnectedTo').innerHTML = i18next.t('conn_to');
  document.getElementById('APMacAddress').innerHTML = i18next.t('ap_mac_add');
  document.getElementById('Bitrate').innerHTML = i18next.t('bitrate');
  document.getElementById('SignalLevel').innerHTML = i18next.t('signal_level');
  document.getElementById('TransmitPower').innerHTML = i18next.t('trans_power');
  document.getElementById('Frequency').innerHTML = i18next.t('frequency');
  document.getElementById('LinkQuality').innerHTML = i18next.t('link_quality');
  document.getElementById('logout').innerHTML = i18next.t('logout');

  if(document.getElementById('btn_stop') != null) {
    document.getElementById('btn_stop').value = i18next.t('btn_stop');
  }
  if(document.getElementById('btn_start') != null) {
    document.getElementById('btn_start').value = i18next.t('btn_start');
  }
  document.getElementById('refreshbuttonid').value = i18next.t('refresh');
  document.getElementById('dashboard_bottom').innerHTML = i18next.t('bottom_expla');
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
