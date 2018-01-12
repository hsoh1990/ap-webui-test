var fs = require("fs");

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/" + "dashboarddata.json", 'utf8', function(err, data) {
    var dashboarddata = JSON.parse(data); //json text -> json object
    //console.log(dashboarddata);
    res.send(dashboarddata);
  })
}
