window.onload = function a()
{
    //setup
    var selectedimg=0;
    var canvassrc = "https://d2ujflorbtfzji.cloudfront.net/package-screenshot/4b7e815a-669f-4023-ac73-6c7691fe9a9f_scaled.jpg";
	var canvas = new fabric.Canvas('c', { selection: false});
    canvas.setBackgroundImage(canvassrc);

    var json_data = JSON.stringify(canvas.toDatalessJSON()); //initializing to be used later


//drawing the lines of the grid
    var grid = 50;
    for( var i=0; i< (2000/grid);i++){
    var line= new fabric.Line([i*grid,0, i*grid, 500], {stroke:'#a3c0f5', selectable: false, originX: 'center',
      originY: 'center'});
      canvas.add(line);
      line.toObject = function() {
            return { };
        };
    var line2= new fabric.Line([0, i*grid, 2000, i*grid], {stroke:'#a3c0f5', selectable: false, originX: 'center',
      originY: 'center'});
      canvas.add(line2);
      line2.toObject = function() {
            return { };
        };
}


//gray rectangle for buttons to go in
var menubox = new fabric.Rect({
        left: 0,
        top: 0,
        fill:  "#96B2E3",
        width: 600,
        height: 200,
        lockRotation: true,
        selectable: false,
    });
canvas.add(menubox);
menubox.toObject = function() {
  return { };
};

//urls for all the buttons
var groundsrc = "https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg";
var playersrc = "https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png"
var coinsrc= "https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png";
var enemysrc= "https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png";
var npcsrc = "https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png";

// function make a button, visually: calls draggable() to make it actually work.
function button(url, pos,pic, elementname){
 fabric.Image.fromURL(url, function(img) {
       var btn =img.set({ top: 25,
        left: pos,
        width: 50,
        height: 50,
        hasControls: false,
        hasBorders: false,
        originX: 'left',
        originY: 'top',
        hasRotatingPoint: false,
    });
    canvas.add(img);
    draggable(btn,pic,pos,elementname,url);
    btn.toObject = function() {
        return {}; //dont want buttons to show up in JSON sent to makelevel
    };
});
}

button(groundsrc,0,ground, "Environment");
button(playersrc,50,player, "Player");
button(coinsrc,100, coin, "Item");
button(enemysrc,150,enemy, "Enemy");
button(npcsrc,200,npc, "NPC");

//ignore these comments for now but dont delete
//console.log(JSON.stringify(canvas));
/*
var json_data = JSON.stringify(canvas.toDatalessJSON());
//console.log(json_data);
canvas.loadFromJSON(JSON.parse(json_data), function(obj) {
  canvas.renderAll();
  console.log(' this is a callback. invoked when canvas is loaded!xxx ');
});*/


//function that make the buttons actually...buttons.
function draggable(object, pic, pos, name, url) {
        object.on('mousedown', function() {
            var temp = new fabric.Image(pic,{
                left: pos,
                top: 25,
                hasControls: false,
                hasBorders: false,
                height: 50,
                width: 50,
                originX: 'left',
                originY: 'top'
            });
            canvas.add(temp);
            draggable(temp, pic,pos,name,url);
            //the following determines the json attributes of each thing when added to grid
            //its generic right now, but should be different for the element types
            // for ecxample, NPC needs "message"
            temp.toObject = function() {
            return {type: "button",
            };
};

        if (name == "NPC"){
        var msg = prompt("Please enter a message for the npc:", "You are under attack!");
            //actually save the input here

        }
        if (name == "Item"){
        var effect = prompt("Please enter an effect for this item:", "Heal");
            //actually save the input here
            //ask molly about effects
        }
        /*
        if (name == "Environment"){
            var bool = prompt("Is this block solid? enter yes or no:", "yes");
        }*/
        });
        object.on('mouseup', function() {
            // Remove an event handler
            object.toObject = function() {
            return {type: "Element",
            name: name,
            top:object.top,
            left: object.left,
            url: url,
            scale: 1
            };
  };
            this.off('mousedown');
            if(this.top <100) {
               canvas.remove(this);
            }
        });
    }


 //snap to grid
canvas.on('object:moving', function(options) {
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});


/*function getMouseCoords(event)
{
  var pointer = canvas.getPointer(event.e);
  var posX = pointer.x;
  var posY = pointer.y;
  console.log(posX+", "+posY);    // Log to console
}*/
  canvas.on('mouse:down', function(event){
    if (selectedimg!=0){
    var pointer = canvas.getPointer(event.e);
    var posX = Math.round((pointer.x-25) / grid) * grid;
    var posY = Math.round((pointer.y-25) / grid) * grid;
    console.log(posX+", "+posY);
  var temp = new fabric.Image(selectedimg,{
      left:  posX,
      top:  posY,
      hasControls: false,
      hasBorders: false,
      height: 50,
      width: 50,
      originX: 'left',
      originY: 'top'
  });
  canvas.add(temp);
}
});


/*function makejson(){
  json_data = JSON.stringify(canvas.toJSON());
  return json_data;
}*/

document.getElementById("movemode").onclick= function(){
  selectedimg=0;
  /*var cursor= document.getElementById("cursor");
  cursor.style.display="none";
  */
  document.getElementById("cursor").style.visibility="hidden";
  document.getElementById("cursor2").style.visibility="hidden";
  }


document.getElementById("savegrid").onclick= function(){
  var title = prompt("Enter the grid title", "title");
  var data= JSON.stringify(canvas.toJSON());
  var myJSON= {
    "title" : title,
    "data" : data
  }
  function myCB(data) {
    alert(data);
  }
  if (title != null){
    database.storeGrid(JSON.stringify(myJSON), myCB);
    console.log("tried to store grid!");
  }
}


//take everything on the current canvas and print to console and alert in custom json format
document.getElementById("save").onclick = function(){
     json_data = JSON.stringify(canvas.toJSON());
               console.log(json_data);
               alert(json_data);

 }

 document.getElementById("groundbutton").onclick = function() {
   selectedimg=ground;
   document.getElementById("cursor").style.visibility="visible";
 $(document).mousemove(function (e) {
   $(".cursor").show().css({
     "left": e.clientX,
     "top": e.clientY
   });
 }).mouseout(function () {
   $(".cursor").hide();
 });
 }

 document.getElementById("playerbutton").onclick = function() {
   selectedimg=player;
   document.getElementById("cursor2").style.visibility="visible";
 $(document).mousemove(function (e) {
   $(".cursor2").show().css({
     "left": e.clientX,
     "top": e.clientY
   });
 }).mouseout(function () {
   $(".cursor2").hide();
 });
 }

 }
