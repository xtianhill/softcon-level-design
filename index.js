(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Element = require('./element.js');
//data: point location, int health, bool status
//function void dechealth

/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

/*Character Prototype
Note: location is a vector with x and y*/

function Character(loc, max, hea, stat, hbox, url, size){
    Element.call(this, loc, url, size, hbox);
    this.maxHealth = max; //maximum health
	this.health=hea; //int health
	this.status=stat; //true for alive, false for dead
}

Character.prototype = Object.create(Element.prototype);

//empty constructor
Character.prototype.Character = function(){
    //create character with loc = (0,0), maxhealth = 10
    // health = 10, status = 1
}

/* Example for how to create a function for a prototype. this is the javascript version
 of creating a method within a class*/
//decrement health function
Character.prototype.decHealth = function(amount){
 	//decrement health by amount
}

//getters and setters
Character.prototype.getLocation = function(){
    //get location
}

Character.prototype.setLocation = function(x, y){
    //set location to (x,y)
}

Character.prototype.getMaxHealth = function(){
    //get maximum health
}

Character.prototype.setMaxHealth = function(amount){
    //set maximum health to amount
}

Character.prototype.getHealth = function(){
    //get current health
}

Character.prototype.setHealth = function(amount){
    //set current health to amount
}

Character.prototype.getStatus = function(){
    //get status
}

Character.prototype.setStatus = function(s){
    //set status to s
}



module.exports = Character;
},{"./element.js":2}],2:[function(require,module,exports){
const Vector = require('./utility.js').vector;

/*Element prototype */
/*note: pos, scl, hitbox are vectors with x and y values */

function Element(pos, url, sz, hbox){
	this.position = pos; 
	this.sprite = url; //url to image file
	this.size = sz; //scale to resize image dimensions
	this.hitbox = hbox;
}

Element.prototype.getPosition = function(){
	return this.position;
}

Element.prototype.setPosition = function(pos){
	this.position = pos;
}

Element.prototype.getSprite = function(){
	return this.sprite;
}

Element.prototype.setSprite = function(url){
	this.sprite = url;
}

Element.prototype.getScale = function(){
	return this.scale;
}

Element.prototype.setScale = function(scale){
	this.scale = scale;
}

Element.prototype.getHitbox = function(){
	return this.hitbox;
}

Element.prototype.setHitbox = function(hitbox){
	this.hitbox = hitbox;
}

module.exports = Element;
},{"./utility.js":9}],3:[function(require,module,exports){
/*Enemy Prototype
Note: location is a vector with x and y*/
const Character = require('./character.js');

function Enemy(loc, max, hea, stat, dmg, hbox){
    Character.call(this, loc, max, hea, stat, hbox);
    this.damage = dmg;
}

Enemy.prototype = Object.create(Character.prototype);

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
    Character.call(this, vector(0,0), 10, 10, 1, /*generic hitbox*/);
    this.damage = 1;
}  

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
    return this.damage;
}

//set int damage and return 1. returns 0 if amount isn't an int.
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
    this.damage = amount;
}


module.exports = Enemy;
},{"./character.js":1}],4:[function(require,module,exports){
/* basic engine prototype */
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js').vector;
var gravity = .5;
var curSpeed = 0;


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

var icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToe-PSAektDgBsXLsdybQW6F1wGDdpw2mbm3SaReRPuQ0ec0ns";
var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
var elements =
    [ new Player(new Vector(0,0), 10, 10, true, 'item', new Vector(50,50), icon2, new Vector(50,50))
    , new NPC(new Vector(100,100), 10, 10, true, "y tho", new Vector(50,50), icon, new Vector(50,50))
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

    //

    for(i=1; i<elements.length; i++){

        if(detectCollision(pc, elements[i]))
        {
            //if npc, show message
            if(elements[i] instanceof NPC){
               //elements[i].displayMessage();
               console.log(elements[i].getMessage());
                ctx.font = "12px Arial";
                ctx.fillText(elements[i].getMessage(), 0, 0);
                elements[i].shouldDisplay = true;
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
    if ((element1.position.x < element2.position.x + element2.size.x)  && (element1.position.x + element1.size.x  > element2.position.x) &&
		element1.position.y < element2.position.y + element2.size.y && element1.position.y + element1.size.y > element2.position.y) {
            console.log('hello');
        return true;
    }
    return false;
}



function keyDownHandler(event) {
    console.log(event);
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
    ctx.clearRect(0, 0, width, height);
    for(i = 0; i<elements.length; i++){
        var curElement = elements[i];
        if (curElement.shouldDisplay){
            ctx.font = "12px Arial";
            ctx.fillText(curElement.getMessage(), 10, 10);
            curElement.shouldDisplay = false;
        }
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
},{"./character.js":1,"./element.js":2,"./enemy.js":3,"./environment.js":5,"./item.js":6,"./npc.js":7,"./player.js":8,"./utility.js":9}],5:[function(require,module,exports){
/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox){
    Element.call(this, pos, url, scale, hbox);
    this.solid = solid;
}

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.getSolid = function(){
}

Environment.prototype.setSolid = function(){

}

module.exports = Environment;
},{"./element.js":2}],6:[function(require,module,exports){
/* Item Prototype */
function Item(collected, effect){
    this.collected = collected;
    this.effect = effect;
}

Item.prototype.Item = function(){  

};

Item.prototype.setEffect= function(efct){

};

Item.prototype.getEffect=function(){

};

Item.prototype.getCollected= function(){
    
};

Item.prototype.setCollected= function(){

};

module.exports = Item;
},{}],7:[function(require,module,exports){
const Character = require('./character.js');

function NPC(loc, max, hea, stat, msg, hbox, url, size){
    Character.call(this, loc, max, hea, stat, hbox, url, size);
    this.message = msg;
}

NPC.prototype = Object.create(Character.prototype);

//empty constructor
NPC.prototype.NPC = function(){
    //create an NPC with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, and no message
    Character.call(this, vector(0,0), 10, 10, 1, /*generic hitbox*/);
    this.message = "";
}  


NPC.prototype.getMessage = function(){
    return this.message;
}

NPC.prototype.setMessage = function(msg){
    this.message = msg;
}  


// NPC.prototype.displayMessage = function(){
//     //print message to the screen, return 1 on success or 0 if message is empty
//     if(this.message == null || this.message == ''){
//         return 0;
//     }
//     out = canvas.getContext("2d");
//     out.font = "12px Arial";
//     out.fillText(this.message, 650, 100)
    
//     return 1;
// }  


module.exports = NPC;
},{"./character.js":1}],8:[function(require,module,exports){
/*Player Prototype
Note: location is a vector with x and y*/
const Character = require('./character.js');

function Player(loc, max, hea, stat, itm, hbox, url, size){
    Character.call(this, loc, max, hea, stat, hbox, url, size);
    this.ownedItem = itm;
}

Player.prototype = Object.create(Character.prototype);

//empty constructor. void
Player.prototype.Player = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, item = null

    Character.call(this, vector(0,0), 10, 10, 1, /*generic hitbox*/);
    this.ownedItem = null;
}  

//gets OwnedItem. 
Player.prototype.getOwnedItem= function(){
    //return owned item
    return this.ownedItem;
}

//set owned item and return 1. return 0 for non-item input.
Player.prototype.setOwnedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
    if(itm instanceof item){
        this.ownedItem = itm;
        itm.collected = true;
        return 1;
    }
    else return 0;
}

Player.prototype.useItem = function(){
    // if have an item, use its effect on whatever
}

Player.prototype.moveLeft = function(){
    currX= this.getLocation().x;
    currY= this.getLocation().y;
    this.setLocation(vector(x-.1,y));

}

Player.prototype.moveRight = function(){
    currX= this.getLocation().x;
    currY= this.getLocation().y;
    this.setLocation(vector(x+.1,y));
}

module.exports = Player;

},{"./character.js":1}],9:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

module.exports.vector = Vector;
},{}]},{},[4]);
