/* basic engine prototype */
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js').vector;

var gravity = -.5;



var icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToe-PSAektDgBsXLsdybQW6F1wGDdpw2mbm3SaReRPuQ0ec0ns";
var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
var elements =
    [ new Player(new Vector(0,0), 10, 10, true, 'item', new Vector(50,50), icon2, new Vector(50,50))
    , new NPC(new Vector(100,0), 10, 10, true, "hello", new Vector(50,50), icon, new Vector(50,50))
    ];

// query database and get level info, then translate into list of elements


function update(progress) {

//Hayley: I'm assuming that were isolating the player character: they're called pc here
    var pc = elements[0];

    if (rightPressed){
      if (pc.position.x+1 < (width-pc.size.x)){
        pc.position.x = pc.position.x+1
      }
    }
    if (leftPressed){
      if(pc.position.x-1 > 0){
          pc.position.x = pc.position.x-1;
      }
    }
    if (downPressed){
      if(pc.position.y+1 < (height-pc.size.y)){
          pc.position.y = pc.position.y+1;
      }
    }
    if (upPressed){
      if(pc.position.y-1 > 0){
          pc.position.y = pc.position.y-1;
      }
    }

    for(i=1; i<elements.length; i++){

        if(detectCollision(pc, elements[i]))
        {
            //if npc, show message
            if(elements[i] instanceof NPC){
                //elements[i].displayMessage();

            }

            //if enemy, either damage w/item or lose health
            if(elements[i] instanceof Enemy){
                if(pc.getOwnedItem().getEffect() == "damage"){
                    elements[i].decHealth(1);
                } else{
                    pc.decHealth(elements[i].getDamage());
                }

            }

            //if item, pick up and remove from elements
            if(elements[i] instanceof Item){
                pc.setOwnedItem= elements[i];
                elements.splice(i,1);
            }

            //if environment, set gravity to 0? then have falling occur later?
            if(elements[i] instanceof Environment){
                gravity=0;
            }
        }
    }
}

function detectCollision(element1, element2) {
    //console.log(element1, element2);
    // console.log(element1.position.x + ' < ' + (element2.position.x + element2.size.x));
    if (element1.position.x < element2.position.x + element2.size.x  && element1.position.x + element1.size.x  > element2.position.x &&
		element1.position.y < element2.position.y + element2.size.y && element1.position.y + element1.size.y > element2.position.y) {
            console.log('hello');
        return true;
    }
    return false;
}

var canvas = document.getElementById("c");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

function keyDownHandler(event) {
    console.log("event", event);
    //console.log
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    if(event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 83) {
    	downPressed = true;
    }
    if(event.keyCode == 87) {
    	upPressed = true;
    }
}

function keyUpHandler(event) {
    console.log("event", event);
    //console.log
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    if(event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
}

// need to create all the images given urls - this could/should happen within translation function
function imgInit(){
    for(i = 0; i<elements.length; i++){
        elements[i].img = new Image;
        elements[i].img.src = elements[i].sprite;
        console.log(elements[i].img);
    }
}

imgInit();

function draw(){
    for(i = 0; i<elements.length; i++){
        var curElement = elements[i];
        ctx.drawImage(curElement.img,curElement.position.x,curElement.position.y,
            curElement.size.x,curElement.size.y);
    }
}


function loop(timestamp) {
    // game loop
    var progress = timestamp - lastRender;
    update();
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);
