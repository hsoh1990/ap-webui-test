var stageWidth = 1000;
var stageHeight = 550;

/**
 * stage 정의
 * @type {Konva}
 */
var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: stageWidth,
  height: stageHeight,
  scaleX: 0.57,
  scaleY: 0.57,
  offsetX: -400,
  offsetY: -150,
  draggable: true
});

var Aplayer = new Konva.Layer();
var disconnect_device_Layer = new Konva.Layer();
var disconnect_line_Layer = new Konva.Layer();
var disconnect_text_Layer = new Konva.Layer();
var wlan_line_Layer = new Konva.Layer();
var wlan_text_Layer = new Konva.Layer();
var wlan_device_Layer = new Konva.Layer();
var wlanlayer = new Konva.Layer();

var connect_radius = 380;
var disconnect_radius = 550;

const blue_svgpath = '/svg/button-blue_benji_park_01.svg';
const red_svgpath = '/svg/button-red_benji_park_01.svg';
const ap_svgpath = '/svg/No_Hope_Wireless_Access_Point_clip_art.svg';

/**
 * 해당 layer를 삭제
 * @return {[type]} [description]
 */
function removeShape() {
  Aplayer.destroyChildren();
  stage.add(Aplayer);
}


function addAp(enable__, ap_data) {
  var imageObj = new Image();
  imageObj.src = ap_svgpath;
  var ap = new Konva.Image({
    x: stage.getWidth() / 2 - 35,
    y: stage.getHeight() / 2 - 55,
    image: imageObj,
    width: 70,
    height: 85
  });
  imageObj.onload = function() {
    Aplayer.add(ap);
    stage.add(Aplayer);
  }

  var ap_text = "";
  if (enable__['ip'] == 1) {
    ap_text += ap_data['IP Address'] + "\n";
  }
  if (enable__['mac'] == 1) {
    ap_text += ap_data['MAC Address'] + "\n";
  }
  if (enable__['hostname'] == 1) {
    ap_text += ap_data['SSID'];
  }

  var aptext = new Konva.Text({
    x: stage.getWidth() / 2 - 90 - ap.getWidth(),
    y: stage.getHeight() / 2 - 30 + 60,
    text: ap_text,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 320,
    padding: 20,
    align: 'center'
  });
  var aptextbox = new Konva.Rect({
    x: stage.getWidth() / 2 - 75,
    y: stage.getHeight() / 2 + 40,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 150,
    height: aptext.getHeight() - 20,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    cornerRadius: 10
  });

  var Line_Rect_position_x = stage.getWidth() / 2 - 40;
  var Line_Rect_position_y = stage.getHeight() / 2 - 30;


  ap.on('mouseenter', function() {
    stage.container().style.cursor = 'pointer';
  });

  ap.on('mouseleave', function() {
    stage.container().style.cursor = 'default';
  });

  var owner_text = new Konva.Text({
    x: stage.getWidth() / 2 - 90 - ap.getWidth(),
    y: stage.getHeight() / 2 - 100,
    text: ap_data['owner'],
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 320,
    padding: 20,
    align: 'center'
  });
  Aplayer.add(aptextbox);
  Aplayer.add(aptext);
  stage.add(Aplayer);
}


function wlan_draw(enable__, wlan_data) {

  var wlan_x = stage.getWidth() / 2 - 40 - 300;
  var wlan_y = stage.getHeight() / 2 - 15;

  var wlan_box = new Konva.Rect({
    x: wlan_x,
    y: wlan_y,
    width: 40,
    height: 30,
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 3
  });

  var wlan_line = new Konva.Line({
    points: [stage.getWidth() / 2, stage.getHeight() / 2, wlan_x + 20, wlan_y + 15],
    stroke: 'blue',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round'
  });

  var wlan_text = "";
  if (enable__['ip'] == 1) {
    wlan_text += wlan_data['IP Address'] + "\n";
  }
  if (enable__['mac'] == 1) {
    wlan_text += wlan_data['MAC Address'] + "\n";
  }
  if (enable__['hostname'] == 1) {
    wlan_text += wlan_data['orgName'];
  }

  var wlantext = new Konva.Text({
    x: wlan_x - 100 - wlan_box.getWidth(),
    y: wlan_y + 25,
    text: wlan_text,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 320,
    padding: 20,
    align: 'center'
  });
  var wlantextbox = new Konva.Rect({
    x: wlan_x - 60,
    y: wlan_y + 35,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 160,
    height: wlantext.getHeight() - 20,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    cornerRadius: 10
  });

  var owner_text = new Konva.Text({
    x: stage.getWidth() / 2 - 160 - wlantext.getWidth(),
    y: stage.getHeight() / 2 - 70,
    text: wlan_data['owner'],
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 320,
    padding: 20,
    align: 'center'
  });

  wlanlayer.add(wlan_line);
  wlanlayer.add(wlan_box);
  wlanlayer.add(wlantextbox);
  wlanlayer.add(wlantext);

  stage.add(wlanlayer);
  /*
  wlanlayer.draw();
  if (enable__['owner'] == 1) {
    wlan_owner_layer.add(owner_text);
    wlan_owner_layer.draw();
  }

  stage.batchDraw();
*/
  //textarea_on(owner_text, wlan_owner_layer, wlan_data, 2);
}

/**
 * 기기의 수에따라 반원에 배치할 기기 위치 x, y 알고리즘
 * @param  {[type]} resultxy     x, y 좌표 결과값
 * @param  {[type]} device_count 기기 수
 * @param  {[type]} radius       반지름
 * @return {[type]}
 */
function semicircle_calcul(resultxy, device_count, radius) {
  if (device_count == 1) { //디바이스가 1개일 경우
    var xy = [];
    xy.push(radius);
    xy.push(0);
    resultxy.push(xy);
  } else if (device_count > 1 && device_count % 2 == 0) { //짝수일 경우
    var angle = 180 / (device_count + 1);
    var half_angle = angle / 2;
    for (var a = 0; a < device_count / 2; a++) {
      var xy = [];
      var x = radius * Math.cos(half_angle * Math.PI / 180);
      var y = radius * Math.sin(half_angle * Math.PI / 180);
      xy.push(x);
      xy.push(y);
      resultxy.push(xy);
      var x_y = [];
      x_y.push(x);
      x_y.push(y * -1);
      resultxy.push(x_y);
      half_angle += angle;
    }
  } else if (device_count > 1 && device_count % 2 == 1) { //홀수일 경우
    var xy = [];
    xy.push(radius);
    xy.push(0);
    resultxy.push(xy);

    var angle = 180 / (device_count + 1);
    var angle__ = angle;
    for (var a = 0; a < Math.floor(device_count / 2); a++) {
      var xy = [];
      var x = radius * Math.cos(angle__ * Math.PI / 180);
      var y = radius * Math.sin(angle__ * Math.PI / 180);
      xy.push(x);
      xy.push(y);
      resultxy.push(xy);
      var x_y = [];
      x_y.push(x);
      x_y.push(y * -1);
      resultxy.push(x_y);
      angle__ += angle;
    }
  }
}

/**
 * wlan에 붙은 ip 수에따라 반원에 배치할 기기 위치 x, y 알고리즘
 * @param  {[type]} resultxy     x, y 좌표 결과값
 * @param  {[type]} device_count 기기 수
 * @param  {[type]} radius       반지름
 * @return {[type]}
 */
function semicircle_calcul_wlan(resultxy, device_count, radius) {
  if (device_count == 1) { //디바이스가 1개일 경우
    var xy = [];
    xy.push(radius);
    xy.push(0);
    resultxy.push(xy);
  } else if (device_count > 1 && device_count % 2 == 0) { //짝수일 경우
    var angle = 180 / (device_count + 1);
    var half_angle = angle / 2;
    for (var a = 0; a < device_count / 2; a++) {
      var xy = [];
      var x = radius * Math.cos(half_angle * Math.PI / 180) * -1;
      var y = radius * Math.sin(half_angle * Math.PI / 180);
      xy.push(x);
      xy.push(y);
      resultxy.push(xy);
      var x_y = [];
      x_y.push(x);
      x_y.push(y * -1);
      resultxy.push(x_y);
      half_angle += angle;
    }
  } else if (device_count > 1 && device_count % 2 == 1) { //홀수일 경우
    var xy = [];
    xy.push(radius);
    xy.push(0);
    resultxy.push(xy);

    var angle = 180 / (device_count + 1);
    var angle__ = angle;
    for (var a = 0; a < Math.floor(device_count / 2); a++) {
      var xy = [];
      var x = radius * Math.cos(angle__ * Math.PI / 180) * -1;
      var y = radius * Math.sin(angle__ * Math.PI / 180);
      xy.push(x);
      xy.push(y);
      resultxy.push(xy);
      var x_y = [];
      x_y.push(x);
      x_y.push(y * -1);
      resultxy.push(x_y);
      angle__ += angle;
    }
  }
}


function wlan_ex_net_draw(enable, res_count, conn_count) {

  var device_count = conn_count;
  var radius = connect_radius;
  var resultxy = [];

  semicircle_calcul_wlan(resultxy, device_count, radius);

  for (var a = 0; a < device_count; a++) {
    var x = stage.getWidth() / 2 - 40 + resultxy[a][0] - 300;
    var y = stage.getHeight() / 2 - 15 + resultxy[a][1];

    var Line = new Konva.Line({
      points: [stage.getWidth() / 2 - 320, stage.getHeight() / 2, x + 20, y + 15],
      stroke: 'blue',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    });

    wlan_line_Layer.add(Line);

    /**
     * image promise 시작
     * @param {[type]} then .then
     */
    Ret_AddImage(a, x, y, "wlanExternal")
      .then(function(result) {
        console.log("비연결 image 성공 = " + result);
      }, function(result) {
        console.log("비연결 image 실패 = " + result);
      });

    // add the shape to the layer


    // add the layer to the stage
    var exnet_text = "";
    if (enable['ip'] == 1) {
      exnet_text += res_count[a]['IP Address'] + "\n";
    }
    if (enable['mac'] == 1) {
      exnet_text += res_count[a]['MAC Address'] + "\n";
    }
    if (enable['hostname'] == 1) {
      exnet_text += res_count[a]['Host name'];
    }
    var exnettext = new Konva.Text({
      x: x - 135,
      y: y + 35,
      text: exnet_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 320,
      padding: 20,
      align: 'center'
    });
    var exnettextbox = new Konva.Rect({
      x: x - 50,
      y: y + 45,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 150,
      height: exnettext.getHeight() - 20,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: [10, 10],
      shadowOpacity: 0.2,
      cornerRadius: 10
    });

    wlan_text_Layer.add(exnettextbox);
    wlan_text_Layer.add(exnettext);

    stage.add(wlan_line_Layer);
    stage.add(wlan_text_Layer);
  }
}

/**
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 * image promise 부분
 */
function Ret_AddImage(a, x, y, type) {
  return new Promise(function(resolve, reject) {
    AddImage(a, x, y, type, resolve, reject)
  })
}

function AddImage(a, x, y, type, resolve, reject) {
  var imageObj = new Image();
  if(type == "disconnect") {
    imageObj.src = red_svgpath;
  }
  else if(type == "wlanExternal") {
    imageObj.src = blue_svgpath;
  }
  imageObj.onload = function() {
    var device = new Konva.Image({
      x: x,
      y: y - 11,
      image: imageObj,
      width: 55,
      height: 55
    });

    //console.log("ㅡㅡㅡㅡㅡ" + a + ", " + x + ", " + y + "ㅡㅡㅡㅡㅡ");
    if(type == "disconnect") {
      disconnect_device_Layer.add(device);
      stage.add(disconnect_device_Layer);
    }
    else if (type == "wlanExternal") {
      wlan_device_Layer.add(device);
      stage.add(wlan_device_Layer);
    }
    if (device != null) {
      resolve(a);
    } else {
      reject(a);
    }
  }
}

/**
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 * image promise 부분
 */

/**
 * 연결되지 않은 기기들 stage addAp
 * @param  {[type]} enable     ip,mac,hostname,Owner 표시 유무
 * @param  {[type]} res_count  기기 JSON 정보
 * @param  {[type]} conn_count 기기 수
 * @return {[type]}            없음
 */
function disconnect_draw(enable, res_count, conn_count) {

  var device_count = conn_count;
  var radius = disconnect_radius;
  var resultxy = [];

  semicircle_calcul(resultxy, device_count, radius);


  for (var a = 0; a < device_count; a++) {
    /*
    const tmp__ = new Konva.Layer();
    disconn_owner_layer_Array.push(tmp__);
    stage.add(disconn_owner_layer_Array[a]);
*/
    var x = stage.getWidth() / 2 - 40 + resultxy[a][0];
    var y = stage.getHeight() / 2 - 15 + resultxy[a][1];

    console.log("111ㅡㅡㅡㅡㅡ" + a + ", " + x + ", " + y + "ㅡㅡㅡㅡㅡ");


    var Line = new Konva.Line({
      points: [stage.getWidth() / 2, stage.getHeight() / 2, x + 20, y + 15],
      stroke: 'black',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    });

    disconnect_line_Layer.add(Line);

    /**
     * image promise 시작
     * @param {[type]} then 없음
     */
    Ret_AddImage(a, x, y, "disconnect")
      .then(function(result) {
        console.log("비연결 image 성공 = " + result);
      }, function(result) {
        console.log("비연결 image 실패 = " + result);
      });

    // add the shape to the layer


    // add the layer to the stage
    var device_text = "";
    if (enable['ip'] == 1) {
      device_text += res_count[a]['IP Address'] + "\n";
    }
    if (enable['mac'] == 1) {
      device_text += res_count[a]['MAC Address'] + "\n";
    }
    if (enable['hostname'] == 1) {
      device_text += res_count[a]['Host name'];
    }
    var devicetext = new Konva.Text({
      x: x - 135,
      y: y + 35,
      text: device_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 320,
      padding: 20,
      align: 'center'
    });
    var devicetextbox = new Konva.Rect({
      x: x - 50,
      y: y + 45,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 150,
      height: devicetext.getHeight() - 20,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: [10, 10],
      shadowOpacity: 0.2,
      cornerRadius: 10
    });

    var owner_text = new Konva.Text({
      x: x - 138,
      y: y - 93,
      text: res_count[a]['owner'],
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 320,
      padding: 20,
      align: 'center'
    });
    //disconn_owner_text.push(owner_text);

    disconnect_text_Layer.add(devicetextbox);
    disconnect_text_Layer.add(devicetext);
    stage.add(disconnect_line_Layer);
    stage.add(disconnect_text_Layer);
    /*disconnect_line_Layer.draw();
    disconnect_device_Layer.draw();
    disconnect_text_Layer.draw();

    if (enable__['owner'] == 1) {
      disconn_owner_layer_Array[a].add(disconn_owner_text[a]);
      disconn_owner_layer_Array[a].draw();
    }

    stage.batchDraw();*/

    //textarea_device_on(disconn_owner_text, disconn_owner_text[a], res_count, 1);
  }
}
/*
function textarea_device_on(layer, text_layer_dex, data, index) {
  text_layer_dex.on('dblclick', function(evt) {
    // create textarea over canvas with absolute position
    var tmp_i = 0;
    for (var b = 0; b < layer.length; b++) {
      if (layer[b]._id == evt.target._id) {
        tmp_i = b;
        break;
      }
    }
    // first we need to find its positon
    var textPosition = layer[tmp_i].getAbsolutePosition();
    var stageBox = stage.getContainer().getBoundingClientRect();

    var areaPosition = {
      x: textPosition.x + stageBox.left,
      y: textPosition.y + stageBox.top
    };


    // create textarea and style it
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = layer[tmp_i].text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = layer[tmp_i].width();

    textarea.focus();


    textarea.addEventListener('keydown', function(e) {
      // hide on enter
      if (e.keyCode === 13) {
        layer[tmp_i].text(textarea.value);
        document.body.removeChild(textarea);
        if (index == 1) {
          socket.emit('owner__disconnect', owner_data(data[tmp_i]['MAC Address'], textarea.value));
        } else if (index == 2) {
          socket.emit('owner__connect', owner_data(data[tmp_i]['MAC Address'], textarea.value));
        }
      }
    });
  })
}
*/

//stage.add(layer);
