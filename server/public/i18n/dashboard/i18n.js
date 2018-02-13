// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    },
    ko: {
      translation: {
        "key": "hello welt"
      }
    }
  }
}, function(err, t) {
  // init set content
  updateContent();
});

function updateContent() {
  document.getElementById('test').innerHTML = i18next.t('key');
}

function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent();
});
