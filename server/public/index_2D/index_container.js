var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: 900,
  height: 600
});

var layer = new Konva.Layer();


var Rect = new Konva.Rect({
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
  points: [Line_Rect_position_x + 20 + Rect.getWidth(), Line_Rect_position_y - 5, Line_Rect_position_x + 20 + Rect.getWidth(), Line_Rect_position_y - 20, Line_Rect_position_x + 5 + Rect.getWidth(), Line_Rect_position_y - 20],
  stroke: 'blue',
  strokeWidth: 3,
  lineCap: 'round',
  lineJoin: 'round',
  tension: 1
});
var Line4 = new Konva.Line({ //우측위 큰선
  points: [Line_Rect_position_x + 30 + Rect.getWidth(), Line_Rect_position_y, Line_Rect_position_x + 30 + Rect.getWidth(), Line_Rect_position_y - 30, Line_Rect_position_x + Rect.getWidth(), Line_Rect_position_y - 30],
  stroke: 'blue',
  strokeWidth: 3,
  lineCap: 'round',
  lineJoin: 'round',
  tension: 1
});


Rect.on('mouseenter', function() {
  stage.container().style.cursor = 'pointer';
});

Rect.on('mouseleave', function() {
  stage.container().style.cursor = 'default';
});

layer.add(Rect);

//반원 처리 부분
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var device_count = 3;
var radius = 350;
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
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var curveLayer, anchorLayer, quad;

anchorLayer = new Konva.Layer();
curveLayer = new Konva.Layer();

function drawCurves() {
  var context = curveLayer.getContext();

  context.clear();

  // draw quad
  context.beginPath();
  context.moveTo(quad.start.attrs.x, quad.start.attrs.y);
  context.quadraticCurveTo(quad.end.attrs.x, quad.end.attrs.y);
  context.setAttr('strokeStyle', 'black');
  context.setAttr('lineWidth', 3);
  context.stroke();
}


for (var a = 0; a < device_count; a++) {
  var x = stage.getWidth() / 2 - 40 + resultxy[a][0];
  var y = stage.getHeight() / 2 - 30 + resultxy[a][1];

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
  anchor.on('dragend', function() {
  });

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



//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var simpleText = new Konva.Text({
  x: 15,
  y: 15,
  text: resultxy,
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'green'
});

stage.add(layer);

layer.add(Line1);
layer.add(Line2);
layer.add(Line3);
layer.add(Line4);
//layer.add(simpleText);

layer.draw();

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
