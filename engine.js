/* basic engine prototype */
const npc = require('./npc.js');
const enemy = require('./enemy.js');
const player = require('./player.js');
const item = require('./item.js');
const element = require('./element.js');
const Character = require('./character.js');
const envoronment = require('./environment.js');

gravity= -.5;

function Engine(grid){
    this.grid = grid;
}

function setGrid(grid){
    this.grid = grid;
}

function getGrid(){
    return this.grid;
}

//character, loop thru elements (character, object)
function update(progress) {

    // use progress to ensure smooth animations
//     // udpate any elements in level since last render
//     // need to deal with effects, collision detection, etc etc

//Hayley: I'm assuming that were isolating the player character: they're called pc here

pc = this.grid.elements[0];
for(i=1; i<elements.length; i++){

    if(detectCollision(pc, elements[i]))
    {
        //if npc, show message
        if(elements[i] instanceof npc){
            elements[i].displayMessage();
        }
        
        //if enemy, either damage w/item or lose health
        if(elements[i] instanceof enemy){
            if(pc.getOwnedItem().getEffect() == "damage"){
                elements[i].decHealth(1);
            } else{
                pc.decHealth(elements[i].getDamage());
            }
           
        }

        //if item, pick up and remove from elements
        if(elements[i] instanceof item){
            pc.setOwnedItem= elements[i];
            elements.splice(i,1);
        }

        //if environment, set gravity to 0? then have falling occur later?
        if(elements[i] instanceof environment){
            gravity=0;
        }
    }


}

function detectCollision(element1, element2) {
    // does element1 hit element2? return true if yes
}

var canvas = document.getElementById("c");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "red";

function draw(increase){
    ctx.rect(20+increase,20,150,100);
    ctx.stroke();
}
var increase = 0;
function loop(timestamp) {
    // game loop
    var progress = timestamp - lastRender;
    //update(progress);
    draw(increase);
    increase = increase+1;
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);