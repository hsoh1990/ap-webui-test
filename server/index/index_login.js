var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');

exports.sidemenu_get = function(req, res) {
  var files = fs.readdirSync('../package/');
  console.log(files);
}
