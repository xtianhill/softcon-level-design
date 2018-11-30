window.onload = function a()
{
    //setup
    var selectedimg=0;
    var selectedelementtype=0;
    var eraser=0;
    var hasplayer=0;
    var issolid=1;
    var curr_effect="heal";
    var canvassrc = "https://d2ujflorbtfzji.cloudfront.net/package-screenshot/4b7e815a-669f-4023-ac73-6c7691fe9a9f_scaled.jpg";
    var playergravity= "medium";
    var curr_url=0;
  var canvas = new fabric.Canvas('c', { selection: false});
    //canvas.setBackgroundImage(canvassrc);

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
/*var menubox = new fabric.Rect({
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
*/

//urls for all the buttons
var groundsrc = "https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg";
var playersrc = "https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png"
var coinsrc= "https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png";
var enemysrc= "https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png";
var npcsrc = "https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png";

// function make a button, visually: calls draggable() to make it actually work.

/*function button(url, pos,pic, elementname){
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
*/
//ignore these comments for now but dont delete
//console.log(JSON.stringify(canvas));
/*
var json_data = JSON.stringify(canvas.toDatalessJSON());
//console.log(json_data);
canvas.loadFromJSON(JSON.parse(json_data), function(obj) {
  canvas.renderAll();
  console.log(' this is a callback. invoked when canvas is loaded!xxx ');
});*/

function JSONderulo(object,name,url){
  var curr_issolid=$('#solid-selector').val();
  var curr_env_effect=$('#environ-effect-selector').val();
  var curr_player_speed= $('#speed-selector').val();
  var curr_player_grav= $("input[name='color']:checked").val();
  var curr_player_maxhealth= $("input[name='health']").val();
  var curr_item_effect= $('#effect-selector').val();
  var curr_enemy_damage= $('input[name=enemydamage]').val();
  var curr_npc_message= $("input[name='npcmessage']").val();
switch(name){
  case "Environment":
  object.toObject = function() {
  return {type: "Element",
    name: name,
    top:object.top,
    left: object.left,
    url: url,
    scale: 1,
    solid: curr_issolid,
    effect: curr_env_effect,
  };
}
    break;
  case "Player":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  speed: curr_player_speed,
  gravity: curr_player_grav,
  maxhealth: curr_player_maxhealth,
  };
}
    break;
  case "Item":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  effect: curr_item_effect,
  };
}
    break;
  case "Enemy":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  damage: curr_enemy_damage,
  };
}
    break;
  case "NPC":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  msg: curr_npc_message,
  };
}
  break;
default:
  alert("ummm this should not be happening! check switch statement");
}
}

//function that make the buttons actually...buttons.
function draggable(object, name, url) {
/*  var curr_issolid=$('#solid-selector').val();
  var curr_env_effect=$('#environ-effect-selector').val();
  var curr_player_speed= $('#speed-selector').val();
  var curr_player_grav= $("input[name='color']:checked").val();
  var curr_player_maxhealth= $("input[name='health']").val();
  var curr_item_effect= $('#effect-selector').val();
  var curr_enemy_damage= $('input[name=enemydamage]').val();
  var curr_npc_message= $("input[name='npcmessage']").val();
switch(name){
  case "Environment":
  object.toObject = function() {
  return {type: "Element",
    name: name,
    top:object.top,
    left: object.left,
    url: url,
    scale: 1,
    solid: curr_issolid,
    effect: curr_env_effect,
  };
}
    break;
  case "Player":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  speed: curr_player_speed,
  gravity: curr_player_grav,
  maxhealth: curr_player_maxhealth,
  };
}
    break;
  case "Item":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  effect: curr_item_effect,
  };
}
    break;
  case "Enemy":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  damage: curr_enemy_damage,
  };
}
    break;
  case "NPC":
  object.toObject = function() {
  return {type: "Element",
  name: name,
  top:object.top,
  left: object.left,
  url: url,
  scale: 1,
  msg: curr_npc_message,
  };
}
  break;
default:
  alert("ummm this should not be happening! check switch statement");
}*/

        object.on('mousedown', function() {
          /*{
            var temp = new fabric.Image(pic,{
                left: pos,
                top: 25,
                hasControls: false,
                hasBorders: false,
                height: 50,
                width: 50,
                originX: 'left',
                originY: 'top'
            });*/
            //canvas.add(temp);
            //draggable(temp, pic,pos,name,url);
            //the following determines the json attributes of each thing when added to grid
            //its generic right now, but should be different for the element types
            // for ecxample, NPC needs "message"
            //temp.toObject = function() {
            //return {type: "button",
            //};
//};
if (eraser==1){
  canvas.remove(this);
}
        /*if (name == "NPC"){
        var msg = prompt("Please enter a message for the npc:", "You are under attack!");
            //actually save the input here

        }
        if (name == "Item"){
        var effect = prompt("Please enter an effect for this item:", "Heal");
            //actually save the input here
            //ask molly about effects
        }
*/
        });
        object.on('mouseup', function() {
            // Remove an event handler

            JSONderulo(object,name,url);
            /*object.toObject = function() {
            return {type: "Element",
            name: name,
            top:object.top,
            left: object.left,
            url: url,
            scale: 1
            };
  };*/
            this.off('mousedown');

            /*if(this.top <100) {
               canvas.remove(this);
            }*/
        });
    }


 //snap to grid
canvas.on('object:moving', function(options) {
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });

});





  $("#gravity-selector").on("change", function () {
      //alert("You choose " + $("input[name='color']:checked").val());
      playergravity=$("input[name='color']:checked").val();
      //issolid=$('gra-selector').val();
  });

  $("#solid-selector").on("change", function () {
    //  alert("You choose " + $('#solid-selector').val());
      issolid=$('#solid-selector').val();
  });

  $("#effect-selector").on("change", function () {
    //  alert("You choose " + $('#effect-selector').val());
      curr_effect=$('#effect-selector').val();
  });

  canvas.on('mouse:down', function(event){
  var msg=$("input[name='npcmessage']").val();
  console.log(msg);
//  var health=$("input[name='health']").val();
  //console.log(health);
    if (selectedimg!=0 && eraser !=1){
    var pointer = canvas.getPointer(event.e);
    var posX = Math.round((pointer.x-25) / grid) * grid;
    var posY = Math.round((pointer.y-25) / grid) * grid;
    //console.log(posX+", "+posY);
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
/*  temp.toObject = function() {
  return {type: "Element",
  name: selectedelementtype,
  top:temp.top,
  left: temp.left,
  url: "hi",
  scale: 1
  };
}*/
  draggable(temp,selectedelementtype,curr_url);
/*  temp.toObject = function() {
  return {type: "Element",
  name: selectedelementtype,
  top:temp.top,
  left: temp.left,
  url: "hi",
  scale: 1
  };
};
*/
}
});




/*function makejson(){
  json_data = JSON.stringify(canvas.toJSON());
  return json_data;
}*/

document.getElementById("eraserbutton").onclick= function(){
  eraser=1;
  curr_url=0;
  document.getElementById("cursor6").style.visibility="visible";
  document.getElementById("cursor").style.visibility="hidden";
  document.getElementById("cursor2").style.visibility="hidden";
  document.getElementById("cursor4").style.visibility="hidden";
  document.getElementById("cursor3").style.visibility="hidden";
  document.getElementById("cursor5").style.visibility="hidden";
  $(document).mousemove(function (e) {
    $(".cursor6").show().css({
      "left": e.clientX,
      "top": e.clientY
    });
  }).mouseout(function () {
    $(".cursor6").hide();
  });
}

document.getElementById("movemode").onclick= function(){
  selectedimg=0;
selectedelementtype=0;
curr_url=0;
  /*var cursor= document.getElementById("cursor");
  cursor.style.display="none";
  */
  document.getElementById("cursor").style.visibility="hidden";
  document.getElementById("cursor2").style.visibility="hidden";
  document.getElementById("cursor4").style.visibility="hidden";
  document.getElementById("cursor3").style.visibility="hidden";
  document.getElementById("cursor5").style.visibility="hidden";
  document.getElementById("cursor6").style.visibility="hidden";
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
               //console.log(json_data);
               alert(json_data);

 }

 document.getElementById("groundbutton").onclick = function() {
   selectedimg=ground;
   selectedelementtype="Environment";
   curr_url=groundsrc;
   document.getElementById("cursor").style.visibility="visible";
   document.getElementById("cursor2").style.visibility="hidden";
   document.getElementById("cursor3").style.visibility="hidden";
   document.getElementById("cursor4").style.visibility="hidden";
   document.getElementById("cursor5").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
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
   selectedelementtype="Player";
   curr_url=playersrc;
   document.getElementById("cursor2").style.visibility="visible";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor3").style.visibility="hidden";
   document.getElementById("cursor4").style.visibility="hidden";
   document.getElementById("cursor5").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor2").show().css({
     "left": e.clientX,
     "top": e.clientY
   });
 }).mouseout(function () {
   $(".cursor2").hide();
 });
 }

 document.getElementById("itembutton").onclick = function() {
   selectedimg=coin;
   selectedelementtype="Item";
   curr_url=coinsrc;
   document.getElementById("cursor3").style.visibility="visible";
   document.getElementById("cursor2").style.visibility="hidden";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor4").style.visibility="hidden";
   document.getElementById("cursor5").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor3").show().css({
     "left": e.clientX,
     "top": e.clientY
   });
 }).mouseout(function () {
   $(".cursor3").hide();
 });
 }

 document.getElementById("enemybutton").onclick = function() {
   selectedimg=enemy;
   selectedelementtype="Enemy";
   curr_url=enemysrc;

   document.getElementById("cursor4").style.visibility="visible";
   document.getElementById("cursor2").style.visibility="hidden";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor3").style.visibility="hidden";
   document.getElementById("cursor5").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor4").show().css({
     "left": e.clientX,
     "top": e.clientY
   });
 }).mouseout(function () {
   $(".cursor4").hide();
 });
 }

 document.getElementById("npcbutton").onclick = function() {
   selectedimg=npc;
   selectedelementtype="NPC";
   curr_url=npcsrc;
   document.getElementById("cursor5").style.visibility="visible";
   document.getElementById("cursor2").style.visibility="hidden";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor3").style.visibility="hidden";
   document.getElementById("cursor4").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor5").show().css({
     "left": e.clientX,
     "top": e.clientY
   });
 }).mouseout(function () {
   $(".cursor5").hide();
 });
 }











 }
