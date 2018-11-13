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
    [ new Player(new Vector(100,100), 10, 10, true, 'item', new Vector(50,50), icon2, new Vector(50,50))
    , new NPC(new Vector(0,0), 10, 10, true, "hello", new Vector(50,50), icon, new Vector(50,50))
    ];

// query database and get level info, then translate into list of elements


//character, loop thru elements (character, object)
function update(progress) {

//Hayley: I'm assuming that were isolating the player character: they're called pc here

    var pc = elements[0];
    for(i=1; i<elements.length; i++){

        if(detectCollision(pc, elements[i]))
        {
            //if npc, show message
            if(elements[i] instanceof NPC){
                elements[i].displayMessage();
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
    if (element1.hitbox.x < element2.hitbox.x + element2.width  && element1.hitbox.x + element1.width  > element2.hitbox.x &&
		element1.hitbox.y < element2.hitbox.y + element2.height && element1.hitbox.y + element1.height > element2.hitbox.y) {
        return true;
    }
    return false;
}

var canvas = document.getElementById("c");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

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
    //update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);