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
    struptime += days + " days ";
  }
  if (hours != 0) {
    struptime += hours + " hours ";
  }
  if (minutes != 0) {
    struptime += minutes + " minutes ";
  }
  console.log(struptime);


  var strawk1 = "'/Mem:/ { print $2 }'";
  const totalmem = execSync('free -m | awk ' + strawk1, {
    encoding: 'utf8'
  });
  var strawk2 = "'/Mem:/ { print $3 }'";
  const usedmem = execSync('free -m | awk ' + strawk2, {
    encoding: 'utf8'
  });
  const cpuinfo = execSync('cat /proc/cpuinfo', {
    encoding: 'utf8'
  });
  var mem_usedper = usedmem / totalmem * 100;


  var tmp1 = cpuinfo.split("\n");
  var revision;
  console.log(tmp1);
  for (var a = 0; a < tmp1.length; a++) {
    if (tmp1[a].indexOf("Revision") >= 0) {
      revision = tmp1[a].split(": ");
      break;
    }
  }
  console.log("revision = " + revision[1]);
  var str_revi;
  fs.readFile(__dirname + "/../data/" + "rivisions.json", 'utf8', function(err, data) {
    var revisionsdata = JSON.parse(data); //json text -> json object
    var revision_key = Object.getOwnPropertyNames(revisionsdata);
    for (var a = 0; a < Object.keys(revisionsdata).length; a++) {
      console.log("revision_key = " + revision_key[a]);
      if (revision_key[a] == revision[1]) {
        str_revi = revisionsdata[revision_key[a]];
        console.log("cpuinfo = " + str_revi);
        break;
      }
    }
  })

  var strawk3 = "'{ print $1 }'";
  const cpuload = execSync('awk ' + strawk3 + ' /proc/loadavg', {
    encoding: 'utf8'
  });
  var cpuloadper = cpuload * 100;

  //file에 저장 하는 부분
  var data__ = {};
  var tmp = {};
  tmp['Hostname'] = hostname[1];
  tmp['Pi Revision'] = str_revi;
  tmp['Uptime'] = struptime;
  tmp['Memory Used'] = String(mem_usedper);
  tmp['CPU Load'] = String(cpuloadper);
  fs.writeFileSync(__dirname + "/../data/" + "systeminfordata.json",
    JSON.stringify(data__, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })

  fs.readFile(__dirname + "/../data/" + "systeminfordata.json", 'utf8', function(err, data) {
    var systeminfordata = JSON.parse(data); //json text -> json object
    //console.log(systeminfordata);
    res.send(systeminfordata);
  })
}
