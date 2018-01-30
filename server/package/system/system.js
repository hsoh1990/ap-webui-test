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
  execSync('cd hub_package_data && wget http://39.119.118.152/package', {
    encoding: 'utf8'
  });
  var data = fs.readFileSync(__dirname + "/../../hub_package_data/package", 'utf8');
  fs.unlink(__dirname + "/../../hub_package_data/package", function(err) {
    if (err) throw err;
    console.log('successfully deleted package');
  });
  var files = fs.readdirSync(__dirname + '/../');
  data = JSON.parse(data);
  var install_data_key = Object.getOwnPropertyNames(data);
  var tmp_arr = [];

  for (var j = 0; j < Object.keys(data).length; j++) {
    tmp_arr[j] = data[install_data_key[j]]['pack_name'];
  }

  for (var i = 0; i < files.length; i++) {
    for (var j = 0; j < Object.keys(data).length; j++) {
      if (files[i] == tmp_arr[j]) {
        console.log('-----------------------');
        console.log(data);
        console.log('-----------------------');
        delete data[install_data_key[j]];
      }
    }
  }
  res.send(data);
  //res.send(sidemenus);
}

exports.uninstall_package = function(req, res, select) {
  result = {
    'success': 1
  }
  res.send(result);

  var files = fs.readdirSync(__dirname + '/../');
  for (var i = 0; i < files.length; i++) {
    if (select == i) {
      var package_name = files[i];

      execSync('rm -r package/' + package_name, {
        encoding: 'utf8'
      });
      execSync('sed -i /' + package_name + '/d ./server.js', {
        encoding: 'utf8'
      });
      execSync('sed -i /' + package_name + '/d ./package_set.js', {
        encoding: 'utf8'
      });
      break;
    }
  }
}

exports.install_package = function(req, res, select) {
  result = {
    'success': 3
  }
  res.send(result);

  execSync('cd hub_package_data && wget http://39.119.118.152/package', {
    encoding: 'utf8'
  });
  var data = fs.readFileSync(__dirname + "/../../hub_package_data/package", 'utf8');
  var installed_files = fs.readdirSync(__dirname + '/../');

  data = JSON.parse(data);

  var install_data_key = Object.getOwnPropertyNames(data);

  fs.unlink(__dirname + "/../../hub_package_data/package", function(err) {
    if (err) throw err;
    console.log('successfully deleted package');
  });

  // 같은것은 삭제하는 부분
  var tmp_arr = [];

  for (var j = 0; j < Object.keys(data).length; j++) {
    tmp_arr[j] = data[install_data_key[j]]['pack_name'];
  }

  for (var i = 0; i < installed_files.length; i++) {
    for (var j = 0; j < Object.keys(data).length; j++) {
      if (installed_files[i] == tmp_arr[j]) {
        delete data[install_data_key[j]];
      }
    }
  }

  install_data_key = Object.getOwnPropertyNames(data);
  for (var i = 0; i < Object.keys(data).length; i++) {
    if (select == i) {
      var package_name = data[install_data_key[i]]['pack_name'];

      const download_package = execSync('cd package_tmp/ && wget -O ' + package_name + '.zip http://39.119.118.152/download?name=' + package_name, {
        encoding: 'utf8'
      });
      execSync('sudo unzip ' + __dirname + '/../../package_tmp/' + package_name + '.zip -d ' + __dirname + '/../' + package_name, {
        encoding: 'utf8'
      });
      const start_1 = execSync('grep -n app.set server.js | cut -d: -f1 | head -1', {
        encoding: 'utf8'
      });
      const start_2 = execSync('grep -n index/main package_set.js | cut -d: -f1 | head -1', {
        encoding: 'utf8'
      });
      var line_number1 = Number(start_1) + 1;
      var line_number2 = Number(start_2) + 1;
      var serverjs_data = fs.readFileSync(__dirname + "/../../" + "server.js", 'utf8');
      var packagesetjs_data = fs.readFileSync(__dirname + "/../../" + "package_set.js", 'utf8');

      var data_split1 = serverjs_data.split("\n");
      var data_split2 = packagesetjs_data.split("\n");
      var insert_data1 = "    __dirname + \'/package/" + package_name + "\',";
      var insert_data2 = "  require(\'./package/" + package_name + "/main.js\')(app, fs, url);";
      data_split1.splice(line_number1, 0, insert_data1);
      data_split2.splice(line_number2, 0, insert_data2);

      for (var q = 0; q < data_split1.length; q++) {
        data_split1[q] += "\n";
      }
      var result1 = "";
      for (var q = 0; q < data_split1.length; q++) {
        result1 += data_split1[q];
      }

      for (var q = 0; q < data_split2.length; q++) {
        data_split2[q] += "\n";
      }
      var result2 = "";
      for (var q = 0; q < data_split2.length; q++) {
        result2 += data_split2[q];
      }

      fs.writeFileSync(__dirname + "/../../" + "server.js",
        result1, "utf8",
        function(err, data) {
          result = {
            "success": 1
          };
        })
      fs.writeFileSync(__dirname + "/../../" + "package_set.js",
        result2, "utf8",
        function(err, data) {
          result = {
            "success": 1
          };
        })
      execSync('rm -r package_tmp/' + package_name + '.zip', {
        encoding: 'utf8'
      });

      break;
    }
  }
}
