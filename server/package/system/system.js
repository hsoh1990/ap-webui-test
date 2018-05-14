var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');
const md5File = require('md5-file');

exports.api_get = function() {

  var hostname = exports.hostname_rec();
  var str_revi = exports.pirevision_rec();
  var struptime = exports.uptime_rec();
  var mem_usedper = exports.mem_used_rec();
  var cpuloadper = exports.cpuload_rec();

  exports.system_infor_save(hostname, str_revi, struptime, mem_usedper, cpuloadper);
  var data = fs.readFileSync(__dirname + "/data/" + "systeminfordata.json", 'utf8');
  var systeminfordata = JSON.parse(data); //json text -> json object
  //console.log(systeminfordata);
  return systeminfordata;
}
exports.system_infor_save = function(hostname, str_revi, struptime, mem_usedper, cpuloadper) {
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
    function(err, data) {})

  return data__;
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
  child = exec("sudo /sbin/reboot", function(error, stdout, stderr) {});
  return result;
}
exports.system_shutdown = function(req, res) {
  result = {
    "success": 2
  };
  child = exec("sudo /sbin/shutdown -h now", function(error, stdout, stderr) {});
  return result;
}

exports.package_data_get = function() {
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
  return sidemenus;
}

/**
 * 패키지 관리 사이트에 저장된 모든 패키지 리스트 불러오기
 * @return {[type]} [description]
 */
exports.install_data_get = function() {
  execSync('cd hub_package_data && wget http://39.119.118.242:9010/file', {
    encoding: 'utf8'
  });
  var data = fs.readFileSync(__dirname + "/../../hub_package_data/file", 'utf8');
  console.log("data = " + data);
  fs.unlink(__dirname + "/../../hub_package_data/file", function(err) {
    if (err) throw err;
    console.log('임시 패키지 전체 목록 파일 삭제 완료');
  });
  var files = fs.readdirSync(__dirname + '/../');
  var sidemenus = {};
  for(var a = 0;a < data.length; a++) {
    let dd = "package _" + String(a + 1);
    let sidemenu = {};
    if (data[a].indexOf(".zip") != -1) {
      sidemenu['pack_name'] = data[a].replace('.zip', '');
      sidemenus[dd] = sidemenu;
    }
  }
  data = sidemenus;
  console.log(data);
  var install_data_key = Object.getOwnPropertyNames(data);
  var tmp_arr = [];

  for (var j = 0; j < Object.keys(data).length; j++) {
    tmp_arr[j] = data[install_data_key[j]]['pack_name'];
  }

  for (var i = 0; i < files.length; i++) {
    for (var j = 0; j < tmp_arr.length; j++) {
      if (files[i] == tmp_arr[j]) {
        for (var k = 0; k < Object.keys(data).length; k++) {
          if (data[install_data_key[k]]['pack_name'] == tmp_arr[j]) {
            delete data[install_data_key[k]];
            install_data_key.splice(k, 1);
            break;
          }
        }
      }
    }
  }
  return data;
}

exports.uninstall_package = function(select) {
  var files = fs.readdirSync(__dirname + '/../');
  for (var i = 0; i < files.length; i++) {
    if (select == i) {
      var package_name = files[i];

      execSync('rm -r package/' + package_name, {
        encoding: 'utf8'
      });
      execSync('rm -r public/i18n/' + package_name, {
        encoding: 'utf8'
      });
      execSync('sed -i /' + package_name + '/d ./server.js', {
        encoding: 'utf8'
      });
      execSync('sed -i /' + package_name + '/d ./package_set.js', {
        encoding: 'utf8'
      });
      execSync('sed -i /' + package_name + '/d ./app.js', {
        encoding: 'utf8'
      });
      break;
    }
  }
}

exports.find_installed_data = function() {
  execSync('cd hub_package_data && wget http://39.119.118.242:3000/file', {
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
    for (var j = 0; j < tmp_arr.length; j++) {
      if (installed_files[i] == tmp_arr[j]) {
        for (var k = 0; k < Object.keys(data).length; k++) {
          if (data[install_data_key[k]]['pack_name'] == tmp_arr[j]) {
            delete data[install_data_key[k]];
            install_data_key.splice(k, 1);
            break;
          }
        }
      }
    }
  }

  return data;
}

/**
 * 해시값 체크하는 부분
 * @param  {[type]} select [description]
 * @return {[type]}        [description]
 */
exports.hash_check = function(select) {
  var data = exports.find_installed_data();
  install_data_key = Object.getOwnPropertyNames(data);

  for (var i = 0; i < Object.keys(data).length; i++) {
    if (select == i) {
      var package_name = data[install_data_key[i]]['pack_name'];
      const download_package = execSync('cd package_tmp/ && wget -O ' + package_name + '.zip http://39.119.118.152:3000/api/download?name=' + package_name, {
        encoding: 'utf8'
      });
      const download_hash = execSync('cd package_tmp/ && wget -O ' + package_name + '.md5 http://39.119.118.152:3000/api/hash?name=' + package_name, {
        encoding: 'utf8'
      });

      const hash_make = md5File.sync(__dirname + '/../../package_tmp/' + package_name + '.zip');
      var hash_installed = fs.readFileSync(__dirname + "/../../package_tmp/" + package_name + '.md5', 'utf8');
      console.log("installed md5 hash : " + hash_installed);
      console.log("download zip hash : " + hash_make);

      if (hash_make == hash_installed) {
        console.log("해시값이 같습니다.");
        result = {
          'success': 1,
          'package_name': package_name
        }
        return result;
      } else if (hash_make != hash_installed) {
        console.log("해시값이 다릅니다.");
        result = {
          'success': 0
        }
        execSync('rm -r package_tmp/' + package_name + '.zip', {
          encoding: 'utf8'
        });
        execSync('rm -r package_tmp/' + package_name + '.md5', {
          encoding: 'utf8'
        });
        return result;
      }
    }
  }
}
exports.install_package = function(result) {
  var package_name = result['package_name'];
  execSync('sudo unzip ' + __dirname + '/../../package_tmp/' + package_name + '.zip -d ' + __dirname + '/../' + package_name, {
    encoding: 'utf8'
  });
  execSync('cd public/i18n && mkdir ' + package_name, {
    encoding: 'utf8'
  });
  execSync('mv package/' + package_name + '/i18n.js public/i18n/' + package_name, {
    encoding: 'utf8'
  });

  const start_1 = execSync('grep -n app.set server.js | cut -d: -f1 | head -1', {
    encoding: 'utf8'
  });
  const start_2 = execSync('grep -n index/main package_set.js | cut -d: -f1 | head -1', {
    encoding: 'utf8'
  });
  const start_3 = execSync('grep -n /system/js app.js | cut -d: -f1 | head -1', {
    encoding: 'utf8'
  });
  var line_number1 = Number(start_1) + 1;
  var line_number2 = Number(start_2) + 1;
  var line_number3 = Number(start_3) + 1;
  var serverjs_data = fs.readFileSync(__dirname + "/../../" + "server.js", 'utf8');
  var packagesetjs_data = fs.readFileSync(__dirname + "/../../" + "package_set.js", 'utf8');
  var appjs_data = fs.readFileSync(__dirname + "/../../" + "app.js", 'utf8');

  var data_split1 = serverjs_data.split("\n");
  var data_split2 = packagesetjs_data.split("\n");
  var data_split3 = appjs_data.split("\n");
  var insert_data1 = "    __dirname + \'/package/" + package_name + "\',";
  var insert_data2 = "  require(\'./package/" + package_name + "/main.js\')(app, fs, url, isAuthenticated, passport);";
  var insert_data3 = "app.use(\'/js\', express.static(__dirname + \"/package/" + package_name + "/js\"));";
  data_split1.splice(line_number1, 0, insert_data1);
  data_split2.splice(line_number2, 0, insert_data2);
  data_split3.splice(line_number3, 0, insert_data3);

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
  for (var q = 0; q < data_split3.length; q++) {
    data_split3[q] += "\n";
  }
  var result3 = "";
  for (var q = 0; q < data_split3.length; q++) {
    result3 += data_split3[q];
  }

  execSync('rm -r package_tmp/' + package_name + '.zip', {
    encoding: 'utf8'
  });
  execSync('rm -r package_tmp/' + package_name + '.md5', {
    encoding: 'utf8'
  });

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
  fs.writeFileSync(__dirname + "/../../" + "app.js",
    result3, "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })

  return package_name;
}

exports.i18n_load = function() {
  var data = JSON.parse(fs.readFileSync(__dirname + "/../../public/i18n/config.js", 'utf8'));
  console.log(data);
  return data;
}
exports.i18n_save = function(language) {
  var lang_json = {};
  lang_json.language = language;
  fs.writeFileSync(__dirname + "/../../public/i18n/config.js",
    JSON.stringify(lang_json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
  return language;
}
