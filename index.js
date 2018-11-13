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


NPC.prototype.displayMessage = function(){
    //print message to the screen, return 1 on success or 0 if message is empty
    if(this.message == null || this.message == ''){
        return 0;
    }
    window.alert(this.message);
    return 1;
}  


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
