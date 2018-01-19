var fs = require("fs");
const {
  execSync
} = require('child_process');

exports.api_get = function(req, res) {

  const std_hostname = execSync('hostname -f', {
    encoding: 'utf8'
  });
  var hostname = std_hostname.split("\n");
  console.log(hostname);

  const std_uptime = execSync('cat /proc/uptime', {
    encoding: 'utf8'
  });
  var uptime = std_uptime.split(" ");
  var seconds = Math.round(uptime[0]);
  var minutes = seconds / 60;
  var hours = minutes / 60;
  var days = Math.floor(hours / 24);
  hours = Math.floor(hours - (days / 24));
  minutes = Math.floor(minutes - (days * 24 * 60) - (hours * 60));
  var struptime = "";
  if (days != 0) {
    struptime += days + " days";
  }
  if (hours != 0) {
    struptime += hours + " hours";
  }
  if (minutes != 0) {
    struptime += minutes + " minutes";
  }
  console.log(struptime);

  const std_memfull = execSync('free -m | awk "/Mem:/ {print $2}"', {
    encoding: 'utf8'
  });
  const std_memused = execSync('free -m | awk "/Mem:/ {print $2}"', {
    encoding: 'utf8'
  });
  console.log(std_memfull + ", " + std_memused);
  fs.readFile(__dirname + "/../data/" + "systeminfordata.json", 'utf8', function(err, data) {
    var systeminfordata = JSON.parse(data); //json text -> json object
    //console.log(systeminfordata);
    res.send(systeminfordata);
  })
}
