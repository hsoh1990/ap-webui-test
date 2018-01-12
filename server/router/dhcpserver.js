var fs = require("fs");

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/dhcpserver/" + "clientlist.json", 'utf8', function(err, data) {
    var dhcpserverdata = JSON.parse(data); //json text -> json object
    //console.log(dhcpserverdata);
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
