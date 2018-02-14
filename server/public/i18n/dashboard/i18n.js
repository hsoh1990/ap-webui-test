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
        "trans_packet": "Transferred Bytes",
        "wireless_infor": "Wireless Information",
        "conn_to": "Connected To",
        "ap_mac_add": "AP Mac Address",
        "bitrate": "Bitrate",
        "signal_level": "Signal Level",
        "trans_power": "Transmit Power",
        "frequency": "Frequency",
        "link_quality": "Link Quality"
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
        "trans_packet": "전송된 바이트 수",
        "wireless_infor": "무선 정보",
        "conn_to": "연결 대상",
        "ap_mac_add": "AP Mac 주소",
        "bitrate": "전송률",
        "signal_level": "신호 레벨",
        "trans_power": "송신 전력",
        "frequency": "회수",
        "link_quality": "링크 품질"
      }
    }
  }
}, function(err, t) {
  // init set content
  updateContent_nav();
});

function updateContent_nav() {
  document.getElementById('name_id').innerHTML = i18next.t('name');

/*
  var contentData = window.document.getElementsByClassName("nav");
  var child_li = contentData[0].getElementsByTagName("li");
  for(var a = 0;a< child_li.length; a++) {
    var child_a = child_li[a].getElementsByTagName("a");
    child_a[0].innerHTML = i18next.t('name');
  }*/
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent_nav();
});
