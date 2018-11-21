(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.engine = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Character Class
|------------------------------------------------------------------------------
|
| This file contains the Character prototype (the javascript equivalent of a
| class). Character is the super of Player, NPC, and Enemy. It contains data
| about character status (e.g. health, speed), as well as methods for moving
| and interacting with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Element = require('./element.js');
const Vector = require('./utility.js');

function Character(loc, max, hea, stat, hbox, url, size, spd, mvspd, grav){

    if((spd instanceof Vector) && (typeof mvspd === "number") &&
      (typeof grav === "number")&&  (typeof stat === "boolean") &&
      (typeof max === "number") && (typeof hea ==="number")){
        Element.call(this, loc, url, size, hbox);
        this.maxHealth = max; //maximum health
	      this.health=hea; //int health
	      this.status =stat; //true for alive, false for dead
        this.speed = spd; //for moving
        this.moveSpeed = mvspd; //tells how fast it moves
        this.gravity = grav;
    }
    else return {};
}

Character.prototype = Object.create(Element.prototype);

/*
|--------------------------------------------------------------------------
| Getter and setter functions for the Character prototype (the javascript
| version of class methods).
|--------------------------------------------------------------------------
*/

// Getter for position
Character.prototype.getPosition = function(){
	return this.position;
}

// Setter for position
Character.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

// Getter for maxHealth
Character.prototype.getMaxHealth = function(){
    return this.maxHealth;
}

// Setter for maxHealth
Character.prototype.setMaxHealth = function(amount){
    if(typeof amount === "number"){
        this.maxHealth = amount;
    }
}

// Getter for health
Character.prototype.getHealth = function(){
    return this.health;
}

// Setter for health
Character.prototype.setHealth = function(amount){
    if(typeof amount === "number"){
        this.health= amount;
    }
}

// Getter for status
Character.prototype.getStatus = function(){
    return this.status;
}

// Setter for status
Character.prototype.setStatus = function(s){
    if(typeof s === 'boolean'){
        this.status = s;
    }
}

// Getter for speed
Character.prototype.getSpeed = function(){
    return this.speed;
}

// Setter for speed
Character.prototype.setSpeed = function(spd){
    if(spd instanceof Vector){
        this.speed =spd;
    }
}

// Getter for movementSpeed
Character.prototype.getMovementSpeed = function() {
    return this.moveSpeed;
}

// Setter for movementSpeed
Character.prototype.setMovementSpeed = function(ms){
    if(typeof ms === "number"){
        this.moveSpeed = ms;
    }
}

// Getter for gravity
Character.prototype.getGravity = function () {
    return this.gravity;
}

// Setter for gravity
Character.prototype.setGravity = function(g) {
    if(typeof g === "number"){
        this.gravity = g;
    }
}

/*
|--------------------------------------------------------------------------
| Movement-related functions for the Character prototype, wherein much of
| the physics calculations are performed.
|--------------------------------------------------------------------------
*/

// Calculates the hypothetical next x position of a Character given a direction
// in which the character is trying to move.
Character.prototype.newXPos = function(step, dir) {
  this.speed.x = 0
  if (dir == "right") this.speed.x = this.moveSpeed;
  if (dir == "left")  this.speed.x -= this.moveSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next x position of a Character is legal, and if so,
// updates its position.
Character.prototype.moveX = function(newPos, obstacle) {
  if(obstacle != null) {
      if(obstacle.getSolid() == 0){
          this.position = newPos;
        }
   }
   else{
       this.position = newPos;
     }
}

// Calculates the hypothetical next y position of a character based on gravity
Character.prototype.newYPos = function(step) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next y position of a Character is legal, and if so,
// updates its position; if it hits the ground stops its motion; if it is on
// ground and jumps, updates its speed to allow the jump on the next game loop.
Character.prototype.moveY = function(newPos, obstacle, up) {
  var jumpSpeed = 70;
  if(obstacle != null) {
      if(obstacle.getSolid() == 1){
          newPos.x = this.position.x
          if (up && this.speed.y > 0){
              this.speed.y = -jumpSpeed;
          } else
              this.speed.y = 0;
      }
    } else
          this.position = newPos;
};

module.exports = Character;

},{"./element.js":2,"./utility.js":10}],2:[function(require,module,exports){
const Vector = require('./utility.js');

/*Element prototype */
/*note: pos, scl, hitbox are vectors with x and y values */

function Element(pos, url, sz, hbox){
	if(((pos instanceof Vector) && (typeof url === 'string')) && ((sz instanceof Vector) && (hbox instanceof Vector))){
		this.position = pos; 
		this.sprite = url; //url to image file
		this.size = sz; //scale to resize image dimensions
		this.hitbox = hbox;
	} else {
		return {};
	}
}

Element.prototype.getPosition = function(){
	return this.position;
}

Element.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

Element.prototype.getSprite = function(){
	return this.sprite;
}

Element.prototype.setSprite = function(url){
	if(typeof url === 'string'){
		this.sprite = url;
	}
}

Element.prototype.getSize = function(){
	return this.size;
}

Element.prototype.setSize = function(scl){
	if (scl instanceof Vector){
		this.size = scl;
	}
}

Element.prototype.getHitbox = function(){
	return this.hitbox;
}

Element.prototype.setHitbox = function(hbx){
	if(hbx instanceof Vector){
		this.hitbox = hbx;
	}
}

module.exports = Element;
},{"./utility.js":10}],3:[function(require,module,exports){
/*Enemy Prototype
Note: location is a vector with x and y*/
const Character = require('./character.js');

function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav){
    t = typeof dmg
    if (t === "number") {
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
        this.damage = dmg;
    }
    else {
        return {}
    }
}

Enemy.prototype = Object.create(Character.prototype);

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
    Character.call(this, vector(0,0), 10, 10, 1, new vector(50,50), null, new vector(50,50));
    this.damage = 1;
}  

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
    return this.damage;
}

//set int damage
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
        t = typeof amount
        if (t === "number"){
            this.damage = amount;
        }
        else{
            return {}
        }
}

Enemy.prototype.decHealth = function(){
    // decrease an enemies health if attacked with damage effect
}
module.exports = Enemy;

},{"./character.js":1}],4:[function(require,module,exports){

/* Becase engine.js is a script that runs the game, and interacts directly with the html, 
the functions that needed to be unit tested are included here and then exposed */

/* basic engine prototype */
const JSONtoElements = require('./parsing.js');
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');

var gameState;

// GAME STATE

function update(gameState) {
    // move right or left as long as no wall is in the way
    newXPos = null;
    if (gameState.rightPressed){
        newXPos = gameState.pc.newXPos(gameState.step, "right");
        if(newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
           || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
           newXPos = null;
    }
    else if (gameState.leftPressed){
        newXPos = gameState.pc.newXPos(gameState.step, "left");
        if(newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
           || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
           newXPos = null;
    }
    
    // find things that collide if moving left-right
    xObstacle = null;
    if(newXPos != null){
        for(i=0; i<gameState.elements.length; i++){
            if(detectCollision(newXPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])){
                if(gameState.elements[i] instanceof Environment)
                    xObstacle = gameState.elements[i];
                else
                    onCollision(gameState, i);
            }
        }
        
    gameState.pc.moveX(newXPos, xObstacle);
    }
    
    // find collisions if trying to jump or landing on something
    newYPos = gameState.pc.newYPos(gameState.step);
    if(newYPos.y + (0.5 * gameState.pc.size.y) - (0.5 * gameState.pc.hitbox.y) < 0)
        newYPos = null;
    else if(newYPos.y + (0.5 * gameState.pc.size.y) + (0.5 * gameState.pc.hitbox.y) > gameState.height)
        newYPos = newYPos; //player.die()
    yObstacle = null;
    if(newYPos != null){
        for(i=0; i<gameState.elements.length; i++){
           if(detectCollision(newYPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])){
                if(gameState.elements[i] instanceof Environment)
                    yObstacle = gameState.elements[i];
                else
                    onCollision(gameState, i);
            }
        }
    }
    // jump or fall as long as no ground (or ceiling, hopefully) is in the way
    if (gameState.upPressed){
      if(gameState.pc.position.y-1 > 0){
        gameState.pc.moveY(newYPos, yObstacle, true);
    } 
    } else {
        gameState.pc.moveY(newYPos, yObstacle, false);
  }

  //physics for npcs and enemies
  for(i=0; i<gameState.elements.length; i++){
    if (gameState.elements[i] instanceof NPC || gameState.elements[i] instanceof Enemy) {
        yObstacle = null;
        for(j=0; j<gameState.elements.length; j++){
            newPos = gameState.elements[i].newYPos(gameState.step);
            if (i != j && detectCollision(newPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j])){
                yObstacle = gameState.elements[j];
            }
        }
        gameState.elements[i].moveY(newPos, yObstacle, false)
    }
}
}

function detectCollision(pos1, pos2, element1, element2) {
    box1 = element1.hitbox;
    size1 = element1.size;
    box2 = element2.hitbox;
    size2 = element2.size;
    if(pos1 == null || pos2 == null || box1 == null || box2 == null)
        return false;
    left1 = pos1.x + (0.5 * size1.x) - (0.5 * box1.x);
    right1 = pos1.x + (0.5 * size1.x) + (0.5 * box1.x);
    top1 = pos1.y + (0.5 * size1.y) - (0.5 * box1.y);
    bottom1 = pos1.y + (0.5 * size1.y) + (0.5 * box1.y);
    left2 = pos2.x + (0.5 * size2.x) - (0.5 * box2.x);
    right2 = pos2.x + (0.5 * size2.x) + (0.5 * box2.x);
    top2 = pos2.y + (0.5 * size2.y) - (0.5 * box2.y);
    bottom2 = pos2.y + (0.5 * size2.y) + (0.5 * box2.y);
    if (right1 > left2 && //right edge of self, left edge of other
        left1 < right2 && //left edge of self, right edge of other
        bottom1 > top2 && //bottom edge of self, top edge of other
        top1 < bottom2)   //top edge of self, bottom edge of other
        return true;
    return false;
}

function onCollision(gameState, i) {
	    //if npc, show message
            if(gameState.elements[i] instanceof NPC){
               //elements[i].displayMessage();
               gameState.ctx.font = "12px Arial";
               gameState.ctx.fillText(gameState.elements[i].getMessage(), 0, 0);
               gameState.elements[i].shouldDisplay = true;
            }

            //if enemy, either damage w/item or lose health
            if(gameState.elements[i] instanceof Enemy){
                if(gameState.pc.equippedItem != 0) {
                    if(gameState.pc.equippedItem.getEffect() == "damage"){
                        gameState.elements[i].decHealth(1);
                    } else{
                        gameState.pc.decHealth(elements[i].getDamage());
                    }
                }
            }

            //if item, pick up and remove from elements
       
            // if(elements[i] instanceof Item){
            //     if(!pc.getEquippedItem()){
            //         pc.setEquippedItem(elements[i]);
            //     }
            //     pc.inventory.push(elements[i]);
            //     elements.splice(i,1);
            // }
    }

function keyDownHandler(event, gameState) {
    if(event.keyCode == 68) {
        gameState.rightPressed = true;
    }
    if(event.keyCode == 65) {
        gameState.leftPressed = true;
    }
    if(event.keyCode == 83) {
    	gameState.downPressed = true;
    }
    if(event.keyCode == 87) {
    	gameState.upPressed = true;
    }
}

function keyUpHandler(event, gameState) {
    if(event.keyCode == 68) {
        gameState.rightPressed = false;
    }
    if(event.keyCode == 65) {
        gameState.leftPressed = false;
    }
    if(event.keyCode == 83) {
    	gameState.downPressed = false;
    }
    else if(event.keyCode == 87) {
    	gameState.upPressed = false;
    }
}

// need to create all the images given urls - this could/should happen within translation function
function imgInit(gameState){
    for(i = 0; i<gameState.elements.length; i++){
        gameState.elements[i].img = new Image;
        gameState.elements[i].img.src = elements[i].sprite;
    }
    var tmp = backgroundUrl;
    gameState.backgroundUrl = new Image;
    gameState.backgroundUrl.src = tmp;

    gameState.pc.img = new Image;
    gameState.pc.img.src = pc.sprite;
}

function draw(ctx, elements, pc, backgroundUrl){
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(backgroundUrl, 0,0);
    
    for(i = 0; i<elements.length; i++){
        var curElement = elements[i];
        if (curElement.shouldDisplay){
            ctx.font = "12px Arial";
            ctx.fillText(curElement.getMessage(), curElement.position.x, curElement.position.y-10);
            curElement.shouldDisplay = false;
        }
        ctx.drawImage(curElement.img,curElement.position.x,curElement.position.y,
            curElement.size.x,curElement.size.y);
    }
    ctx.drawImage(pc.img,pc.position.x,pc.position.y,
        pc.size.x,pc.size.y);
}

function showInventory(elements){
    var ul = document.getElementById('inventory');
    var inventory = elements[0].inventory;
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var listItem = document.createElement("li");
        listItem.textContent = '<img src="' + item.sprite + '" + />';

        ul.appendChild(listItem);
    }
}
function testWinConditions(gameState){
    // to be written
}

module.exports.showInventory = showInventory;
module.exports.draw = draw;
module.exports.imgInit = imgInit;
module.exports.keyUpHandler = keyUpHandler;
module.exports.keyDownHandler = keyDownHandler;
module.exports.onCollision = onCollision;
module.exports.detectCollision = detectCollision;
module.exports.testWinConditions = testWinConditions;
module.exports.update = update;

},{"./character.js":1,"./element.js":2,"./enemy.js":3,"./environment.js":5,"./item.js":6,"./npc.js":7,"./parsing.js":8,"./player.js":9,"./utility.js":10}],5:[function(require,module,exports){
/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox){
    Element.call(this, pos, url, scale, hbox);
    this.solid = solid;
}

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= true;
}

Environment.prototype.getSolid = function(){
    return this.solid;
}

Environment.prototype.setSolid = function(bool){
    this.solid = bool;
}

module.exports = Environment;
},{"./element.js":2}],6:[function(require,module,exports){
/* Item Prototype */

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');

function Item(pos, url, sz, hbox, col, eff){
    Element.call(this, pos, url, sz, hbox);
    this.collected = col;
    this.effect = eff;
}

Item.prototype.Item = function(){  
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
};

Item.prototype.setEffect= function(eft){
    this.effect = eft;
};

Item.prototype.getEffect=function(){
    return this.effect;
};

Item.prototype.getCollected= function(){
    return this.collected;
};

Item.prototype.setCollected= function(b){
    this.collected = b;
};

module.exports = Item;
},{"./element.js":2}],7:[function(require,module,exports){
const Character = require('./character.js');
const Vector = require('./utility.js').vector;

function NPC(loc, max, hea, stat, msg, hbox, url, size, speed, mvspd, grav){
    
    if(typeof msg === "string"){
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
        this.message = msg;
    }
    else return {};
}

NPC.prototype = Object.create(Character.prototype); 


NPC.prototype.getMessage = function(){
    return this.message;
    
}

NPC.prototype.setMessage = function(msg){
    //disallow non-string message
    if(typeof msg == "string"){
        this.message = msg;
        return;
    }   
    else 
        return null;
}



module.exports = NPC;

},{"./character.js":1,"./utility.js":10}],8:[function(require,module,exports){
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');

function JSONtoElements(data){
    var dataobj= JSON.parse(data);
    i=0;
    var elementarray= [];
    var backgroundurl=dataobj.backgroundImage;
        for (i=0; i<dataobj.objects.length; i++){
            var temp= dataobj.objects[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    element = new Environment(1,pos,url,sz,hitbox);
                }
                else if (temp.name == "Item"){
                    var col=0;
                    var eff="heal";
                    element = new Item(pos, url, sz, hitbox, col, eff);
                }
                else if (temp.name == "Player"){
                    var max = 10;
                    var hea = 10;
                    var stat = true;
                    var itm= 0;
                    var inv= [];
                    var hitbox = new Vector(19,50);
                    var spd = new Vector(0,0);
                    var mvspd = 60;
                    var grav = 40;
                    element = new Player(pos, max, hea, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 10;
                    var stat= true;
                    var msg = "hi there";
                    var spd = new Vector(0,0);
                    var mvspd = 30;
                    var grav = 50;
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "Enemy"){
                    var max = 10;
                    var hea= 10;
                    var stat = true;
                    var dmg= 1;
                    var spd = new Vector(0,0);
                    var mvspd = 40;
                    var grav = 3;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz, spd, mvspd, grav);
                }
                elementarray.push(element);
            }
        }
        return {"elements": elementarray,
                "backgroundUrl": backgroundurl };
    }
module.exports = JSONtoElements;
    
    
},{"./character.js":1,"./element.js":2,"./enemy.js":3,"./environment.js":5,"./item.js":6,"./npc.js":7,"./player.js":9,"./utility.js":10}],9:[function(require,module,exports){
/*Player Prototype
Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');
const Vector = require('./utility.js');

function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed, mvspd, grav){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.equippedItem = itm;
    this.inventory = inv;
}

Player.prototype = Object.create(Character.prototype);

//empty constructor. void
Player.prototype.Player = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, item = null, size 50x50, speed 10x10

    Character.call(this, vector(0,0), 10, 10, 1, vector(50,50), vector(33,13));
    this.equippedItem = null;
    this.inventory = [];
}  

Player.prototype.getInventory= function(){
    return this.inventory;
}

Player.prototype.setInventory = function(arr)
{
    this.inventory = arr;
}

//gets OwnedItem. 
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//set owned item and return 1. return 0 for non-item input
Player.prototype.setEquippedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
    if(itm instanceof Item){
        this.inventory.push(this.equippedItem);
        this.equippedItem = itm;
        itm.collected = true;
    }
}

Player.prototype.useItem = function(){
    if((this.equippedItem.getEffect())["effect"] == "heal"){
        this.health = this.maxHealth;
        this.equippedItem= null;
    }
    else if ((this.equippedItem.getEffect())["effect"] == "damage"){ 
        //swing sword or whatever
    }
    else {
        this.equippedItem.getEffect().activate();
    }
}

Player.prototype.pickUpItem = function(){
    // to be called when player collides with item
}

module.exports = Player;

},{"./character.js":1,"./item.js":6,"./utility.js":10}],10:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

module.exports = Vector;
},{}],11:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Engine
|------------------------------------------------------------------------------
|
| This file contains tests for the Engine. Since the engine file is a script
| that interats directly with the browser, this file tests the exposed functions
| on engine-test-class. 
|------------------------------------------------------------------------------
*/

const keyUpHandler = require('../static/engine-test-class.js').keyUpHandler;
const keyDownHandler = require('../static/engine-test-class.js').keyDownHandler;
const onCollision = require('../static/engine-test-class.js').onCollision;
const detectCollision = require('../static/engine-test-class.js').detectCollision;
const testWinConditions = require('../static/engine-test-class.js').testWinConditions;

const Player = require('../static/player.js');
const Item = require('../static/item.js');
const Enemy = require('../static/enemy.js');
const NPC = require('../static/npc.js');
const Vector = require('../static/utility.js');

describe('Engine Tests', function(){

    let gameState, testItem;

    beforeEach(function(){
        var vec = new Vector(5,5);
        testItem = new Item('pos', 'testingUrl', 'sz', 'hbox', 'col', 'damage');
        testItem2 = new Item('pos', 'secondTestingUrl', 'sz', 'hbox', 'col', 'damage');
        var elements = [new Player(vec, 0, 0, true, testItem2, [testItem, testItem2], vec, 'p_url', vec, vec, 0, 0),
            new Enemy(new Vector(20,20), 0, 0, true, 10, vec, 'e_url', vec, vec, 0, 0),
            new NPC(vec, 0, 0, true, 'message!', vec, 'n_url', vec, vec, 0, 0),
            testItem];

        gameState = { canvas: 'canvas'
                    , width: 500
                    , height: 500
                    , ctx: {fillText: function(){}}
                    , rightPressed: false
                    , leftPressed: false
                    , downPressed: false
                    , upPressed: false
                    , elements: elements
                    , pc: elements[0]
                    , step: .05
                    , backgroundUrl: 'backgroundUrl'
                    , winConditions: [false, false, false, false]
                    , gameOver: false
                };
        gameState.elements[2].hasBeenTalkedTo = false;

    });

    /*
    |--------------------------------------------------------------------------
    | Key Handler Tests
    |--------------------------------------------------------------------------
    */

    it('should set correct direction for key presses', function(){
        // key presses
        var event = {keyCode: 68};
        keyDownHandler(event, gameState);
        expect(gameState.rightPressed).toBeTruthy();
        event.keyCode = 83;
        keyDownHandler(event, gameState);
        expect(gameState.downPressed).toBeTruthy();
        event.keyCode = 87;
        keyDownHandler(event, gameState);
        expect(gameState.upPressed).toBeTruthy();
        event.keyCode = 65;
        keyDownHandler(event, gameState);
        expect(gameState.leftPressed).toBeTruthy();

        // key unpresses
        event.keyCode = 68;
        keyUpHandler(event, gameState);
        expect(gameState.rightPressed).toBeFalsy();
        event.keyCode = 83;
        keyUpHandler(event, gameState);
        expect(gameState.downPressed).toBeFalsy();
        event.keyCode = 87;
        keyUpHandler(event, gameState);
        expect(gameState.upPressed).toBeFalsy();
        event.keyCode = 65;
        keyUpHandler(event, gameState);
        expect(gameState.leftPressed).toBeFalsy();
    });

    /*
    |--------------------------------------------------------------------------
    | Collision Detection Tests
    |--------------------------------------------------------------------------
    */

    it('should return true if there is a collision', function(){
        expect(detectCollision(gameState.elements[0].position, 
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();
        
        gameState.elements[2].position = new Vector(2,2);
        expect(detectCollision(gameState.elements[0].position, 
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();

        gameState.elements[2].position = new Vector(1,2);  
        expect(detectCollision(gameState.elements[0].position, 
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();

        gameState.elements[2].position = new Vector(2,1);
        expect(detectCollision(gameState.elements[0].position, 
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();
    });

    it('should return false if there isnt a collision', function(){
        expect(detectCollision(gameState.elements[0].position, 
            gameState.elements[1].position,gameState.elements[0],gameState.elements[1])).toBeFalsy();
        gameState.elements[1].position = new Vector(6,0);
        expect(detectCollision(gameState.elements[0].position, 
            gameState.elements[1].position,gameState.elements[0],gameState.elements[1])).toBeFalsy();
        gameState.elements[1].position = new Vector(0,6);
        expect(detectCollision(gameState.elements[0].position, 
            gameState.elements[1].position,gameState.elements[0],gameState.elements[1])).toBeFalsy();

    });

    /*
    |--------------------------------------------------------------------------
    | Element Interaction (onCollision) Tests (iteration 2)
    |--------------------------------------------------------------------------
    */

    it('should make player call pickUpItem when colliding with item', function(){
        onCollision(gameState, 3);
        spyOn(gameState.elements[0], 'pickUpItem');
        expect(gameState.elements[0].pickUpItem).toHaveBeenCalled();

    });

    it('should decrease enemies health when attacked', function(){
        onCollision(gameState, 1);
        
        spyOn(gameState.elements[1], 'decHealth');
        expect(gameState.elements[1].decHealth).toHaveBeenCalled();
    });

    it('should call display message if collision with npc', function(){
        onCollision(gameState, 2);
        expect(gameState.elements[2].hasBeenTalkedTo).toBeTruthy();
    });

    /*
    |--------------------------------------------------------------------------
    | Win Condition Tests (iteration 2)
    |--------------------------------------------------------------------------
    */

    it('should set npc condition to true if all npcs have displayed message', function(){
        testWinConditions(gameState);
        expect(gameState.winConditions[0]).toBeTruthy();
    });

    it('should set enemy condition to true if all enemies are dead', function(){
        gameState.elements[1].setStatus(false);
        testWinConditions(gameState);
        expect(gameState.winConditions[1]).toBeTruthy();
    });

    it('should set item condition to true if all items picked up', function(){
        gameState.elements[0].pickUpItem(gameState.elements[3]);
        testWinConditions(gameState);
        expect(gameState.winConditions[2]).toBeTruthy();
    });

    it('should set distance condition to true if you reach end of level', function(){
        gameState.elements[0].pos = new Vector(30,30);
        gameState.endPoint = new Vector(30,30);
        testWinConditions(gameState);
        expect(gameState.winConditions[3]).toBeTruthy();
    });

    it('should end game when all conditions met', function(){
        gameState.winConditions = [true, true, true, true];
        testWinConditions(gameState);
        expect(gameState.gameOver).toBeTruthy();
    });


});
},{"../static/enemy.js":3,"../static/engine-test-class.js":4,"../static/item.js":6,"../static/npc.js":7,"../static/player.js":9,"../static/utility.js":10}]},{},[11])(11)
});
