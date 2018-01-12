var fs = require("fs");

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/" + "systeminfordata.json", 'utf8', function(err, data) {
    var systeminfordata = JSON.parse(data); //json text -> json object
    //console.log(systeminfordata);
    res.send(systeminfordata);
  })
}
