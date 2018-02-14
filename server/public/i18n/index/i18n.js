// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "ipenable": "IP 주소 보이기",
        "macenable": "MAC 주소 보이기",
        "hostnameenable": "장치 이름 보이기",
        "ownerenable": "소유자 보이기"
      }
    },
    ko: {
      translation: {
        "ipenable": "IP Enable",
        "macenable": "MAC Enable",
        "hostnameenable": "Host name Enable",
        "ownerenable": "Owner Enable"
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

i18next.on('languageChanged', () => {
  updateContent_nav();
  updateContent_infor();
});
