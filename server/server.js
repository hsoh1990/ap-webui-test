module.exports = function(app, fs, url) {


  app.set('views', [
    __dirname + '/index',
    __dirname + '/package/dhcpserver',
    __dirname + '/package/dashboard',
    __dirname + '/package/system',
  ]);

}
