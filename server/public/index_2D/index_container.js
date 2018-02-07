var stageWidth = 1000;
var stageHeight = 600;

var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: stageWidth,
  height: stageHeight,
  draggable: true
});

var aplayer = new Konva.Layer();
var textlayer = new Konva.Layer();
var wlanlayer = new Konva.Layer();
var disconnect_device_Layer = new Konva.Layer();
var disconnect_line_Layer = new Konva.Layer();
var disconnect_text_Layer = new Konva.Layer();
var connect_device_Layer = new Konva.Layer();
var connect_line_Layer = new Konva.Layer();
var connect_text_Layer = new Konva.Layer();

var connect_radius = 380;
var disconnect_radius = 550;
const red_svgpath = '/svg/button-red_benji_park_01.svg';
const green_svgpath = '/svg/button-green_benji_park_01.svg';

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//stage의 wudth 크기 브라우저크기에 따라 자동 설정
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
  aplayer.removeChildren();
  wlanlayer.removeChildren();
  connect_line_Layer.removeChildren();
  connect_device_Layer.removeChildren();
  connect_text_Layer.removeChildren();
  disconnect_line_Layer.removeChildren();
  disconnect_device_Layer.removeChildren();
  disconnect_text_Layer.removeChildren();
}

function connect_AP(ap_data) {
  var AP_Rect = new Konva.Rect({
    x: stage.getWidth() / 2 - 40,
    y: stage.getHeight() / 2 - 30,
    width: 80,
    height: 60,
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 3

  });

  var ap_text = ap_data[0]['IP Address'] + "\n" + ap_data[0]['Host name'];
  var aptext = new Konva.Text({
    x: stage.getWidth() / 2 - 70 - AP_Rect.getWidth(),
    y: stage.getHeight() / 2 - 30 + 55,
    text: ap_text,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });
  var aptextbox = new Konva.Rect({
    x: stage.getWidth() / 2 - 65,
    y: stage.getHeight() / 2 + 35,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 130,
    height: aptext.getHeight() - 20,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    cornerRadius: 10
  });

  var Line_Rect_position_x = stage.getWidth() / 2 - 40;
  var Line_Rect_position_y = stage.getHeight() / 2 - 30;
  var Line1 = new Konva.Line({ //좌측 위 작은선
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
  });


  AP_Rect.on('mouseenter', function() {
    stage.container().style.cursor = 'pointer';
  });

  AP_Rect.on('mouseleave', function() {
    stage.container().style.cursor = 'default';
  });

  aplayer.add(AP_Rect);
  aplayer.add(aptextbox);
  aplayer.add(aptext);
  aplayer.add(Line1);
  aplayer.add(Line2);
  aplayer.add(Line3);
  aplayer.add(Line4);

  stage.add(aplayer);
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//wlan draw 부분
function wlan_draw(wlan_data) {
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

  var wlan_text = wlan_data[0]['IP Address'] + "\n" + wlan_data[0]['orgName'];
  var wlantext = new Konva.Text({
    x: stage.getWidth() / 2 - 70 - wlan_box.getWidth(),
    y: stage.getHeight() / 2 - 30 + 55,
    text: ap_text,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });
  var wlantextbox = new Konva.Rect({
    x: stage.getWidth() / 2 - 65,
    y: stage.getHeight() / 2 + 35,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 130,
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
  stage.add(wlanlayer);
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
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//disconnect 기기들 draw부분
function disconnect_draw(res_count, conn_count) {

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

    stage.add(disconnect_line_Layer);


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

    stage.add(disconnect_device_Layer);
    // add the layer to the stage
    var device_text = res_count[a]['IP Address'] + "\n" + res_count[a]['Host name'];
    var devicetext = new Konva.Text({
      x: x - 60,
      y: y + 35,
      text: device_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 170,
      padding: 20,
      align: 'center'
    });
    var devicetextbox = new Konva.Rect({
      x: x - 40,
      y: y + 45,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 130,
      height: devicetext.getHeight() - 20,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: [10, 10],
      shadowOpacity: 0.2,
      cornerRadius: 10
    });

    disconnect_text_Layer.add(devicetextbox);
    disconnect_text_Layer.add(devicetext);
    stage.add(disconnect_text_Layer);
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//connect한 기기들 draw 부분
function connect_draw(res_count, conn_count) {

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

    stage.add(connect_line_Layer);

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
    stage.add(connect_device_Layer);



    var device_text = res_count[a]['IP Address'] + "\n" + res_count[a]['Host name'];
    var devicetext = new Konva.Text({
      x: x - 60,
      y: y + 35,
      text: device_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 170,
      padding: 20,
      align: 'center'
    });
    var devicetextbox = new Konva.Rect({
      x: x - 40,
      y: y + 45,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 130,
      height: devicetext.getHeight() - 20,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: [10, 10],
      shadowOpacity: 0.2,
      cornerRadius: 10
    });

    connect_text_Layer.add(devicetextbox);
    connect_text_Layer.add(devicetext);
    stage.add(connect_text_Layer);
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
  stage.batchDraw();
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
