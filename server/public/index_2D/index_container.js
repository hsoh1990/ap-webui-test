var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: 800,
  height: 600,
  draggable: true
});

var aplayer = new Konva.Layer();
var textlayer = new Konva.Layer();
var wlanlayer = new Konva.Layer();
var disconnect_device_Layer = new Konva.Layer();
var disconnect_line_Layer = new Konva.Layer();
var connect_device_Layer = new Konva.Layer();
var connect_line_Layer = new Konva.Layer();

var connect_radius = 380;
var disconnect_radius = 550;
const red_svgpath = '/svg/button-red_benji_park_01.svg';
const green_svgpath = '/svg/button-green_benji_park_01.svg';

//반원 처리 부분
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

function layer_removechildren() {
  stage.clear();
  stage.removeChildren();
  aplayer.removeChildren();
  wlanlayer.removeChildren();
  connect_line_Layer.removeChildren();
  connect_device_Layer.removeChildren();
  disconnect_line_Layer.removeChildren();
  disconnect_device_Layer.removeChildren();
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
    x: stage.getWidth() / 2 - 70,
    y: stage.getHeight() / 2 - 30 + 55,
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
function wlan_draw() {
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

  wlanlayer.add(wlan_line);
  wlanlayer.add(wlan_box);
  stage.add(wlanlayer);
}

function disconnect_draw(res_count, conn_count) {

  var device_count = conn_count;
  var radius = disconnect_radius;
  var resultxy = [];
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

    // add the layer to the stage
  }
  stage.add(disconnect_device_Layer);
}

function connect_draw(res_count, conn_count) {

  var device_count = conn_count;
  var radius = connect_radius;
  var resultxy = [];
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

    function draw_image(imageObj) {

      var device = new Konva.Image({
        x: x,
        y: y - 11,
        image: imageObj,
        width: 55,
        height: 55
      });

      /*
      device.on('dragstart', function() {
        Line.points([stage.getWidth() / 2, stage.getHeight() / 2, device.x, device.y]);

      });*/
      // add the shape to the layer
      connect_device_Layer.add(device);

      // add the layer to the stage
      stage.add(connect_device_Layer);

    };
    imageObj.src = green_svgpath;

    draw_image(imageObj);
  }


}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
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
