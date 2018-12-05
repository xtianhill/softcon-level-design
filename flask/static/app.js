window.onload = function a()
{
    /* **SETUP **
      * global variables for state of menu selections and default values
    */
    var backgroundimg="https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png";
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

    //initialize canvas element
    var canvas = new fabric.Canvas('c', { selection: false});

    var json_data = JSON.stringify(canvas.toDatalessJSON()); //initializing to be used later


/* ** GRID LINES **
* line.toObject sets json for line to be {} so lines dont get sent to playlevel
*/
   var grid = 50;
   for( var i=0; i< (2000/grid);i++){
    var line= new fabric.Line([i*grid,0, i*grid, 500], {stroke:'#a3c0f5', selectable: false, originX: 'center',
      originY: 'center'});
      canvas.add(line);
      line.toObject = function() {
            return {};
        };
    var line2= new fabric.Line([0, i*grid, 2000, i*grid], {stroke:'#a3c0f5', selectable: false, originX: 'center',
      originY: 'center'});
      canvas.add(line2);
      line2.toObject = function() {
            return {};
        };
}

/* DEFAULT URLS for all element images */
var groundsrc = "https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg";
var playersrc = "https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png";
var coinsrc= "https://66.media.tumblr.com/f7acf066084d424d5da0c09795fe8483/tumblr_inline_piy8y9FbkJ1ruhpn7_540.png";
//var coinsrc= "http://pluspng.com/img-png/sprite-png-sprite-png-can-image-431.png";
var enemysrc= "https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png";
var npcsrc = "https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png";
var winsrc = "https://66.media.tumblr.com/c8b37ca12ffceee4cb3b90b4fa5a252c/tumblr_pj2zemAm671u9vozfo1_250.png";


/* JSONderulo:
  ** sets the JSON toObject function to take in custom attributes
  *     so that when canvas.toJSON() is called, canvas objects have the desired
  *     format for parsing.js.
  ** checks the state of selected buttons form fields using jQuery
  *     JSONderulo is called in dragggable() when an element is added to the canvas,
  *     permanently associating with each element the attributes that were selected
  *     in the "options" menu at the time the object was added.
  ** note: the position of the object is dynamically set at the time of the
  *     toObject() call, which happens in canvas.toJSON();
  */

function JSONderulo(object, name, url){
  // ** JQUERY to detect currently selected values in per-element menus **
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

  /*array for list of Item's targets */
  var curr_target_list= new Array();
  if (target1==true){
    // console.log("HIIIII");
    curr_target_list.push("NPC");
  }
  if (target2==true){
    curr_target_list.push("Enemy");
  }
  if (target3==true){
    curr_target_list.push("Player");
  }

/* custom JSON per-element begins here */
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
  alert("ummm this should not be happening! check switch statement");//debugging
}
}


/* draggable()
 * called when an element is added to the canvas, does the following:
 * sets the custom json for the element (JSONderulo())
 * makes object translucent on mousedown and opaque on mouseup
 */
function draggable(object, name, url) {
  JSONderulo(object,name,url);
var x;
var y;

  object.on('mousedown', function() {
if (selectedelementtype==0){
        object.opacity=0.8;
        object.setShadow({
       blur: 4,
       color: 'rgba(0,0,0,0.5)',
       offsetX: 4,
       offsetX: 4,
   });
}
        x=object.getLeft();
        y=object.getTop();


  });

  object.on('mouseup', function(options) {
      object.opacity = 1;
      object.setShadow({
      blur: 0,
     color: 'rgba(0,0,0,0)',
     offsetX: 0,
     offsetX: 0,
 });
      var active= canvas.getActiveObject();
      var inter=0;
      canvas.forEachObject(function(obj){
        jsonobj=JSON.stringify(obj);
        var stringobj=JSON.stringify(JSON.parse(jsonobj));

        if (!((active==null)|| (obj === active) || (stringobj=='{}'))) {
          active.set({
            left: Math.round(active.left / grid) * grid,
            top: Math.round(active.top / grid) * grid
              });
        if ((active.getLeft()==obj.getLeft())&& (active.getTop()==obj.getTop())){
          inter=1;

          //to view when an invalid drag was attempted, do:
          //debugging highlight box
        /* active.set({'strokeWidth':  2,
          'stroke': '#f2e6ff',})*/
          active.set({
          'left':x,
          'top':y,
        });
        active.setCoords();
          return;
      }
}
if (inter==0&&(!(active==null))){
  active.set({'strokeWidth':  0,
  'stroke': false,})
}
  });
});

}

/* eraser functionality
 * removes object if clicked when eraser==1
 * if removed object is a player char, sets hasplayer back to 0
 */
canvas.on('mouse:down', function(click){
  if (eraser==1 && click.target!=undefined){
    var clicked=JSON.stringify(click.target);
    var clickedthing=JSON.parse(clicked);
    if (clickedthing.name=="Player"){
      hasplayer=0;
    }
    canvas.remove(click.target);
  }
});

/* do we need these*/
$('input[name="spriteurl"]').change(function(){
var newurl=$("input[name='spriteurl']").val();

});

$("#gravity-selector").on("change", function () {

      playergravity=$("input[name='color']:checked").val();

  });

  $("#solid-selector").on("change", function () {

      issolid=$('#solid-selector').val();
  });

  $("#effect-selector").on("change", function () {

      curr_effect=$('#effect-selector').val();
  });



/* function that adds elements to canvas */
canvas.on('mouse:down', function(event){
  if (event.target==undefined){//checks if grid is empty there before adding
    if (selectedimg!=0 && eraser !=1){
      var pointer = canvas.getPointer(event.e);
      //posx and posy are current mouse position coords for new elementm rounded
      var posX = Math.round((pointer.x-25) / grid) * grid; //snap to grid
      var posY = Math.round((pointer.y-25) / grid) * grid;
      var curselected=selectedimg;
      if (!((selectedelementtype=="Player")&&(hasplayer==1))){
        //dont add player if game has player
        //create fabric image object from current url
        fabric.Image.fromURL(curr_url,function(img){
          img.set({'left':  posX,
            'top':  posY,
            'hasControls': false,
            'hasBorders': false,
            'height': 50,
            'width': 50,
            'originX': 'left', //important: all coordinates are top and left
            'originY': 'top',
          })
        canvas.add(img);
        var tempurl=curr_url;
        draggable(img,selectedelementtype,tempurl);
         if (selectedelementtype=="Player"){
          hasplayer=1;
          }
        });
      }
    }
  }
});



/* change buttons use jquery to get urls from form fields.
 * when clicked, they change the element image icon, cursor, and options
 * menu preview to display the new user-inputrted image
*/

document.getElementById("changebutton").onclick= function(){
    var newurl=$("input[name='spriteurl']").val();
  document.getElementById("playerbutton").src=newurl;
  document.getElementById("player").src=newurl;
 document.getElementById("cursor2").src=newurl;
 document.getElementById("editpic").src=newurl;
 curr_url=newurl;
playersrc=newurl;

}

document.getElementById("changeterrain").onclick= function(){
    var newurl=$("input[name='terrainurl']").val();

  document.getElementById("groundbutton").src=newurl;
  document.getElementById("ground").src=newurl;
 document.getElementById("cursor").src=newurl;
 document.getElementById("editpic").src=newurl;
 curr_url=newurl;
 groundsrc=newurl;
}

document.getElementById("changeitem").onclick= function(){
    var newurl=$("input[name='newitem']").val();
  document.getElementById("itembutton").src=newurl;
  document.getElementById("coin").src=newurl;
 document.getElementById("cursor3").src=newurl;
 document.getElementById("editpic").src=newurl;
curr_url=newurl;
coinsrc=newurl;
}


document.getElementById("changenpc").onclick= function(){
    var newurl=$("input[name='newnpc']").val();
  document.getElementById("npcbutton").src=newurl;
  document.getElementById("npc").src=newurl;
 document.getElementById("cursor5").src=newurl;
 document.getElementById("editpic").src=newurl;
curr_url=newurl;
npcsrc=newurl;
}

document.getElementById("changeenemy").onclick= function(){
    var newurl=$("input[name='newenemy']").val();
  document.getElementById("enemybutton").src=newurl;
  document.getElementById("enemy").src=newurl;
 document.getElementById("cursor4").src=newurl;
 document.getElementById("editpic").src=newurl;
curr_url=newurl;
enemysrc=newurl;
}

document.getElementById("changebackground").onclick= function(){
  var newurl=$("input[name='newbackground']").val();
   $('#wrapper').css('background-image', 'url(' + newurl + ')');
   document.getElementById("backgroundbutton").src=newurl;
   backgroundimg=newurl;
   document.getElementById("editpic").src=backgroundimg;
 }




/* eraserbutton */

document.getElementById("eraserbutton").onclick= function(){
  eraser=1;
  curr_url=0;
  document.getElementById("playereditor").style="display: none";
  document.getElementById("environmenteditor").style="display: none";
  document.getElementById("itemeditor").style="display: none";
  document.getElementById("enemyeditor").style="display: none";
  document.getElementById("npceditor").style="display: none";
  document.getElementById("wincondeditor").style="display:none";
  document.getElementById("backgroundeditor").style="display:none"
  document.getElementById("options_title").innerHTML="Eraser Mode";
  document.getElementById("options_title").style="margin-left: 15px;";
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
      "top": e.pageY
    });
  }).mouseout(function () {
    $(".cursor6").hide();
  });
}

/*movemode button */
document.getElementById("movemode").onclick= function(){
  selectedimg=0;
  selectedelementtype=0;
  curr_url=0;
  eraser=0;
  document.getElementById("options_title").innerHTML="Cursor Mode";
  document.getElementById("options_title").style="margin-left: 15px;";
  document.getElementById("editpic").style="display: none";
  document.getElementById("playereditor").style="display: none";
  document.getElementById("environmenteditor").style="display: none";
  document.getElementById("enemyeditor").style="display: none";
  document.getElementById("npceditor").style="display: none";
  document.getElementById("itemeditor").style="display: none";
  document.getElementById("wincondeditor").style="display:none";
  document.getElementById("backgroundeditor").style="display:none"
  document.getElementById("cursor").style.visibility="hidden";
  document.getElementById("cursor2").style.visibility="hidden";
  document.getElementById("cursor4").style.visibility="hidden";
  document.getElementById("cursor3").style.visibility="hidden";
  document.getElementById("cursor5").style.visibility="hidden";
  document.getElementById("cursor6").style.visibility="hidden";
  }

  document.getElementById("wincondbutton").onclick= function(){
    eraser=0;
    selectedimg=0;
    selectedelementtype=0;
    curr_url=0;
    document.getElementById("wincondeditor").style="display:inline";
    document.getElementById("options_title").innerHTML="Game Rules";
    document.getElementById("options_title").style="margin-left: 20px;";
    document.getElementById("editpic").src=winsrc;
    document.getElementById("editpic").style="display: inline; height:50px; width: 50px";
    document.getElementById("playereditor").style="display: none";
    document.getElementById("environmenteditor").style="display: none";
    document.getElementById("enemyeditor").style="display: none";
    document.getElementById("npceditor").style="display: none";
    document.getElementById("itemeditor").style="display: none";
    document.getElementById("backgroundeditor").style="display:none"
    document.getElementById("cursor").style.visibility="hidden";
    document.getElementById("cursor2").style.visibility="hidden";
    document.getElementById("cursor4").style.visibility="hidden";
    document.getElementById("cursor3").style.visibility="hidden";
    document.getElementById("cursor5").style.visibility="hidden";
    document.getElementById("cursor6").style.visibility="hidden";

  }

  document.getElementById("backgroundbutton").onclick= function(){
    eraser=0;
    selectedelementtype=0;
    curr_url=0;
    selectedimg=0;
    document.getElementById("options_title").innerHTML="Background";
    document.getElementById("options_title").style="margin-left: 20px;"
    document.getElementById("backgroundeditor").style="display:inline"
    document.getElementById("wincondeditor").style="display:none";
    document.getElementById("editpic").src=backgroundimg;
    document.getElementById("editpic").style="height: 60px; width: 85px; border-radius: 5px; margin-left: -10px; object-fit: cover;";
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


/* SAVE GRID FUNCTION TO SAVE TO DATABASE */
document.getElementById("savegrid").onclick= function(){
  if (hasplayer==0){
    alert("Uh oh! You must add a player character to your game in order to save.")
    return;
  }

  var con1=$('#check1').is(':checked');
  var con2= $('#check2').is(':checked');
  var con3=$('#check3').is(':checked');
  if (con1==true){

    winconds.push("end");
  }
  if (con2==true){
    winconds.push("enemy");
  }
  if (con3==true){
    winconds.push("npc");
  }
  if(!con1 && !con2 && !con3){
    alert("Please choose a win condition for your game!");
    return;
  }

  var title = prompt("Enter the grid title", "title");

  var plaindata=JSON.stringify(canvas.toJSON());
  var objdata=JSON.parse(plaindata);
  objdata.winconds=winconds;
  objdata.thebackgroundimg=backgroundimg;
  var data=JSON.stringify(objdata);
  var myJSON= {
    "title" : title,
    "data" : data
  }
  // console.log(data);
  function myCB(data) {
    alert(data);
  }
 if (title != null){
    database.storeGrid(JSON.stringify(myJSON), myCB);
    // console.log("tried to store grid!");
  }

}

/* top menu buttons on click functions  */

 document.getElementById("groundbutton").onclick = function() {
   selectedimg=ground;
   selectedelementtype="Environment";
   curr_url=groundsrc;
   eraser=0;
   document.getElementById("options_title").innerHTML="Terrain";
   document.getElementById("options_title").style="margin-left: 40px;";
   document.getElementById("editpic").src=groundsrc;
   document.getElementById("editpic").style="display: inline; height:50px; width: 50px";
   var editor= document.getElementById("environmenteditor");
   editor.style="display: inline";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("backgroundeditor").style="display:none"
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
     "top": e.pageY
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
   document.getElementById("options_title").innerHTML="Player";
   document.getElementById("options_title").style="margin-left: 50px;";
   document.getElementById("editpic").src=playersrc;
   document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
   var editor= document.getElementById("playereditor");
   editor.style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
   document.getElementById("backgroundeditor").style="display:none"
   document.getElementById("cursor2").style.visibility="visible";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor3").style.visibility="hidden";
   document.getElementById("cursor4").style.visibility="hidden";
   document.getElementById("cursor5").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor2").show().css({
     "left": e.clientX,
     "top": e.pageY
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
   document.getElementById("options_title").innerHTML="Item";
   document.getElementById("options_title").style="margin-left: 65px;";
    document.getElementById("editpic").src=coinsrc;
    document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
   document.getElementById("itemeditor").style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
   document.getElementById("backgroundeditor").style="display:none"
   document.getElementById("cursor3").style.visibility="visible";
   document.getElementById("cursor2").style.visibility="hidden";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor4").style.visibility="hidden";
   document.getElementById("cursor5").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor3").show().css({
     "left": e.clientX,
     "top": e.pageY
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
   document.getElementById("options_title").innerHTML="Enemy";
   document.getElementById("options_title").style="margin-left: 60px;";
   document.getElementById("editpic").src=enemysrc;
   document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
    document.getElementById("enemyeditor").style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("npceditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
   document.getElementById("backgroundeditor").style="display:none"
   document.getElementById("cursor4").style.visibility="visible";
   document.getElementById("cursor2").style.visibility="hidden";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor3").style.visibility="hidden";
   document.getElementById("cursor5").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor4").show().css({
     "left": e.clientX,
     "top": e.pageY
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
   document.getElementById("options_title").innerHTML="NPC";
   document.getElementById("options_title").style="margin-left: 70px;";
   document.getElementById("editpic").src=npcsrc;
   document.getElementById("editpic").style="display:inline; height:50px; width: 50px";
   document.getElementById("npceditor").style="display: inline";
   document.getElementById("environmenteditor").style="display: none";
   document.getElementById("playereditor").style="display: none";
   document.getElementById("itemeditor").style="display: none";
   document.getElementById("enemyeditor").style="display: none";
   document.getElementById("wincondeditor").style="display:none";
   document.getElementById("backgroundeditor").style="display:none"
   document.getElementById("cursor5").style.visibility="visible";
   document.getElementById("cursor2").style.visibility="hidden";
   document.getElementById("cursor").style.visibility="hidden";
   document.getElementById("cursor3").style.visibility="hidden";
   document.getElementById("cursor4").style.visibility="hidden";
   document.getElementById("cursor6").style.visibility="hidden";
 $(document).mousemove(function (e) {
   $(".cursor5").show().css({
     "left": e.clientX,
     "top": e.pageY
   });
 }).mouseout(function () {
   $(".cursor5").hide();
 });
 }


/* FUNCTION THAT PREVENTS  THINGS FROM BEING DRAGGED ON TOP OF EACHOTHER */
 canvas.on('object:moving', function(options){
   //options.target.opacity = 0.7;
   //makeing sure things cant fall off grid
   options.target.setCoords();
   if(options.target.getLeft() < 0) {
      options.target.setLeft(0);
  }
  if(options.target.getLeft() > 1950) {
     options.target.setLeft(1950);
 }
  if(options.target.getTop() >450) {
      options.target.setTop(450);
  }

//abandoning the old collision detection ways
  /*  canvas.forEachObject(function(obj) {
      jsonobj=JSON.stringify(obj);
      var stringobj=JSON.stringify(JSON.parse(jsonobj));
      if ((obj === options.target) || (stringobj=='{}')) {
        return;
      }
 var hit=detectIntersection(options.target,obj);
      //  the following four lines use a combination of answers posted here https://stackoverflow.com/questions/22591927/snap-edges-of-objects-to-each-other-and-prevent-overlap
    var outerRight = obj.getLeft() + obj.getWidth();
      var outerBottom = obj.getTop()+obj.getHeight();
      var distX = (outerRight/2) - ((options.target.getLeft() + options.target.getWidth())/2);
      var distY = (outerBottom/2) - ((options.target.getTop() + options.target.getHeight())/2);
      if (hit==true){
        // console.log("intersection!");
        getNewPosition(distX,distY,options.target,obj);
        options.target.setCoords();
      }


});
*/
options.target.set({
  left: Math.round(options.target.left / grid) * grid,
  top: Math.round(options.target.top / grid) * grid
    });
  });





  /* Box model detection, return true on collision */
function detectIntersection( r1, r2 ) {
   return  !(r2.left > r1.left+49 ||
           r2.left+49 < r1.left ||
           r2.top > r1.top+49 ||
           r2.top+49 < r1.top);

}

function getNewPosition(distX, distY, target, obj) {

  // referencing a combination of answers posted here: https://stackoverflow.com/questions/22591927/snap-edges-of-objects-to-each-other-and-prevent-overlap
    if(Math.abs(distX) > Math.abs(distY)) {
        if (distX > 0) {
           console.log("distx>0");
            target.setLeft(obj.getLeft() - target.getWidth());
        } else {
          console.log("distx<0")
            target.setLeft(obj.getLeft() + obj.getWidth());
        }
    } else {
        if (distY > 0) {
           console.log("disty>0");
            target.setTop(obj.getTop() - target.getHeight());
        } else {
             console.log("disty<0");
            target.setTop(obj.getTop() + obj.getHeight());
        }
    }
}

 }
