module.exports = function(app, fs, url, isAuthenticated) {

  require('./index/main.js')(app, fs, url, isAuthenticated);
  require('./package/dashboard/main.js')(app, fs, url);
  require('./package/system/main.js')(app, fs, url);

}
