var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');

exports.api_get = function(req, res) {

  var hostname = exports.hostname_rec();
  var str_revi = exports.pirevision_rec();
  var struptime = exports.uptime_rec();
  var mem_usedper = exports.mem_used_rec();
  var cpuloadper = exports.cpuload_rec();

  var data__ = {};
  var tmp = {};
  tmp['Hostname'] = hostname;
  tmp['Pi Revision'] = str_revi;
  tmp['Uptime'] = struptime;
  tmp['Memory Used'] = mem_usedper;
  tmp['CPU Load'] = cpuloadper;
  data__['system_Information'] = tmp;
  fs.writeFileSync(__dirname + "/data/" + "systeminfordata.json",
    JSON.stringify(data__, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })

  fs.readFile(__dirname + "/data/" + "systeminfordata.json", 'utf8', function(err, data) {
    var systeminfordata = JSON.parse(data); //json text -> json object
    //console.log(systeminfordata);
    res.send(systeminfordata);
  })
}

exports.hostname_rec = function() {
  const std_hostname = execSync('hostname -f', {
    encoding: 'utf8'
  });
  var hostname = std_hostname.split("\n");
  console.log(hostname);

  return hostname[0];
}

exports.pirevision_rec = function() {
  const cpuinfo = execSync('cat /proc/cpuinfo', {
    encoding: 'utf8'
  });
  var tmp1 = cpuinfo.split("\n");
  var revision;
  for (var a = 0; a < tmp1.length; a++) {
    if (tmp1[a].indexOf("Revision") >= 0) {
      revision = tmp1[a].split(": ");
      break;
    }
  }
  console.log("revision = " + revision[1]);
  var str_revi = "";
  var data = fs.readFileSync(__dirname + "/data/" + "rivisions.json", 'utf8');
  var revisionsdata = JSON.parse(data); //json text -> json object
  var revision_key = Object.getOwnPropertyNames(revisionsdata);
  for (var a = 0; a < Object.keys(revisionsdata).length; a++) {
    //console.log("revision_key = " + revision_key[a]);
    if (revision_key[a] == revision[1]) {
      str_revi = revisionsdata[revision_key[a]];
      console.log("cpuinfo = " + str_revi);
      break;
    }
  }

  return str_revi;
}

exports.uptime_rec = function() {
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

  return struptime;
}

exports.mem_used_rec = function() {
  var strawk1 = "'/Mem:/ { print $2 }'";
  const totalmem = execSync('free -m | awk ' + strawk1, {
    encoding: 'utf8'
  });
  var strawk2 = "'/Mem:/ { print $3 }'";
  const usedmem = execSync('free -m | awk ' + strawk2, {
    encoding: 'utf8'
  });
  var mem_usedper = usedmem / totalmem * 100;

  return String(Math.floor(mem_usedper));
}

exports.cpuload_rec = function() {
  var strawk3 = "'{ print $1 }'";
  const cores = execSync('grep -c ^processor /proc/cpuinfo', {
    encoding: 'utf8'
  });
  const cpuload = execSync('awk ' + strawk3 + ' /proc/loadavg', {
    encoding: 'utf8'
  });
  var cpuloadper = (cpuload * 100) / cores;

  return String(cpuloadper);
}

exports.system_reboot = function(req, res) {
  result = {
    "success": 1
  };
  res.send(result);
  child = exec("sudo /sbin/reboot", function(error, stdout, stderr) {});
}
exports.system_shutdown = function(req, res) {
  result = {
    "success": 2
  };
  res.send(result);
  child = exec("sudo /sbin/shutdown -h now", function(error, stdout, stderr) {});
}

exports.package_data_get = function(req, res) {
  var files = fs.readdirSync(__dirname + '/../');
  console.log(files.length);
  var sidemenus = {};
  for (var i = 0; i < files.length; i++) {
    var dir_name = files[i];
    var data = fs.readFileSync(__dirname + "/../" + dir_name + "/sidename.json", 'utf8');
    var sidemenu = JSON.parse(data);
    console.log(sidemenu['side_name']);
    sidemenus[sidemenu['side_name']] = sidemenu;
  }
  res.send(sidemenus);
}

exports.install_data_get = function(req, res) {
  var files = fs.readdirSync(__dirname + '/../../package_tmp/');
  console.log(files.length);
  var sidemenus = {};
  for (var i = 0; i < files.length; i++) {
    var dir_name = files[i];
    var sidemenu = {};
    var dd = "package _" + String(i + 1);
    sidemenu['pack_name'] = dir_name.replace('.zip', '');
    sidemenus[dd] = sidemenu;
  }
  res.send(sidemenus);
}

exports.uninstall_package = function(req, res, select) {
  console.log(select);
  result = {
    'select': String(select)
  }

  var files = fs.readdirSync(__dirname + '/../');
  for (var i = 0; i < files.length; i++) {
    if (select == i){
      var package_name = files[i];
      execSync('sudo zip ' + __dirname + '/../../package_tmp/' + package_name + '.zip '+ __dirname +'/../' + package_name + '/*', {
        encoding: 'utf8'
      });
      execSync('sudo rm -r ' + __dirname + '/../' + package_name, {
        encoding: 'utf8'
      });
      execSync('sudo sed -i /' + package_name + '/d ' + __dirname + '/../../server.js', {
        encoding: 'utf8'
      });
      break;
    }
  }
  res.send(result);
}

exports.install_package = function(req, res, select) {
  console.log(select);
  result = {
    'select': String(select)
  }

  var install_files = fs.readdirSync(__dirname + '/../../package_tmp/');
  var installed_files = fs.readdirSync(__dirname + '/../');
  for (var i = 0; i < install_files.length; i++) {
    if (select == i){
      var package_name = install_files[i];
      execSync('sudo unzip ' + __dirname + '/../../package_tmp/' + package_name + '.zip -d '+ __dirname +'/../' + package_name, {
        encoding: 'utf8'
      });
      const start_ = execSync('grep -n app.set server.js | cut -d: -f1 | head -1', {
        encoding: 'utf8'
      });
      var line_number = Number(start_) + 2;
      console.log(line_number);
      execSync('sudo cp ' + __dirname + '/install.sh ' + __dirname + '/install.sh.orig', {
        encoding: 'utf8'
      });
      execSync('sed -i "1s/default/' + package_name.replace('.zip', '') + '/" ' + __dirname + '/install.sh', {
        encoding: 'utf8'
      });
      execSync('sed -i "1s%defaultdir%' + __dirname + '%" ' + __dirname + '/install.sh', {
        encoding: 'utf8'
      });
      execSync('sudo sh ' + __dirname + '/install.sh', {
        encoding: 'utf8'
      });
      execSync('sudo cp ' + __dirname + '/install.sh.orig ' + __dirname + '/install.sh', {
        encoding: 'utf8'
      });
      break;
    }
  }
  res.send(result);
}
