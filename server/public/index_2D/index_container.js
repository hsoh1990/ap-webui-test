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
  draggable: true
});

var layer = new Konva.Layer();

function addStar(layer, stage) {
  var scale = Math.random();

  var star = new Konva.Star({
    x: Math.random() * stage.getWidth(),
    y: Math.random() * stage.getHeight(),
    numPoints: 5,
    innerRadius: 30,
    outerRadius: 50,
    fill: '#89b717',
    opacity: 0.8,
    draggable: true,
    scale: {
      x: scale,
      y: scale
    },
    rotation: Math.random() * 180,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: {
      x: 5,
      y: 5
    },
    shadowOpacity: 0.6,
    startScale: scale
  });

  layer.add(star);
}

addStar(layer, stage);

stage.add(layer);
