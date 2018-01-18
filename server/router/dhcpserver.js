var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  child = exec("cat /var/lib/misc/dnsmasq.leases", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout[11]);

  var arr = [];//줄 단위로 배열 저장(마지막은 빈배열이 들어감.)
  arr = stdout.split("\n");
  for (var i = 0;i < arr.length - 1;i++){//2차원 배열에 data 저장
    arr[i] = arr[i].split(" ");
    console.log('arr ' + i + ' : ' + arr[i]);
    console.log('arr ' + i + '[] : ' + arr[i][0]);
  }

  });

  fs.readFile(__dirname + "/../data/dhcpserver/" + "clientlist.json", 'utf8', function(err, data) {
    var dhcpserverdata = JSON.parse(data); //json text -> json object
    //console.log(dhcpserverdata);
    res.send(dhcpserverdata);
  })
}
exports.api_get_dnsmasq = function (req, res) {
  exports.read_pidof_dnsmasq();

  fs.readFile(__dirname + "/../data/dhcpserver/" + "dnsmasq_dec.json", 'utf8', function(err, data) {
    var dnsmasqdata = JSON.parse(data); //json text -> json object
    //console.log(dhcpserverdata);
    res.send(dnsmasqdata);
  })
}

exports.read_pidof_dnsmasq = function(req, res) {
  child = exec("pidof dnsmasq | wc -l", function(error, stdout, stderr) {
    var data = {};//오브젝트
    if (stdout[0] == 0){
      data['Dnsmasq is'] = false;
    }else if (stdout[0] == 1){
      data['Dnsmasq is'] = true;
    }
    var dnsmasqdata = {};
    dnsmasqdata['alert_select'] = data;

    fs.writeFile(__dirname + "/../data/dhcpserver/" + "dnsmasq_dec.json",
      JSON.stringify(dnsmasqdata, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
      })
  });
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
