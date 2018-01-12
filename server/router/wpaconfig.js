var fs = require("fs");

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/" + "wpaconfigdata.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    res.send(wpaconfigdata);
  })
}
