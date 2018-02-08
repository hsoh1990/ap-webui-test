function includejs(jsfilepath) {
  var js = document.createElement("script");

  js.type = "text/javascript";
  js.src = jsfilepath;

  document.body.appendChild(js);
}
includejs("../socket.io.js");

socket_ = io.connect('http://172.16.171.181:8080');

var stageWidth = 1000;
var stageHeight = 550;

var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: stageWidth,
  height: stageHeight,
  draggable: true
});

var aplayer = new Konva.Layer();
var ap_owner_layer = new Konva.Layer();
var wlanlayer = new Konva.Layer();
var wlan_exnet_Layer = new Konva.Layer();
var wlan_line_Layer = new Konva.Layer();
var wlan_text_Layer = new Konva.Layer();
var disconnect_device_Layer = new Konva.Layer();
var disconnect_line_Layer = new Konva.Layer();
var disconnect_text_Layer = new Konva.Layer();
var connect_device_Layer = new Konva.Layer();
var connect_line_Layer = new Konva.Layer();
var connect_text_Layer = new Konva.Layer();
var owner_input_dec = 0;
var connect_radius = 380;
var disconnect_radius = 550;
const red_svgpath = '/svg/button-red_benji_park_01.svg';
const green_svgpath = '/svg/button-green_benji_park_01.svg';
const ap_svgpath = '/svg/No_Hope_Wireless_Access_Point_clip_art.svg';
const blue_svgpath = '/svg/button-blue_benji_park_01.svg';

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//stage의 wudth 크기 브라우저크기에 따라 자동 설정

function return_socket() {
  return socket_;
}
function fitStageIntoParentContainer() {
  var container = document.querySelector('#stage-parent');

  // now we need to fit stage into parent
  var containerWidth = container.offsetWidth;
  // to do this we need to scale the stage
  var scale = containerWidth / stageWidth;


  stage.width(stageWidth * scale);
  //stage.height(stageHeight * scale);
  /*stage.scale({
    x: scale,
    y: scale
  });*/
  stage.draw();
}

fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener('resize', fitStageIntoParentContainer);

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//레이어에 추가한것 제거부분, stage clear 부분
function layer_removechildren() {
  stage.clear();
  stage.removeChildren();

  stage.add(wlan_line_Layer);
  stage.add(wlan_exnet_Layer);
  stage.add(wlan_text_Layer);
  stage.add(disconnect_line_Layer);
  stage.add(disconnect_device_Layer);
  stage.add(disconnect_text_Layer);
  stage.add(connect_line_Layer);
  stage.add(connect_device_Layer);
  stage.add(connect_text_Layer);

  aplayer.removeChildren();
  ap_owner_layer.removeChildren();
  wlanlayer.removeChildren();
  wlan_line_Layer.removeChildren();
  wlan_exnet_Layer.removeChildren();
  wlan_text_Layer.removeChildren();
  connect_line_Layer.removeChildren();
  connect_device_Layer.removeChildren();
  connect_text_Layer.removeChildren();
  disconnect_line_Layer.removeChildren();
  disconnect_device_Layer.removeChildren();
  disconnect_text_Layer.removeChildren();
}

function ap_draw(enable__, ap_data) {
  /*
  var AP_Rect = new Konva.Rect({
    x: stage.getWidth() / 2 - 40,
    y: stage.getHeight() / 2 - 30,
    width: 80,
    height: 60,
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 3

  });
  */
  stage.add(aplayer);
  stage.add(ap_owner_layer);

  var imageObj = new Image();
  imageObj.src = ap_svgpath;
  var ap = new Konva.Image({
    x: stage.getWidth() / 2 - 35,
    y: stage.getHeight() / 2 - 55,
    image: imageObj,
    width: 70,
    height: 85
  });

  var ap_text = "";
  if (enable__['ip'] == 1) {
    ap_text += ap_data[0]['IP Address'];
    ap_text += "\n";
  }
  if (enable__['mac'] == 1) {
    ap_text += ap_data[0]['MAC Address'];
    ap_text += "\n";
  }
  if (enable__['hostname'] == 1) {
    ap_text += ap_data[0]['Host name'];
  }

  var aptext = new Konva.Text({
    x: stage.getWidth() / 2 - 80 - ap.getWidth(),
    y: stage.getHeight() / 2 - 30 + 60,
    text: ap_text,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 300,
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

  /*var Line1 = new Konva.Line({ //좌측 위 작은선
    points: [Line_Rect_position_x - 20, Line_Rect_position_y - 5, Line_Rect_position_x - 20, Line_Rect_position_y - 20, Line_Rect_position_x - 5, Line_Rect_position_y - 20],
    stroke: 'blue',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 1
  });
  var Line2 = new Konva.Line({ //좌측 위 큰선
    points: [Line_Rect_position_x - 30, Line_Rect_position_y, Line_Rect_position_x - 30, Line_Rect_position_y - 30, Line_Rect_position_x, Line_Rect_position_y - 30],
    stroke: 'blue',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 1
  });
  var Line3 = new Konva.Line({ //우측 위 작은선
    points: [Line_Rect_position_x + 20 + AP_Rect.getWidth(), Line_Rect_position_y - 5, Line_Rect_position_x + 20 + AP_Rect.getWidth(), Line_Rect_position_y - 20, Line_Rect_position_x + 5 + AP_Rect.getWidth(), Line_Rect_position_y - 20],
    stroke: 'blue',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 1
  });
  var Line4 = new Konva.Line({ //우측위 큰선
    points: [Line_Rect_position_x + 30 + AP_Rect.getWidth(), Line_Rect_position_y, Line_Rect_position_x + 30 + AP_Rect.getWidth(), Line_Rect_position_y - 30, Line_Rect_position_x + AP_Rect.getWidth(), Line_Rect_position_y - 30],
    stroke: 'blue',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 1
  });*/

  // add the shape to the layer

  // add the layer to the stage


  ap.on('mouseenter', function() {
    stage.container().style.cursor = 'pointer';
  });

  ap.on('mouseleave', function() {
    stage.container().style.cursor = 'default';
  });

  var owner_text = new Konva.Text({
    x: stage.getWidth() / 2 - 80 - ap.getWidth(),
    y: stage.getHeight() / 2 - 100,
    text: "test",
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });

  //aplayer.add(AP_Rect);
  aplayer.add(ap);
  aplayer.add(aptextbox);
  aplayer.add(aptext);
  ap_owner_layer.add(owner_text);
  /*
  aplayer.add(Line1);
  aplayer.add(Line2);
  aplayer.add(Line3);
  aplayer.add(Line4);
*/
  aplayer.draw();
  ap_owner_layer.draw();

  stage.batchDraw();

  owner_text.on('dblclick', () => {
    // create textarea over canvas with absolute position

    // first we need to find its positon
    var textPosition = owner_text.getAbsolutePosition();
    var stageBox = stage.getContainer().getBoundingClientRect();

    var areaPosition = {
      x: textPosition.x + stageBox.left,
      y: textPosition.y + stageBox.top
    };


    // create textarea and style it
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = owner_text.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = owner_text.width();

    textarea.focus();


    textarea.addEventListener('keydown', function(e) {
      // hide on enter
      if (e.keyCode === 13) {
        owner_text.text(textarea.value);
        ap_owner_layer.draw();
        document.body.removeChild(textarea);
        owner_input_dec = 1;

      }
    });
  })
}

function owner_data (mac, text) {
  var result = {
    'mac' : mac,
    'owner' : owner
  }
  return result;
}
function return_owner_dec () {
  return owner_input_dec;
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//wlan draw 부분
function wlan_draw(enable__, wlan_data) {
  stage.add(wlanlayer);
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
    wlan_text += wlan_data[0]['IP Address'] + "\n";
  }
  if (enable__['mac'] == 1) {
    wlan_text += wlan_data[0]['MAC Address'] + "\n";
  }
  if (enable__['hostname'] == 1) {
    wlan_text += wlan_data[0]['orgName'];
  }

  var wlantext = new Konva.Text({
    x: wlan_x - 90 - wlan_box.getWidth(),
    y: wlan_y + 25,
    text: wlan_text,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 300,
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

  wlanlayer.add(wlan_line);
  wlanlayer.add(wlan_box);
  wlanlayer.add(wlantextbox);
  wlanlayer.add(wlantext);
  wlanlayer.draw();

  stage.batchDraw();
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//반원 상에서 기기들 위치 계산 부분

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
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//wlan external network draw부분
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
      stroke: 'black',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    });

    wlan_line_Layer.add(Line);



    var imageObj = new Image();
    imageObj.src = blue_svgpath;
    var exnet = new Konva.Image({
      x: x,
      y: y - 11,
      image: imageObj,
      width: 55,
      height: 55
    });

    // add the shape to the layer
    wlan_exnet_Layer.add(exnet);

    // add the layer to the stage
    var exnet_text = "";
    if (enable['ip'] == 1) {
      exnet_text += res_count[0][a]['IP Address'] + "\n";
    }
    if (enable['mac'] == 1) {
      exnet_text += res_count[0][a]['MAC Address'] + "\n";
    }
    if (enable['hostname'] == 1) {
      exnet_text += res_count[0][a]['Host name'];
    }
    var exnettext = new Konva.Text({
      x: x - 63,
      y: y + 35,
      text: exnet_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 176,
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

    wlan_line_Layer.draw();
    wlan_exnet_Layer.draw();
    wlan_text_Layer.draw();

    stage.batchDraw();
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//disconnect 기기들 draw부분
function disconnect_draw(enable, res_count, conn_count) {

  var device_count = conn_count;
  var radius = disconnect_radius;
  var resultxy = [];

  semicircle_calcul(resultxy, device_count, radius);

  for (var a = 0; a < device_count; a++) {
    var x = stage.getWidth() / 2 - 40 + resultxy[a][0];
    var y = stage.getHeight() / 2 - 15 + resultxy[a][1];

    var Line = new Konva.Line({
      points: [stage.getWidth() / 2, stage.getHeight() / 2, x + 20, y + 15],
      stroke: 'black',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    });

    disconnect_line_Layer.add(Line);



    var imageObj = new Image();
    imageObj.src = red_svgpath;
    var device = new Konva.Image({
      x: x,
      y: y - 11,
      image: imageObj,
      width: 55,
      height: 55
    });

    // add the shape to the layer
    disconnect_device_Layer.add(device);

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
      x: x - 63,
      y: y + 35,
      text: device_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 176,
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

    disconnect_text_Layer.add(devicetextbox);
    disconnect_text_Layer.add(devicetext);

    disconnect_line_Layer.draw();
    disconnect_device_Layer.draw();
    disconnect_text_Layer.draw();

    stage.batchDraw();
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//connect한 기기들 draw 부분
function connect_draw(enable, res_count, conn_count) {

  var device_count = conn_count;
  var radius = connect_radius;
  var resultxy = [];

  semicircle_calcul(resultxy, device_count, radius);

  for (var a = 0; a < device_count; a++) {
    var x = stage.getWidth() / 2 - 40 + resultxy[a][0];
    var y = stage.getHeight() / 2 - 15 + resultxy[a][1];

    var Line = new Konva.Line({
      points: [stage.getWidth() / 2, stage.getHeight() / 2, x + 20, y + 15],
      stroke: 'blue',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    });

    connect_line_Layer.add(Line);


    var imageObj = new Image();
    imageObj.src = green_svgpath;
    var device = new Konva.Image({
      x: x,
      y: y - 11,
      image: imageObj,
      width: 55,
      height: 55
    });

    // add the shape to the layer
    connect_device_Layer.add(device);

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
      x: x - 63,
      y: y + 35,
      text: device_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 176,
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

    connect_text_Layer.add(devicetextbox);
    connect_text_Layer.add(devicetext);

    /*connect_line_Layer.draw();
    connect_device_Layer.draw();
    connect_text_Layer.draw();*/

    stage.batchDraw();
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//connection text 부분
function connection_text(length, conn_count) {
  var content = "";
  if (length > conn_count) {
    content += "연결을 확인하는 중입니다...";
    document.getElementById("connent_text").innerHTML = content;

  } else if (length <= conn_count) {
    content += "연결 확인이 완료되었습니다.";
    document.getElementById("connent_text").innerHTML = content;

  }
}


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//stage drag 구현 부분
var lastDist = 0;
var startScale = 1;

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
}

stage.getContent().addEventListener('touchmove', function(evt) {
  var touch1 = evt.touches[0];
  var touch2 = evt.touches[1];

  if (touch1 && touch2) {
    var dist = getDistance({
      x: touch1.clientX,
      y: touch1.clientY
    }, {
      x: touch2.clientX,
      y: touch2.clientY
    });

    if (!lastDist) {
      lastDist = dist;
    }

    var scale = stage.getScaleX() * dist / lastDist;

    stage.scaleX(scale);
    stage.scaleY(scale);
    stage.draw();
    lastDist = dist;
  }
}, false);

stage.getContent().addEventListener('touchend', function() {
  lastDist = 0;
}, false);
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//wheel로 줌인, 줌아웃 구현 부분

var scaleBy = 1.15;
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  var oldScale = stage.scaleX();

  var mousePointTo = {
    x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
    y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
  };

  var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  stage.scale({
    x: newScale,
    y: newScale
  });

  var newPos = {
    x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
    y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
  };
  stage.position(newPos);
  stage.batchDraw();
});
