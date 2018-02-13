// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "name": "Dashboard",
        "nav_auth": "Auth"

      }
    },
    ko: {
      translation: {
        "name": "대시보드",
        "nav_auth": "암호 변경"
      }
    }
  }
}, function(err, t) {
  // init set content
  updateContent();
});

function updateContent() {
  document.getElementById('name_id').innerHTML = i18next.t('name');
  document.getElementById('nav_authid').innerHTML = i18next.t('nav_auth');
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent();
});
