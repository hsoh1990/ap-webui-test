var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/dhcpserver/" + "clientlist.json", 'utf8', function(err, data) {
    var dhcpserverdata = JSON.parse(data); //json text -> json object
    //console.log(dhcpserverdata);
    child = exec("cat /var/lib/misc/dnsmasq.leases", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout[10]);
    var arr = [];
    arr = stdout.split("\n");
    console.log('arr: ' + arr[0]);
    /*for (var i = 0;i < stdout.length;i++){
      arr = arr.push(stdout[i]);
    }
    var result = [];
    for (var i = 0;i < arr.length;i++){
      result = arr[i].split(" ");
      console.log('stdout: ');
      for (var j = 0;j < result.length;j++){
        console.log(result[j]);
      }
    }*/

    //var arr = stdout.split(" ");
    //console.log('stdout: ' + arr[0] + ', ' + arr[1]);
    });
    res.send(dhcpserverdata);
  })
}

exports.api_post = function (req, res) {
  req.accepts('application/json');
  // input message handling
  json = req.body;

  // output message
  fs.writeFile(__dirname + "/../data/dhcpserver/" + "serversetting.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
      res.json(result);
    })
}
