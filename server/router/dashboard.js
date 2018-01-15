var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/" + "dashboarddata.json", 'utf8', function(err, data) {
    var dashboarddata = JSON.parse(data); //json text -> json object
    var execresult;
//console.log(dashboarddata);
    child = exec("ip a s eth0", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    stdout = stdout.replace(/\s\s+/,' ');
    console.log('replace: ' + stdout);
    var mac = stdout.match(/link\/ether ([0-9a-f:]+)/i);
    console.log('mac: ' + mac[1]);
    var ip = stdout.match(/inet ([0-9.]+)/i);
    console.log('ip: ' + ip[1]);
    var numReturn = stdout.indexOf("UP");
    console.log('indexOf: ' + numReturn);
    console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    res.send(dashboarddata);
  })
}
