var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: 800,
  height: 600,
  draggable: true
});

var aplayer = new Konva.Layer();
var textlayer = new Konva.Layer();
var wlanlayer = new Konva.Layer();

var connect_radius = 380;
var disconnect_radius = 550;
//반원 처리 부분
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function connect_AP() {
  var AP_Rect = new Konva.Rect({
    x: stage.getWidth() / 2 - 40,
    y: stage.getHeight() / 2 - 30,
    width: 80,
    height: 60,
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 3

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

  aplayer.removeChildren();

  aplayer.add(AP_Rect);

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
function test___() {
  function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
      numImages++;
    }
    for (var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if (++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

  function buildStage(images) {
    var device = new Konva.Image({
      image: images.device,
      x: 120,
      y: 50
    });


    layer.add(device);
    stage.add(layer);
  }
  var sources = {
      device: '/svg/button-green_benji_park_01.svg',
  };

  loadImages(sources, buildStage);
}
function disconnect_draw(res_count, conn_count) {


  stage.remove();
  stage.clear();
  stage.removeChildren();

  wlan_draw();

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

  var curveLayer, anchorLayer, quad;

  anchorLayer = new Konva.Layer();
  curveLayer = new Konva.Layer();

  curveLayer.removeChildren();
  anchorLayer.removeChildren();

  for (var a = 0; a < device_count; a++) {
    var x = stage.getWidth() / 2 - 40 + resultxy[a][0];
    var y = stage.getHeight() / 2 - 15 + resultxy[a][1];

    var anchor = new Konva.Rect({
      x: x,
      y: y,
      width: 40,
      height: 30,
      fill: 'gray',
      stroke: 'black',
      strokeWidth: 3
    });
    // add hover styling
    anchor.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
      this.setStrokeWidth(4);
      anchorLayer.draw();
    });
    anchor.on('mouseout', function() {
      document.body.style.cursor = 'default';
      this.setStrokeWidth(2);
      anchorLayer.draw();
    });
    anchor.on('dragend', function() {});

    anchorLayer.add(anchor);

    function buildline(x, y) {
      var Line = new Konva.Line({
        points: [stage.getWidth() / 2, stage.getHeight() / 2, x + 20, y + 15],
        stroke: 'black',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round'
      });

      curveLayer.add(Line);

      stage.add(curveLayer);
    }

    buildline(x, y);
    stage.add(anchorLayer);

  }


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

  var curveLayer, anchorLayer, quad;

  anchorLayer = new Konva.Layer();
  curveLayer = new Konva.Layer();

  curveLayer.removeChildren();
  anchorLayer.removeChildren();

  for (var a = 0; a < device_count; a++) {
    var x = stage.getWidth() / 2 - 40 + resultxy[a][0];
    var y = stage.getHeight() / 2 - 15 + resultxy[a][1];

    var anchor = new Konva.Rect({
      x: x,
      y: y,
      width: 40,
      height: 30,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 3
    });
    // add hover styling
    anchor.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
      this.setStrokeWidth(4);
      anchorLayer.draw();
    });
    anchor.on('mouseout', function() {
      document.body.style.cursor = 'default';
      this.setStrokeWidth(2);
      anchorLayer.draw();
    });
    anchor.on('dragend', function() {});

    anchorLayer.add(anchor);

    function buildline(x, y) {
      var Line = new Konva.Line({
        points: [stage.getWidth() / 2, stage.getHeight() / 2, x + 20, y + 15],
        stroke: 'blue',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round'
      });

      curveLayer.add(Line);

      stage.add(curveLayer);
    }

    buildline(x, y);
    stage.add(anchorLayer);

  }


}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function connection_text(res_count, conn_count) {
  var content = "";
  if (res_count > conn_count) {
    content += "연결을 확인하는 중입니다...";
    document.getElementById("connent_text").innerHTML = content;

  } else if (res_count <= conn_count) {
    content += "연결 확인이 완료되었습니다.";
    document.getElementById("connent_text").innerHTML = content;

  }
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
