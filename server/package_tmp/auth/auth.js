var fs = require("fs");

exports.api_get = function(req, res) {
  fs.readFile(__dirname + "/../../userdata/" + "userdata.json", 'utf8', function(err, data) {
    var userdata = JSON.parse(data); //json text -> json object
    console.log(userdata);
    res.send(userdata);
  })
}

exports.api_post = function(req, res) {
  req.accepts('application/json');
  // input message handling
  var result = {};
  var user_name = req.query.id;
  json = req.body;
  console.log(user_name);
  console.log('--------------------------------------');
  console.log('changed password : ' + json.password);
  exports.api_post_datasave(req, res, user_name, result);
}

exports.api_post_datasave = function(req, res, user_name, result) {

  fs.readFile(__dirname + "/../../userdata/" + "userdata.json", 'utf8', function(err, data) {
    var users = JSON.parse(data);

    // ADD TO DATA
    users[user_name] = req.body;

    // SAVE DATA
    fs.writeFile(__dirname + "/../../userdata/" + "userdata.json",
      JSON.stringify(users, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
        res.json(result);
        req.session.destroy(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("session is destroy");
          }
        })
      })

  })
}
