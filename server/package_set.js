module.exports = function(app, fs, url, isAuthenticated, passport) {

  require('./index/main.js')(app, fs, url, isAuthenticated, passport);
  require('./package/dashboard/main.js')(app, fs, url);
  require('./package/system/main.js')(app, fs, url);

}
