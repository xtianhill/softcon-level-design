window.onload = function a()
{
    //setup
    var backgroundimg=0;
    var selectedimg=0;
    var selectedelementtype=0;
    var eraser=0;
    var hasplayer=0;
    var issolid="true";
    var curr_effect="heal";
    var canvassrc = "https://d2ujflorbtfzji.cloudfront.net/package-screenshot/4b7e815a-669f-4023-ac73-6c7691fe9a9f_scaled.jpg";
    var playergravity= "medium";
    var curr_url=0;
    var winconds= new Array();
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
var coinsrc= "https://66.media.tumblr.com/f7acf066084d424d5da0c09795fe8483/tumblr_inline_piy8y9FbkJ1ruhpn7_540.png";
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

function JSONderulo(object, name, url){
  var curr_issolid=$('#solid-selector').val();
  var curr_env_effect=$('#environ-effect-selector').val();
  var curr_player_speed= $('#speed-selector').val();
  var curr_player_grav= $("input[name='color']:checked").val();
  var curr_player_maxhealth= $("input[name='health']").val();
  var curr_item_effect= $('#effect-selector').val();
  var curr_enemy_damage= $("input[name='enemydamage']").val();
  var curr_enemy_grav= $("input[name='enemygrav']:checked").val();
  var curr_npc_message= $("input[name='npcmessage']").val();
  var curr_item_amount=$("input[name='amount']").val();
  var curr_npc_grav =$("input[name='grav']:checked").val();
  var curr_npc_maxhealth= $("input[name='npcmaxhealth']").val();
  var curr_enemy_maxhealth= $("input[name='enemymaxhealth']").val();
  var curr_enemy_speed= $('#enemy-speed-selector').val();
  var target1=$('#checkbox1').is(':checked');
  var target2= $('#checkbox2').is(':checked');
  var target3=$('#checkbox3').is(':checked');

  var curr_target_list= new Array();
  if (target1==true){
    console.log("HIIIII");
    curr_target_list.push("NPC");
  }
  if (target2==true){
    curr_target_list.push("Enemy");
  }
  if (target3==true){
    curr_target_list.push("Player");
  }
  /*console.log(curr_target_list);
  var con1=$('#check1').is(':checked');
  var con2= $('#check2').is(':checked');
  var con3=$('#check3').is(':checked');
  if (con1==true){

    winconds.push("End");
  }
  if (target2==true){
    winconds.push("Enemy");
  }
  if (target3==true){
    winconds.push("NPC");
  }
*/
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
  amount: curr_item_amount,
  targets: curr_target_list,
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
  gravity: curr_enemy_grav,
  maxhealth: curr_enemy_maxhealth,
  speed: curr_enemy_speed,
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
  gravity: curr_npc_grav,
  maxhealth: curr_npc_maxhealth,
  };
}
  break;
default:
  alert("ummm this should not be happening! check switch statement");
}
}

//function that make the buttons actually...buttons.
function draggable(object, name, url) {
  JSONderulo(object,name,url);
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



$('input[name="spriteurl"]').change(function(){
var newurl=$("input[name='spriteurl']").val();
//alert(newurl);
/*document.getElementById("playerbutton").src=newurl;
document.getElementById("player").src=newurl;
document.getElementById("cursor2").src=newurl;
document.getElementById("editpic").src=newurl;
playersrc=newurl;
*/
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



//THINGS ADDED TO CANVAS
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
    var curselected=selectedimg;

    /*var newthing=fabric.Image.fromURL(curr_url,function(img){
      img.set({'left':  posX,
      'top':  posY,
      'hasControls': false,
      'hasBorders': false,
      'height': 50,
      'width': 50,
      'originX': 'left',
      'originY': 'top'})
      canvas.add(img);
      return img;
    })*/
  fabric.Image.fromURL(curr_url,function(img){
      img.set({'left':  posX,
      'top':  posY,
      'hasControls': false,
      'hasBorders': false,
      'height': 50,
      'width': 50,
      'originX': 'left',
      'originY': 'top'})
      canvas.add(img);
      console.log(img);
      var tempurl=curr_url;
     draggable(img,selectedelementtype,tempurl);

    });
  /*var temp = new fabric.Image(curselected,{
      left:  posX,
      top:  posY,
      hasControls: false,
      hasBorders: false,
      height: 50,
      width: 50,
      originX: 'left',
      originY: 'top'
  });
  */
  //canvas.add(temp);
/*  temp.toObject = function() {
  return {type: "Element",
  name: selectedelementtype,
  top:temp.top,
  left: temp.left,
  url: "hi",
  scale: 1
  };
}*/

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

document.getElementById("changebutton").onclick= function(){
    var newurl=$("input[name='spriteurl']").val();
  document.getElementById("playerbutton").src=newurl;
  document.getElementById("player").src=newurl;
 document.getElementById("cursor2").src=newurl;
 document.getElementById("editpic").src=newurl;
 curr_url=newurl;


}



document.getElementById("changeterrain").onclick= function(){
    var newurl=$("input[name='terrainurl']").val();

  document.getElementById("groundbutton").src=newurl;
  document.getElementById("ground").src=newurl;
 document.getElementById("cursor").src=newurl;
 document.getElementById("editpic").src=newurl;
 curr_url=newurl;
}

document.getElementById("changeitem").onclick= function(){
    var newurl=$("input[name='newitem']").val();
  document.getElementById("itembutton").src=newurl;
  document.getElementById("coin").src=newurl;
 document.getElementById("cursor3").src=newurl;
 document.getElementById("editpic").src=newurl;
curr_url=newurl;
}


document.getElementById("changenpc").onclick= function(){
    var newurl=$("input[name='newnpc']").val();
  document.getElementById("npcbutton").src=newurl;
  document.getElementById("npc").src=newurl;
 document.getElementById("cursor5").src=newurl;
 document.getElementById("editpic").src=newurl;
curr_url=newurl;
}

document.getElementById("changeenemy").onclick= function(){
    var newurl=$("input[name='newenemy']").val();
  document.getElementById("enemybutton").src=newurl;
  document.getElementById("enemy").src=newurl;
 document.getElementById("cursor4").src=newurl;
 document.getElementById("editpic").src=newurl;
curr_url=newurl;
}

document.getElementById("eraserbutton").onclick= function(){
  eraser=1;
  curr_url=0;
  document.getElementById("playereditor").style="display: none";
  document.getElementById("environmenteditor").style="display: none";
  document.getElementById("itemeditor").style="display: none";
  document.getElementById("enemyeditor").style="display: none";
  document.getElementById("npceditor").style="display: none";
  document.getElementById("wincondeditor").style="display:none";
  document.getElementById("editpic").style="display: none";
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
eraser=0;
  /*var cursor= document.getElementById("cursor");
  cursor.style.display="none";
  */
  document.getElementById("editpic").style="display: none";
  document.getElementById("playereditor").style="display: none";
  document.getElementById("environmenteditor").style="display: none";
  document.getElementById("enemyeditor").style="display: none";
  document.getElementById("npceditor").style="display: none";
  document.getElementById("itemeditor").style="display: none";
  document.getElementById("wincondeditor").style="display:none";
  document.getElementById("cursor").style.visibility="hidden";
  document.getElementById("cursor2").style.visibility="hidden";
  document.getElementById("cursor4").style.visibility="hidden";
  document.getElementById("cursor3").style.visibility="hidden";
  document.getElementById("cursor5").style.visibility="hidden";
  document.getElementById("cursor6").style.visibility="hidden";
  }

  document.getElementById("wincondbutton").onclick= function(){
    document.getElementById("wincondeditor").style="display:inline";
    document.getElementById("editpic").style="display: none";
    document.getElementById("playereditor").style="display: none";
    document.getElementById("environmenteditor").style="display: none";
    document.getElementById("enemyeditor").style="display: none";
    document.getElementById("npceditor").style="display: none";
    document.getElementById("itemeditor").style="display: none";
    document.getElementById("cursor").style.visibility="hidden";
    document.getElementById("cursor2").style.visibility="hidden";
    document.getElementById("cursor4").style.visibility="hidden";
    document.getElementById("cursor3").style.visibility="hidden";
    document.getElementById("cursor5").style.visibility="hidden";
    document.getElementById("cursor6").style.visibility="hidden";

  }

document.getElementById("savegrid").onclick= function(){
  var con1=$('#check1').is(':checked');
  var con2= $('#check2').is(':checked');
  var con3=$('#check3').is(':checked');
  if (con1==true){

    winconds.push("End");
  }
  if (con2==true){
    winconds.push("Enemy");
  }
  if (con3==true){
    winconds.push("NPC");
  }
  var title = prompt("Enter the grid title", "title");
  var canvdata=JSON.stringify(canvas.toJSON());
  var data= {
    "canvas:" : canvdata,
    "winconds:": winconds,
    "background:": backgroundimg,
  }
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
   eraser=0;
   document.getElementById("editpic").src=groundsrc;
   document.getElementById("editpic").style="display: inline; height:50px; width: 50px";
   var editor= document.getElementById("environmenteditor");
   editor.style="display: inline";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
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
   eraser=0;
   document.getElementById("editpic").src=playersrc;
  document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
   var editor= document.getElementById("playereditor");
   editor.style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
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
   eraser=0;
    document.getElementById("editpic").src=coinsrc;
    document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
   document.getElementById("itemeditor").style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
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
   eraser=0;
   document.getElementById("editpic").src=enemysrc;
   document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
    document.getElementById("enemyeditor").style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
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
   eraser=0;
   document.getElementById("editpic").src=npcsrc;
   document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
    document.getElementById("npceditor").style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
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
