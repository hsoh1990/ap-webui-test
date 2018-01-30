module.exports = function(app, fs, url) {

  require('./index/main.js')(app, fs, url);
  require('./package/dashboard/main.js')(app, fs, url);
  require('./package/system/main.js')(app, fs, url);

}
