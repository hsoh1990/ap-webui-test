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
        "enable_logging": "Enable Logging",
        "log_notenable": "Logfile output not enabled",
        "country_code": "Country Code",
        "hostapd_infor_prov": "Information provided by hostapd",
        "hostapd_dec_run": "HostAPD is running",
        "hostapd_dec_stop": "HostAPD is not running",
        "basic_savesetbtn": "Save settings",
        "basic_hotspotstop": "Stop hotspot",
        "basic_hotspotstart": "Start hotspot",
        "security_savesetbtn": "Save settings",
        "security_hotspotstop": "Stop hotspot",
        "security_hotspotstart": "Start hotspot",
        "advanced_savesetbtn": "Save settings",
        "advanced_hotspotstop": "Stop hotspot",
        "advanced_hotspotstart": "Start hotspot"
      }
    },
    ko: {
      translation: {
        "conf_hotspot": "Hotspot 설정",
        "basic_tab": "기본",
        "security_tab": "보안",
        "advanced_tab": "고급",
        "logfileoutput_tab": "로그 파일 출력",
        "basic_setting": "기본 설정",
        "interface": "인터페이스 목록",
        "wireless_mode": "무선 모드",
        "channel": "채널",
        "security_setting": "보안 설정",
        "secu_type": "보안 유형",
        "enc_type": "암호화 유형",
        "psk": "비밀번호",
        "logfile_output": "로그 파일 출력",
        "advanced_setting": "고급 설정",
        "enable_logging": "로그 출력 사용 설정",
        "log_notenable": "로그 파일 출력이 활성화되지 않았습니다.",
        "country_code": "국가 코드",
        "hostapd_infor_prov": "Hostapd에서 제공한 정보입니다.",
        "hostapd_dec_run": "HostAPD가 실행중 입니다.",
        "hostapd_dec_stop": "HostAPD가 정지되었습니다.",
        "basic_savesetbtn": "설정 저장",
        "basic_hotspotstop": "Hotspot 종료",
        "basic_hotspotstart": "Hotspot 시작",
        "security_savesetbtn": "설정 저장",
        "security_hotspotstop": "Hotspot 종료",
        "security_hotspotstart": "Hotspot 시작",
        "advanced_savesetbtn": "설정 저장",
        "advanced_hotspotstop": "Hotspot 종료",
        "advanced_hotspotstart": "Hotspot 시작"
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
  document.getElementById('i18_confhotspot').innerHTML = i18next.t('conf_hotspot');
  document.getElementById('i18_basictab').innerHTML = i18next.t('basic_tab');
  document.getElementById('i18_securitytab').innerHTML = i18next.t('security_tab');
  document.getElementById('i18_advancedtab').innerHTML = i18next.t('advanced_tab');
  document.getElementById('i18_logfileputouttab').innerHTML = i18next.t('logfileoutput_tab');
  document.getElementById('i18_basic_setting').innerHTML = i18next.t('basic_setting');
  document.getElementById('i18_interface').innerHTML = i18next.t('interface');
  document.getElementById('i18_wireless_mode').innerHTML = i18next.t('wireless_mode');
  document.getElementById('i18_channel').innerHTML = i18next.t('channel');
  document.getElementById('i18_security_setting').innerHTML = i18next.t('security_setting');
  document.getElementById('i18_secu_type').innerHTML = i18next.t('secu_type');
  document.getElementById('i18_enc_type').innerHTML = i18next.t('enc_type');
  document.getElementById('i18_psk').innerHTML = i18next.t('psk');
  document.getElementById('i18_advanced_setting').innerHTML = i18next.t('advanced_setting');
  document.getElementById('i18_logfile_output').innerHTML = i18next.t('logfile_output');
  document.getElementById('i18_enable_logging').innerHTML = i18next.t('enable_logging');
  document.getElementById('i18_country_code').innerHTML = i18next.t('country_code');
  document.getElementById('i18_hostapd_infor_prov').innerHTML = i18next.t('hostapd_infor_prov');
}
function updateContent_not_logenable(){
  if(document.getElementById('i18_log_notenable') != null) {
    document.getElementById('i18_log_notenable').innerHTML = i18next.t('log_notenable');
  }
}
function updateContent_hostapd_startstop(){
  if(document.getElementById('i18_hostapd_dec_run') != null) {
    document.getElementById('i18_hostapd_dec_run').innerHTML = i18next.t('hostapd_dec_run');
  }
  if(document.getElementById('i18_hostapd_dec_stop') != null) {
    document.getElementById('i18_hostapd_dec_stop').innerHTML = i18next.t('hostapd_dec_stop');
  }
}
function updateContent_basic_btn(){
  document.getElementById('i18_basic_savesetbtn').value = i18next.t('basic_savesetbtn');
  if(document.getElementById('i18_basic_hotspotstop') != null) {
    document.getElementById('i18_basic_hotspotstop').value = i18next.t('basic_hotspotstop');
  }
  if(document.getElementById('i18_basic_hotspotstart') != null) {
    document.getElementById('i18_basic_hotspotstart').value = i18next.t('basic_hotspotstart');
  }
}
function updateContent_security_btn(){
  document.getElementById('i18_security_savesetbtn').value = i18next.t('security_savesetbtn');
  if(document.getElementById('i18_security_hotspotstop') != null) {
    document.getElementById('i18_security_hotspotstop').value = i18next.t('security_hotspotstop');
  }
  if(document.getElementById('i18_security_hotspotstart') != null) {
    document.getElementById('i18_security_hotspotstart').value = i18next.t('security_hotspotstart');
  }
}
function updateContent_advanced_btn(){
  document.getElementById('i18_advanced_savesetbtn').value = i18next.t('advanced_savesetbtn');
  if(document.getElementById('i18_advanced_hotspotstop') != null) {
    document.getElementById('i18_advanced_hotspotstop').value = i18next.t('advanced_hotspotstop');
  }
  if(document.getElementById('i18_advanced_hotspotstart') != null) {
    document.getElementById('i18_advanced_hotspotstart').value = i18next.t('advanced_hotspotstart');
  }
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent_infor();
  updateContent_hostapd_startstop();
  updateContent_basic_btn();
  updateContent_security_btn();
  updateContent_advanced_btn();
  updateContent_not_logenable();
});
