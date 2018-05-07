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
var Aplayer = new Konva.Layer();

const ap_svgpath = '/svg/No_Hope_Wireless_Access_Point_clip_art.svg';

function removeShape() {
  Aplayer.destroyChildren();
}

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

function addAp() {
  var imageObj = new Image();
  imageObj.onload = function() {
    var ap = new Konva.Image({
      x: Math.random() * stage.getWidth(),
      y: Math.random() * stage.getHeight(),
      image: imageObj,
      width: 70,
      height: 85
    });

    Aplayer.add(ap);

    stage.add(Aplayer);
  }
  imageObj.src = ap_svgpath;
}

addAp();
//addStar(layer, stage);

//stage.add(layer);
