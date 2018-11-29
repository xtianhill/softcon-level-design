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

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/

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
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
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
|------------------------------------------------------------------------------
| Movement-related functions for the Character prototype, wherein much of
| the physics calculations are performed.
|------------------------------------------------------------------------------
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
    if (this.status) {
        if (obstacle != null) {
            if (obstacle.getSolid() == 0) {
                this.position = newPos;
            }
        }
        else {
            this.position = newPos;
        }
    }
}

// Calculates the hypothetical next y position of a character based on gravity
Character.prototype.newYPos = function(step) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * 2 * step);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next y position of a Character is legal, and if so,
// updates its position; if it hits the ground stops its motion; if it is on
// ground and jumps, updates its speed to allow the jump on the next game loop.
Character.prototype.moveY = function(newPos, obstacle, up) {
    var jumpSpeed = 70;
    if (this.status) {
        if (obstacle != null) {
            if (obstacle.getSolid() == 1) {
                newPos.x = this.position.x
                if (up && this.speed.y > 0) {
                    this.speed.y = -jumpSpeed;
                } else
                    this.speed.y = 0;
            }
        } else
            this.position = newPos;
    }
};

Character.prototype.decHealth = function(damage){
    this.health -= damage;
    if(this.health <= 0){
        this.status = false;
    }
}

Character.prototype.addHealth = function(amount){
    this.health += amount;
    if(this.health > this.maxHealth){
        this.health = this.maxHealth;
    }
}

module.exports = Character;

},{"./element.js":3,"./utility.js":11}],2:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Effect Class
|------------------------------------------------------------------------------
|
| This file contains the Effect prototype (the javascript equivalent of a
| class). Effect is used by Environment and Item. It contains data
| about how an Effect affects the game (e.g. restores health), as well as
| methods for activating or changing an Effect.
|
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Constructors
|------------------------------------------------------------------------------
*/

function Effect(title, amount){
    if (title == 'heal' || title == 'damage'){
    this.effect = title;
    this.isActive = false;
    this.amount = amount;
  }
  else{
    return {};
  }
}

// Effect.prototype.Effect = function(bool, title){
//     if (title == 'heal' || title == 'damage'){
//     this.isActive = bool;
//     this.effect = title;
//   }
//   else{
//     return {};
//   }
// }

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/

// Getter for isActive
Effect.prototype.getIsActive = function(){
    return this.isActive;
}

// Setter for Effect type
Effect.prototype.setEffect = function(effect){
    this.effect = effect;
}

// Getter for  Effect type
Effect.prototype.getEffect = function(){
    return this.effect;
}

// Setter for isActive
Effect.prototype.activate = function(){
    this.isActive = true;
}

// Setter for isActive
Effect.prototype.deactivate = function(){
    this.isActive = false;
}

// Getter for amount
Effect.prototype.getAmount = function(){
    return this.amount;
}

// Setter for amount
Effect.prototype.setAmount = function(num){
    this.amount = num;
}

module.exports = Effect;

},{}],3:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Element Class
|------------------------------------------------------------------------------
|
| This file contains the Element prototype (the javascript equivalent of a
| class). Element has getters and setters for its position, sprite, size, and hitbox.
|
|------------------------------------------------------------------------------
*/

const Vector = require('./utility.js');

/*note: pos, scl, hitbox are vectors with x and y values */

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
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

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/
//Getter for position
Element.prototype.getPosition = function(){
	return this.position;
}

//Setter for position
Element.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

//Getter for sprite
Element.prototype.getSprite = function(){
	return this.sprite;
}

//Setter for sprite
Element.prototype.setSprite = function(url){
	if(typeof url === 'string'){
		this.sprite = url;
	}
}

//Getter for size
Element.prototype.getSize = function(){
	return this.size;
}

//Setter for size
Element.prototype.setSize = function(scl){
	if (scl instanceof Vector){
		this.size = scl;
	}
}

//Getter for Hitbox
Element.prototype.getHitbox = function(){
	return this.hitbox;
}

//Setter for Hitbox
Element.prototype.setHitbox = function(hbx){
	if(hbx instanceof Vector){
		this.hitbox = hbx;
	}
}

module.exports = Element;
},{"./utility.js":11}],4:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Enemy Class
|------------------------------------------------------------------------------
|
| This file contains the Enemy prototype (the javascript equivalent of a
| class). Enemy is a subclass of the superclass Character. This contains
| data about an Enemy's status, as well as methods for moving and interacting
| with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Character = require('./character.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav, dir, range, startLoc){
    t = typeof dmg
    t2 = typeof range
    if (t === "number" && (dir === "right" || dir === "left" || dir === "still")) {
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
        this.damage = dmg;
        this.direction = dir;
        this.range = range;
        this.startPos = startLoc;
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
    this.direction = "left";
    this.shouldFall = 1;
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
            return null;
        }
}

//Getter for range
Enemy.prototype.getRange = function(){
    return this.range;
}

//Setter for range
Enemy.prototype.setRange = function(rng){
    this.range = rng;
}

//Getter for direction
Enemy.prototype.getDirection = function(){
    return this.direction;
}

//Changes direction
Enemy.prototype.changeDirection = function(){
    if(this.direction == "right")
        this.direction = "left";
    else if(this.direction == "left")
        this.direction = "right";
}

//Setter for direction
Enemy.prototype.setDirection = function(dir){
    //set damage to amount
        if (dir == "right" || dir == "left" || dir == "still"){
            this.direction = dir;
        }
        else{
            return null;
        }
}

module.exports = Enemy;

},{"./character.js":1}],5:[function(require,module,exports){
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

/*
|------------------------------------------------------------------------------
| Initialize gameState, canvas, and other variables from JSON
|------------------------------------------------------------------------------
*/

var gameState;

function initialize(){
    var step = 0.05; // controls frequency of physics calculations
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");
    document.addEventListener('keydown', function(e) {keyDownHandler(e, gameState)}, false);
    document.addEventListener('keyup', function(e) {keyUpHandler(e, gameState)}, false);
    var rightPressed = false;
    var leftPressed = false;
    var downPressed = false;
    var upPressed = false;
    var itemUsed = false;
    var changeItem = false;
    var data = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Player","top":350,"left":100,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1},{"type":"Element","name":"Item","top":100,"left":400,"url":"https://vivalasarepas.com/wp-content/uploads/2017/02/sprite.jpg","scale":1},{"type":"Element","name":"Item","top":200,"left":500,"url":"https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Enemy","top":350,"left":300,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"NPC","top":250,"left":500,"url":"https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Enemy","top":350,"left":650,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":300,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"button"}],"background":"","backgroundImage":"https://cdn.cgmagonline.com/wp-content/uploads/2015/07/pixelartheader.jpg","backgroundImageOpacity":1,"backgroundImageStretch":true}';

    // query database and get level info, then translate into list of elements
    var parsedJSON = JSONtoElements(data);
    var elements = parsedJSON.elements;
    var characters = [];
    var backgroundUrl = parsedJSON.backgroundUrl;
    var width = canvas.width;
    var height = canvas.height;
    var wrap = document.getElementById("wrap");

    // identify the pc
    var pc;
    for(i=0; i<elements.length; i++){
        if(elements[i] instanceof Player){
            pc = elements[i];
            elements.splice(i,1);
        }
    }

    // identify the characters
    for(i=0; i<elements.length; i++){
        if(elements[i] instanceof Character){
            characters.push(elements[i]);
        }
    }

    // set the font style for in game messages
    ctx.font = "12px Arial";
    ctx.fillStyle = "#ffffff";

    // set the initial game state
    gameState = { canvas: canvas
        , width: width
        , height: height
        , ctx: ctx
        , rightPressed: rightPressed
        , leftPressed: leftPressed
        , downPressed: downPressed
        , upPressed: upPressed
        , itemUsed: itemUsed
        , changeItem: changeItem
        , elements: elements
        , wrap: wrap
        , pc: pc
        , characters: characters
        , step: step
        , backgroundUrl: backgroundUrl};

    showInventory(gameState);
}

/*
|------------------------------------------------------------------------------
| Update internal gamestate: physics and item interactions
|------------------------------------------------------------------------------
*/

function update(gameState) {

    // find hypothetical new right/left position as long as within the level's
    // limits and no wall is in the way
    newXPos = null;
    if (gameState.rightPressed) {
        newXPos = gameState.pc.newXPos(gameState.step, "right");
        if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
            || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
            newXPos = null;
    }
    else if (gameState.leftPressed) {
        newXPos = gameState.pc.newXPos(gameState.step, "left");
        if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
            || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
            newXPos = null;
    }

    // find collisions based on hypothetical new x-position, move if legal
    xObstacle = null;
    if (newXPos != null) {
        for (i = 0; i < gameState.elements.length; i++) {
            if (detectCollision(newXPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                if (gameState.elements[i] instanceof Environment)
                    xObstacle = gameState.elements[i];
                onCollision(gameState, i);
            }
        }
        gameState.pc.moveX(newXPos, xObstacle);
    }

    // find hypothetical new up/down position as long as within the level's
    // limits and no platform is in the way
    newYPos = gameState.pc.newYPos(gameState.step);
    if (newYPos.y + (0.5 * gameState.pc.size.y) - (0.5 * gameState.pc.hitbox.y) < 0)
        newYPos = null;
    else if (newYPos.y + (0.5 * gameState.pc.size.y) + (0.5 * gameState.pc.hitbox.y) > gameState.height)
        gameState.pc.status = false;

    // find collisions based on hypothetical new y-position, jump or fall if legal
    yObstacle = null;
    if (newYPos != null) {
        for (i = 0; i < gameState.elements.length; i++) {
            if (detectCollision(newYPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                if (gameState.elements[i] instanceof Environment)
                    yObstacle = gameState.elements[i];
                onCollision(gameState, i);
            }
        }
    if (gameState.upPressed) {
        if (gameState.pc.position.y - 1 > 0) {
            gameState.pc.moveY(newYPos, yObstacle, true);
        }
    } else {
        gameState.pc.moveY(newYPos, yObstacle, false);
    }
  }

    // physics for npcs and enemies: both can fall, enemies may walk back and forth
    for (i = 0; i < gameState.elements.length; i++) {
        if (gameState.elements[i] instanceof Item && gameState.elements[i].hovering == true) {
            gameState.elements[i].hover(gameState.step);
        }
        else if (gameState.elements[i] instanceof NPC || gameState.elements[i] instanceof Enemy) {
            newYPos = gameState.elements[i].newYPos(gameState.step);
            yObstacle = null;
            for (j = 0; j < gameState.elements.length; j++) {
                if (i != j && detectCollision(newYPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j])) {
                    yObstacle = gameState.elements[j];
                }
            }
            gameState.elements[i].moveY(newYPos, yObstacle, false);
            if(!gameState.elements[i].status){
                gameState.elements.splice(i,1);
                break;
            }
        }
        if (gameState.elements[i] instanceof Enemy) {
            newXPos = gameState.elements[i].newXPos(gameState.step, gameState.elements[i].direction);
            for (j = 0; j < gameState.elements.length; j++) {
                xObstacle = null;
                if (i != j && detectCollision(newXPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j]))
                    if (gameState.elements[j] instanceof Environment) {
                        xObstacle = gameState.elements[j];
                        gameState.elements[i].changeDirection();
                        break;
                    }
                if (gameState.elements[i].startPos.x - newXPos.x > gameState.elements[i].range
                    || newXPos.x - gameState.elements[i].startPos.x > gameState.elements[i].range) {
                    gameState.elements[i].changeDirection();
                    break;
                }
                gameState.elements[i].moveX(newXPos, null);
            }
        }

    }

    // update position of items
    if(gameState.pc.equippedItem != null){
        gameState.pc.equippedItem.updatePosition(gameState.pc);
    }

    // if item used
    if(gameState.itemUsed){
        handleItemUse(gameState);
        gameState.itemUsed = false;
    }

    // change item selected
    if(gameState.changeItem){
        if(gameState.pc.status) {
            changeItem(gameState);
            gameState.changeItem = false;
        }
    }

    // counter to make tile effects only happen every few seconds
    gameState.pc.sinceTile += 1;
}

/*
|------------------------------------------------------------------------------
| Draw new frame
|------------------------------------------------------------------------------
*/

function draw(gameState){
    // clear canvas
    gameState.ctx.clearRect(0, 0, gameState.width, gameState.height);

    // center camera on player and redraw background
    scrollPlayerIntoView();

    // draw non-player elements
    for(i = 0; i<gameState.elements.length; i++){
        var curElement = gameState.elements[i];

        // if curElement is an NPC with a message
        if (curElement.shouldDisplay){
            gameState.ctx.font = 'Press Start 2P';
            gameState.ctx.fillStyle = "#ffffff";
            gameState.ctx.fillText(curElement.getMessage(),
                                   curElement.position.x,
                                   curElement.position.y-10);
            curElement.shouldDisplay = false;
        }

        // draw the element
        gameState.ctx.drawImage(curElement.img,curElement.position.x,curElement.position.y,
            curElement.size.x,curElement.size.y);

        // draw health bars for NPCs and Enemies
        if((curElement instanceof Enemy || curElement instanceof NPC) && curElement.status){
          gameState.ctx.fillStyle = "#FF0000";
          gameState.ctx.fillRect(curElement.position.x, curElement.position.y - 8,
              curElement.size.x, 4);
          gameState.ctx.fillStyle = "#00FF00";
          var percentFull = curElement.health / curElement.maxHealth;
          gameState.ctx.fillRect(curElement.position.x, curElement.position.y - 8,
              percentFull * curElement.size.x, 4);
        }
    }

    // draw pc
    gameState.ctx.drawImage(gameState.pc.img,gameState.pc.position.x,gameState.pc.position.y,
        gameState.pc.size.x,gameState.pc.size.y);

    // draw equipped item
    if(gameState.pc.equippedItem != null){
        var item = gameState.pc.equippedItem;
        gameState.ctx.drawImage(item.img, item.position.x, item.position.y, item.size.x,
            item.size.y);
    }

    // on player death visuals
    if(!gameState.pc.status){
        onPlayerDeath(gameState);
    }
}

/*
|------------------------------------------------------------------------------
| Helper Functions
|------------------------------------------------------------------------------
*/

// detect collisions between two hypothetical positions of two elements
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

// react to collisions with various types of elements
function onCollision(gameState, i) {
	    //if npc, show message
            if(gameState.elements[i] instanceof NPC){
               //elements[i].displayMessage();
               gameState.ctx.fillText(gameState.elements[i].getMessage(), 0, 0);
               gameState.elements[i].shouldDisplay = true;
            }

            //if enemy, either damage w/item or lose health
            if(gameState.elements[i] instanceof Enemy){
                gameState.pc.decHealth(gameState.elements[i].getDamage());
                // updateHealth(gameState.pc);
            }

            //if item, pick up and remove from elements, display in inventory
             if(gameState.elements[i] instanceof Item){
                gameState.pc.pickUpItem(gameState.elements[i]);
                gameState.elements.splice(i,1);
                showInventory(gameState);
             }

             //if enviroment with effect, affect pc
             if(gameState.elements[i] instanceof Environment){
                if(gameState.pc.sinceTile > 50 && gameState.elements[i].getEffect()){
                    if(gameState.elements[i].getEffect().getEffect() == "damage")
                        gameState.pc.decHealth(gameState.elements[i].getEffect().getAmount());
                    else if(gameState.elements[i].getEffect().getEffect() == "heal")
                        gameState.pc.addHealth(gameState.elements[i].getEffect().getAmount());
                    gameState.pc.sinceTile = 0;
                  }
             }
    }

// detect key presses
function keyDownHandler(event, gameState) {
    if(event.keyCode == 32){
        if(gameState.pc.equippedItem != null) {
            gameState.itemUsed = true;
        }
    }

    if(event.keyCode == 69){ // nice
        gameState.changeItem = true;
    }

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

// detect keys not being pressed
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

// create all the images given urls
function imgInit(gameState){
    for(i = 0; i<gameState.elements.length; i++){
        gameState.elements[i].img = new Image;
        gameState.elements[i].img.src = gameState.elements[i].sprite;
    }
    var tmp = gameState.backgroundUrl;
    gameState.backgroundUrl = new Image;
    gameState.backgroundUrl.src = tmp;

    gameState.pc.img = new Image;
    gameState.pc.img.src = gameState.pc.sprite;
}

// scroll camera view to keep player at the center; redraw background
function scrollPlayerIntoView() {
  var bgWidth = gameState.backgroundUrl.width; // width of background image
  var bgHeight = gameState.backgroundUrl.height; // height of background image
  var displayWidth = gameState.wrap.clientWidth; // width of viewport
  var displayHeight = gameState.wrap.clientHeight; // height of viewport
  var levelWidth = gameState.width; // width of level
  var margin = displayWidth / 2.5; // window in which player movement won't scroll display

  var left = gameState.wrap.scrollLeft; // current scroll location: left boundary
  var right = left + displayWidth; // current scroll location: right boundary
  var center = gameState.pc.position.plus(gameState.pc.size.times(0.5)); // center of player

  scrollVal1 = center.x - margin; // new left boundary: scroll back
  scrollVal2 = center.x + margin - displayWidth; // new left boundary: scroll forward
  scrollVal3 = levelWidth - displayWidth; // new left boundary: at end of level

  // player is too far to left of screen; but not at start of level: scroll back
  if (center.x < left + margin && scrollVal1 > 0)
    gameState.wrap.scrollLeft = scrollVal1;

  // player is too far to right of screen; but not at end of level: scroll forward
  else if (center.x > right - margin && scrollVal2 < levelWidth - displayWidth)
      gameState.wrap.scrollLeft = scrollVal2;

  // player is too far to right of screen; and at end of level: don't scroll past end of viewport
  else if (center.x > right - margin && scrollVal2 < levelWidth)
      gameState.wrap.scrollLeft = scrollVal3;

  // else player's location is within the allowed window: don't change scroll

  // code to scale background image when window is resized
  var hRatio = displayWidth  / bgWidth;
  var vRatio =  displayHeight / bgHeight;
  var ratio  = Math.max ( hRatio, vRatio );
  var centerShift_x = ( displayWidth - bgWidth*ratio ) / 2;
  var centerShift_y = ( displayHeight - bgHeight*ratio ) / 2;

  // clear background; redraw background at new scroll with scaling
  gameState.ctx.clearRect(0, 0, displayWidth, displayHeight);
  gameState.ctx.drawImage(gameState.backgroundUrl, 0, 0, bgWidth, bgHeight,
                          gameState.wrap.scrollLeft+centerShift_x,centerShift_y,
                          bgWidth*ratio, bgHeight*ratio);

  // draw player's health bar in top left corner
  gameState.ctx.fillStyle = "#FF0000";
  gameState.ctx.fillRect(gameState.wrap.scrollLeft+8, 8, 100, 20);
  gameState.ctx.fillStyle = "#00FF00";
  var percentFull = gameState.pc.health / gameState.pc.maxHealth;
  if(!gameState.pc.status) { percentFull=0; }
  gameState.ctx.fillRect(gameState.wrap.scrollLeft+8, 8, percentFull*100, 20);
}

// display player's inventory in html; only called when new item picked up
function showInventory(gameState){
    var ul = document.getElementById('inventory');
    ul.innerHTML = "";
    var inventory = gameState.pc.inventory;
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var listItem = document.createElement("li");

        listItem.border = "1px solid black";

        var _img = document.createElement('img');
        _img.src = item.sprite;
        _img.style = "width:30px;height:30px;";
        if(i == 0){
            _img.border = "1px solid red";
        }
        listItem.appendChild(_img);

        ul.appendChild(listItem);
    }
}

// update player's health
function updateHealth(pc){
    if(pc.health >=0) {
        var healthBar = document.getElementById("health");
        healthBar.value = pc.health;
    }
}

// define visuals and state-changes when player dies
function onPlayerDeath(gameState){
    var empty = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    gameState.ctx.fillText("GAME OVER DUDE", gameState.pc.position.x, gameState.pc.position.y - 10);
    gameState.pc.img.src = empty;
    if(gameState.pc.equippedItem != null) {
        gameState.pc.equippedItem.img.src = empty;
    }
    gameState.changeItem = false;
}

function reset(){
    initialize();
    imgInit(gameState);
    gameState.wrap.scrollLeft = 0;
}

function testWinConditions(gameState){
    // to be written
}

function handleItemUse (gameState){
    for(var i=0; i<gameState.characters.length; i++){
        if(!gameState.characters[i].status){
            gameState.characters.splice(i,1);
            i--;
            continue;
        }
        if(detectCollision(gameState.characters[i].position, gameState.pc.equippedItem.position,
            gameState.characters[i], gameState.pc.equippedItem)){
                gameState.pc.useItem(gameState.characters[i]);
                return;
        }
    }
    gameState.pc.useItem(gameState.pc);
    //updateHealth(gameState.pc);
}

function changeItem(gameState){
    if(gameState.pc.equippedItem!=null){
        if(gameState.pc.inventory.length > 1){
            gameState.pc.inventory.push(gameState.pc.equippedItem);
            gameState.pc.inventory.shift();
        }
        gameState.pc.setEquippedItem(gameState.pc.inventory[0]);
        gameState.pc.equippedItem.updatePosition(gameState.pc);
    }
    showInventory(gameState);
}

/*
|------------------------------------------------------------------------------
| Run Game Loop
|------------------------------------------------------------------------------
*/

reset();

function loop() {
    // game loop

    update(gameState);
    draw(gameState);
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

module.exports.showInventory = showInventory;
module.exports.reset = reset;

},{"./character.js":1,"./element.js":3,"./enemy.js":4,"./environment.js":6,"./item.js":7,"./npc.js":8,"./parsing.js":9,"./player.js":10,"./utility.js":11}],6:[function(require,module,exports){
/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox, eff){
  if (solid == 1 || solid == 0) {
      Element.call(this, pos, url, scale, hbox);
      this.solid = solid;
      this.effect = eff;
  }
  else{
      return {};
    }
};

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= true;
    this.effect = new Effect("heal", 2);;
};

Environment.prototype.getSolid = function(){
    return this.solid;
};

Environment.prototype.setSolid = function(bool){
  if (solid == 1 || solid == 0){
      this.solid = bool;
  }
};

Environment.prototype.setEffect= function(eft){
    this.effect = eft;
};

Environment.prototype.getEffect=function(){
    return this.effect;
};

module.exports = Environment;

},{"./element.js":3}],7:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Item Class
|------------------------------------------------------------------------------
|
| This file contains the Item prototype (the javascript equivalent of a
| class). It contains data about item status, position, and effect.
|
|------------------------------------------------------------------------------
*/

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');
const Vector = require('./utility.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Item(pos, url, sz, hbox, col, eff, bpos, hov){
    Element.call(this, pos, url, sz, hbox);
    this.collected = col;
    this.effect = eff;
    this.basePos = bpos;
    this.hovering = hov;
    this.wobble = Math.random() * Math.PI * 2;
    //this.targets = [new Enemy(), new NPC()];
}

Item.prototype.Item = function(){
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
};

//Setter for effect
Item.prototype.setEffect= function(eft){
    this.effect = eft;
};

//Getter for effect
Item.prototype.getEffect=function(){
    return this.effect;
};

//Getter for whether the item has been collected
Item.prototype.getCollected= function(){
    return this.collected;
};

//Setter for whether the item has been collected
Item.prototype.setCollected= function(b){
    this.collected = b;
};

//Make item hover
Item.prototype.hover = function(step) {
    wobbleSpeed = 2;
    wobbleDist = 1.5;
    this.wobble += step * wobbleSpeed;
    var wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.position = this.basePos.plus(new Vector(0, wobblePos));
};

//Update the item's position
Item.prototype.updatePosition = function(pc) {
    this.position.x = pc.position.x + pc.hitbox.x * .75;
    this.position.y = pc.position.y; //- pc.hitbox.y;
}
module.exports = Item;

},{"./element.js":3,"./utility.js":11}],8:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| NPC Class
|------------------------------------------------------------------------------
|
| This file contains the NPC prototype (the javascript equivalent of a
| class). NPC is a subclass of the Character superclass. It has 
| information about the NPC's message.
|
|------------------------------------------------------------------------------
*/

const Character = require('./character.js');
const Vector = require('./utility.js').vector;

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function NPC(loc, max, hea, stat, msg, hbox, url, size, speed, mvspd, grav){
    
    if(typeof msg === "string"){
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
        this.message = msg;
    }
    else return {};
}

NPC.prototype = Object.create(Character.prototype); 

//Getter for message
NPC.prototype.getMessage = function(){
    return this.message;
    
}

//Setter for message
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

},{"./character.js":1,"./utility.js":11}],9:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Parser
|------------------------------------------------------------------------------
|
| This file contains the Parser, the JSONtoElements function, which
| creates a new element based on data from a given JSON.
|
|------------------------------------------------------------------------------
*/

const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Effect = require('./effect.js');
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
                    var eff= null; // new Effect("damage", 1);
                    element = new Environment(1,pos,url,sz,hitbox,eff);
                }
                else if (temp.name == "Item"){
                    var col=0;
                    var eff= new Effect("damage", 1);
                    var hov=true;
                    element = new Item(pos, url, sz, hitbox, col, eff, pos, hov);
                }
                else if (temp.name == "Player"){
                    var max = 10;
                    var hea = 8;
                    var stat = true;
                    var itm= null;
                    var inv= [];
                    var hitbox = new Vector(19,50);
                    var spd = new Vector(0,0);
                    var mvspd = 60;
                    var grav = 40;
                    element = new Player(pos, max, hea, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 7;
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
                    var dmg= .01;
                    var spd = new Vector(0,0);
                    var mvspd = 15;
                    var grav = 60;
                    var dir = "left";
                    var range = 35;
                    var startLoc = pos;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz, spd, mvspd, grav, dir, range, startLoc);
                }
                elementarray.push(element);
            }
        }
        return {"elements": elementarray,
                "backgroundUrl": backgroundurl };
    }
module.exports = JSONtoElements;

},{"./character.js":1,"./effect.js":2,"./element.js":3,"./enemy.js":4,"./environment.js":6,"./item.js":7,"./npc.js":8,"./player.js":10,"./utility.js":11}],10:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Player Class
|------------------------------------------------------------------------------
|
| This file contains the Player prototype (the javascript equivalent of a
| class). Player is a subclass of the superclass Character. It contains
| data about player status and whether the player has an item.
|
|------------------------------------------------------------------------------
*/
/*Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');
const Vector = require('./utility.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed, mvspd, grav){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.equippedItem = itm;
    this.inventory = inv;
    this.sinceTile = 50;
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

//Getter for inventory
Player.prototype.getInventory= function(){
    return this.inventory;
}

//Setter for inventory
Player.prototype.setInventory = function(arr)
{
    this.inventory = arr;
}

//Getter for an owned item
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//Setter for owned item; return 1 if successful, return 0 for non-item input
Player.prototype.setEquippedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
    if(itm instanceof Item){
        //this.inventory.push(this.equippedItem);
        this.equippedItem = itm;
        itm.collected = true;
    }
}

//Use owned item
Player.prototype.useItem = function(target){
    /* if there is a target, do the effect (heal or damage)*/
    if(this.status){
        if(target != null){
            if(this.equippedItem.getEffect().effect == "heal" && target.status){
                console.log(this.equippedItem);
                target.health += this.equippedItem.effect.amount; 
                if(target.health > target.maxHealth){
                    target.health = target.maxHealth;
                }
                console.log(target.health);
            }
            else if (this.equippedItem.getEffect().effect == "damage" && target.status){
                
                target.health -= this.equippedItem.effect.amount;
                if(target.health <= 0){
                    target.status = false;
                }
                console.log(target.health);
            }
        }
    }
    
}

//Pick up an item
Player.prototype.pickUpItem = function(item){
    this.setEquippedItem(item);
    this.inventory.unshift(item);
}

module.exports = Player;

},{"./character.js":1,"./item.js":7,"./utility.js":11}],11:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Vector Class
|------------------------------------------------------------------------------
|
| This file contains the Vector prototype (the javascript equivalent of a
| class). 
|
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Vector(x,y){
	this.x=x;
	this.y=y;
}

//Add to the vector
Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

//Multiply the vector times a vector
Vector.prototype.times = function(vec) {
	return new Vector (this.x * vec.x, this.y * vec.y);
}

//Multiply the vector times a number
Vector.prototype.times = function(num) {
	return new Vector (this.x * num, this.y * num);
}

module.exports = Vector;

},{}]},{},[5])(5)
});
