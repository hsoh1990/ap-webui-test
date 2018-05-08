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
var disconnect_device_Layer = new Konva.Layer();
var disconnect_line_Layer = new Konva.Layer();
var disconnect_text_Layer = new Konva.Layer();

var disconnect_radius = 550;

const ap_svgpath = '/svg/No_Hope_Wireless_Access_Point_clip_art.svg';

/**
 * 해당 layer를 삭제
 * @return {[type]} [description]
 */
function removeShape() {
  Aplayer.destroyChildren();
  stage.add(Aplayer);
}


function addAp() {
  var imageObj = new Image();
  imageObj.onload = function() {
    var ap = new Konva.Image({
      x: stage.getWidth() / 2,
      y: stage.getHeight() / 2,
      image: imageObj,
      width: 70,
      height: 85
    });

    Aplayer.add(ap);

    stage.add(Aplayer);
  }
  imageObj.src = ap_svgpath;
}

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

function disconnect_draw(enable, res_count, conn_count) {

  var device_count = conn_count;
  var radius = disconnect_radius;
  var resultxy = [];

  semicircle_calcul(resultxy, device_count, radius);


  for (var a = 0; a < device_count; a++) {
    /*
    const tmp__ = new Konva.Layer();
    disconn_owner_layer_Array.push(tmp__);
    stage.add(disconn_owner_layer_Array[a]);
*/
    var x = stage.getWidth() / 2 - 40 + resultxy[a][0];
    var y = stage.getHeight() / 2 - 15 + resultxy[a][1];

    console.log("111ㅡㅡㅡㅡㅡ" + a + ", " + x + ", " + y + "ㅡㅡㅡㅡㅡ");


    var Line = new Konva.Line({
      points: [stage.getWidth() / 2, stage.getHeight() / 2, x + 20, y + 15],
      stroke: 'black',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    });

    disconnect_line_Layer.add(Line);



    var imageObj = new Image();
    imageObj.onload = function() {
      var device = new Konva.Image({
        x: x,
        y: y - 11,
        image: imageObj,
        width: 55,
        height: 55
      });

      console.log("ㅡㅡㅡㅡㅡ" + a + ", " + x + ", " + y + "ㅡㅡㅡㅡㅡ");
      if(a == 3) {
        return;
      }
      disconnect_device_Layer.add(device);
      stage.add(disconnect_device_Layer);
    }
    imageObj.src = red_svgpath;
    // add the shape to the layer


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
      x: x - 135,
      y: y + 35,
      text: device_text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 320,
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

    var owner_text = new Konva.Text({
      x: x - 138,
      y: y - 93,
      text: res_count[a]['owner'],
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 320,
      padding: 20,
      align: 'center'
    });
    //disconn_owner_text.push(owner_text);

    disconnect_text_Layer.add(devicetextbox);
    disconnect_text_Layer.add(devicetext);
    stage.add(disconnect_line_Layer);
    stage.add(disconnect_text_Layer);
    /*disconnect_line_Layer.draw();
    disconnect_device_Layer.draw();
    disconnect_text_Layer.draw();

    if (enable__['owner'] == 1) {
      disconn_owner_layer_Array[a].add(disconn_owner_text[a]);
      disconn_owner_layer_Array[a].draw();
    }

    stage.batchDraw();*/

    //textarea_device_on(disconn_owner_text, disconn_owner_text[a], res_count, 1);
  }
}
/*
function textarea_device_on(layer, text_layer_dex, data, index) {
  text_layer_dex.on('dblclick', function(evt) {
    // create textarea over canvas with absolute position
    var tmp_i = 0;
    for (var b = 0; b < layer.length; b++) {
      if (layer[b]._id == evt.target._id) {
        tmp_i = b;
        break;
      }
    }
    // first we need to find its positon
    var textPosition = layer[tmp_i].getAbsolutePosition();
    var stageBox = stage.getContainer().getBoundingClientRect();

    var areaPosition = {
      x: textPosition.x + stageBox.left,
      y: textPosition.y + stageBox.top
    };


    // create textarea and style it
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = layer[tmp_i].text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = layer[tmp_i].width();

    textarea.focus();


    textarea.addEventListener('keydown', function(e) {
      // hide on enter
      if (e.keyCode === 13) {
        layer[tmp_i].text(textarea.value);
        document.body.removeChild(textarea);
        if (index == 1) {
          socket.emit('owner__disconnect', owner_data(data[tmp_i]['MAC Address'], textarea.value));
        } else if (index == 2) {
          socket.emit('owner__connect', owner_data(data[tmp_i]['MAC Address'], textarea.value));
        }
      }
    });
  })
}
*/
addAp();

//stage.add(layer);
