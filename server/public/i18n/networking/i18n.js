// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "conf_networking": "Configure Networking",
        "summary_tab": "Summary",
        "eth0_tab": "eth0",
        "wlan0_tab": "wlan0",
        "cursetting": "Current Settings",
        "eth0": "eth0",
        "wlan0": "wlan0",
        "refresh": "Refresh",

        "adapt_ip_setting": "Adapter IP Address Settings",
        "dhcp": "DHCP",
        "ststic_ip": "Static IP",
        "enable_fallback": "Enable Fallback to Static Option",
        "enabled": "Enabled",
        "disabled": "Disabled",
        "static_ip_option": "Static IP Options",
        "ip": "IP Address",
        "subnetmask": "Subnet Mask",
        "default_gateway": "Default Gateway",
        "dns_server": "DNS Server",
        "alternate_dns": "Alternate DNS Server",
        "savesetbtn": "Save settings",
        "apply_setting": "Apply Settings",
        "net_infor_prov": "Information provided by /sys/class/net"
      }
    },
    ko: {
      translation: {
        "conf_networking": "네트워킹 구성",
        "summary_tab": "개요",
        "eth0_tab": "eth0",
        "wlan0_tab": "wlan0",
        "cursetting": "현재 설정",
        "eth0": "eth0",
        "wlan0": "wlan0",
        "refresh": "새로고침",

        "adapt_ip_setting": "어댑터 IP 주소 설정",
        "dhcp": "DHCP",
        "ststic_ip": "고정 IP",
        "enable_fallback": "정적 옵션으로 대체 사용",
        "enabled": "사용",
        "disabled": "비사용",
        "static_ip_option": "정적 IP 설정",
        "ip": "IP 주소",
        "subnetmask": "서브넷 마스크",
        "default_gateway": "기본 게이트웨이",
        "dns_server": "DNS 서버",
        "alternate_dns": "대체 DNS 서버",
        "savesetbtn": "설정 저장",
        "apply_setting": "설정 적용",
        "net_infor_prov": "/sys/class/net에서 제공하는 정보입니다."
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
  document.getElementById('i18_confnetworking').innerHTML = i18next.t('conf_networking');
  document.getElementById('i18_summarytab').innerHTML = i18next.t('summary_tab');
  document.getElementById('i18_eth0tab').innerHTML = i18next.t('eth0_tab');
  document.getElementById('i18_wlan0tab').innerHTML = i18next.t('wlan0_tab');
  document.getElementById('i18_cursetting').innerHTML = i18next.t('cursetting');
  document.getElementById('i18_eth0').innerHTML = i18next.t('eth0');
  document.getElementById('i18_wlan0').innerHTML = i18next.t('wlan0');
  document.getElementById('i18_refresh').value = i18next.t('refresh');

  document.getElementById('i18_net_infor_prov').innerHTML = i18next.t('net_infor_prov');
}
function updateContent_eth0() {
  document.getElementById('i18_eth0adapt_ip_setting').innerHTML = i18next.t('adapt_ip_setting');
  document.getElementById('i18_eth0dhcp').innerHTML = i18next.t('dhcp');
  document.getElementById('i18_eth0ststic_ip').innerHTML = i18next.t('ststic_ip');
  document.getElementById('i18_eth0enable_fallback').innerHTML = i18next.t('enable_fallback');
  document.getElementById('i18_eth0enabled').innerHTML = i18next.t('enabled');
  document.getElementById('i18_eth0disabled').innerHTML = i18next.t('disabled');
  document.getElementById('i18_eth0static_ip_option').innerHTML = i18next.t('static_ip_option');
  document.getElementById('i18_eth0ip').innerHTML = i18next.t('ip');
  document.getElementById('i18_eth0subnetmask').innerHTML = i18next.t('subnetmask');
  document.getElementById('i18_eth0default_gateway').innerHTML = i18next.t('default_gateway');
  document.getElementById('i18_eth0dns_server').innerHTML = i18next.t('dns_server');
  document.getElementById('i18_eth0alternate_dns').innerHTML = i18next.t('alternate_dns');
  document.getElementById('i18_eth0savesetbtn').value = i18next.t('savesetbtn');
  document.getElementById('i18_eth0apply_setting').innerHTML = i18next.t('apply_setting');
}

function updateContent_wlan0() {
  document.getElementById('i18_wlan0adapt_ip_setting').innerHTML = i18next.t('adapt_ip_setting');
  document.getElementById('i18_wlan0dhcp').innerHTML = i18next.t('dhcp');
  document.getElementById('i18_wlan0ststic_ip').innerHTML = i18next.t('ststic_ip');
  document.getElementById('i18_wlan0enable_fallback').innerHTML = i18next.t('enable_fallback');
  document.getElementById('i18_wlan0enabled').innerHTML = i18next.t('enabled');
  document.getElementById('i18_wlan0disabled').innerHTML = i18next.t('disabled');
  document.getElementById('i18_wlan0static_ip_option').innerHTML = i18next.t('static_ip_option');
  document.getElementById('i18_wlan0ip').innerHTML = i18next.t('ip');
  document.getElementById('i18_wlan0subnetmask').innerHTML = i18next.t('subnetmask');
  document.getElementById('i18_wlan0default_gateway').innerHTML = i18next.t('default_gateway');
  document.getElementById('i18_wlan0dns_server').innerHTML = i18next.t('dns_server');
  document.getElementById('i18_wlan0alternate_dns').innerHTML = i18next.t('alternate_dns');
  document.getElementById('i18_wlan0savesetbtn').value = i18next.t('savesetbtn');
  document.getElementById('i18_wlan0apply_setting').innerHTML = i18next.t('apply_setting');
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent_infor();
  updateContent_eth0();
  updateContent_wlan0();
});
