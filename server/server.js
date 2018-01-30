module.exports = function(app, fs, url) {


  app.set('views', [
    __dirname + '/index',
    __dirname + '/package/dashboard',
    __dirname + '/package/system',
  ]);


  require('./index/main.js')(app, fs, url);
  require('./package/dashboard/main.js')(app, fs, url);
  require('./package/system/main.js')(app, fs, url);

}
