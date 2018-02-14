// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "name": "Dashboard",
        "auth_nav": "Auth"

      }
    },
    ko: {
      translation: {
        "name": "대시보드",
        "auth_nav": "암호 변경"
      }
    }
  }
}, function(err, t) {
  // init set content
  updateContent_nav();
});

function updateContent_nav() {
  document.getElementById('name_id').innerHTML = i18next.t('name');
  if (document.getElementById("dashboard_navid") != null) {
    document.getElementById('dashboard_navid').innerHTML = i18next.t('name');
  }
  var contentData = window.document.getElementsByClassName("nav");
  var child_li = contentData[0].getElementsByTagName("li");
  console.log(child_li.length);
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent();
});
