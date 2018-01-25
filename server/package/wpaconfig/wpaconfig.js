var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/data/" + "wpaconfigdata.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    child = exec("sudo cat /etc/wpa_supplicant/wpa_supplicant.conf", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    var mac = stdout.match(/network\s*=/);
    console.log('result: ' + mac);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    res.send(wpaconfigdata);
  })
}
