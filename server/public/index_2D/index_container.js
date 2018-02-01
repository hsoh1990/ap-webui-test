var stage = new Konva.Stage({
  container: 'container',   // id of container <div>
  width: 800,
  height: 500
});

var layer = new Konva.Layer();

var circle = new Konva.Rect({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  width: 100,
  height: 50,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 3,

});

layer.add(circle);

stage.add(layer);
