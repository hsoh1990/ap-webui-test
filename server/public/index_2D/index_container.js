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
