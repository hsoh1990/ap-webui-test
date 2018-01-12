var fs = require("fs");

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/../data/networking/" + "summary.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    res.send(wpaconfigdata);
  })
}

exports.api_post = function (req, res) {
  req.accepts('application/json');
  // input message handling
  var result = {};
  var adapt_name = req.query.adaptname;
  json = req.body;
  exports.api_post_datasave(req, res, adapt_name, result);
}
exports.api_post_datasave = function (req, res, adapt_name, result) {
  // output message
  fs.readFile(__dirname + "/../data/networking/" + "connecting_lan_data.json", 'utf8', function(err, data) {
    var users = JSON.parse(data);
    // ADD TO DATA
    users[adapt_name] = req.body;

    // SAVE DATA
    fs.writeFile(__dirname + "/../data/networking/" + "connecting_lan_data.json",
      JSON.stringify(users, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
        res.json(result);
      })
  })
}
