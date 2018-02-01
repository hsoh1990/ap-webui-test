
var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: 750,
  height: 500
});

var layer = new Konva.Layer();
stage.add(layer);

var Rect = new Konva.Rect({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  width: 100,
  height: 80,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 3
});

var Line_Rect_position_x = stage.getWidth() / 2;
var Line_Rect_position_y = stage.getHeight() / 2;
var Line = new Konva.Line({
  points: [Line_Rect_position_x - 40, Line_Rect_position_y - 5, Line_Rect_position_x - 40, Line_Rect_position_y - 40, Line_Rect_position_x - 5, Line_Rect_position_y - 40],
  stroke: 'black',
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
layer.add(Line);

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
