module.exports = function(app, fs, url) {


  app.set('views', [
    __dirname + '/index',
    __dirname + '/package/networking',
    __dirname + '/package/wpaconfig',
    __dirname + '/package/dashboard',
    __dirname + '/package/system',
  ]);

}
