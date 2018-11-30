(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.npc = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    // console.log("speed", (spd instanceof Vector));
    // console.log("mvspeed", (typeof mvspd === "number"));
    // console.log("stat", (typeof stat === "boolean"));
    // console.log("grav", (typeof grav === "number"));
    // console.log("health", (typeof hea ==="number"));
    // console.log("max",  (typeof max === "number"));
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
            if (obstacle.solid) {
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

},{"./element.js":2,"./utility.js":4}],2:[function(require,module,exports){
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
},{"./utility.js":4}],3:[function(require,module,exports){
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
        this.spokenTo = false;
    }
    else return {};
}

NPC.prototype = Object.create(Character.prototype); 
NPC.prototype.constructor = NPC;
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

},{"./character.js":1,"./utility.js":4}],4:[function(require,module,exports){
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
	if (typeof(x) != 'number' || typeof(y) != 'number'){
		return {};
	}
	else{
		this.x=x;
		this.y=y;
	}
}

//Add to the vector
Vector.prototype.plus = function(vec) {
	if (typeof(vec.x) != 'number' || typeof(vec.y) != 'number'){
		return {};
	}
	else{
		return new Vector (this.x + vec.x, this.y + vec.y);
	}
}

//Multiply the vector times a number or a vector
Vector.prototype.times = function(num) {
	if(typeof(num) == 'number')
	    return new Vector (this.x * num, this.y * num);
	else if(num instanceof Vector)
	    return new Vector (this.x * num.x, this.y * num.y);
}

module.exports = Vector;

},{}],5:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for NPC Class
|------------------------------------------------------------------------------
|
| This file contains tests for the NPC class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods. Since NPC is
| a subclass of Character, any constructor input or setter methods that are
| input-validated in Character are not re-tested here.
|
|------------------------------------------------------------------------------
*/

var Vector = require('../static/utility.js');
var NPC = require('../static/npc.js');

describe('NPC', function() {
    let testNPC;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testNPC = new NPC(new Vector(10,10),15, 15, 1, "hi", new Vector(50,50), null, new Vector(50,50));
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should construct a new NPC', function() {
        expect(testNPC.getMessage()).toEqual("hi");
    });

    it('should fail to construct a new NPC due to invalid input', function(){
        testNPC = new NPC(new Vector(10,10),15, 15, 1, 2, new Vector(50,50), null, new Vector(50,50));
        expect(testNPC).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Setter and Getter Tests
    |--------------------------------------------------------------------------
    */

    // setMessage and getMessage tests
    it('should set the NPCs message to sup', function() {
        testNPC.setMessage('sup');
        expect(testNPC.getMessage()).toEqual('sup');
    });

    it('should not set message to 2 and return null due to invalid input', function() {
        expect(testNPC.setMessage(2)).toBeNull();
        expect(testNPC.getMessage()).toEqual('hi');
    });

    it('should test setMessage and getMessage with valid input', function() {
        expect(testNPC.getMessage()).toEqual('hi');
        testNPC.setMessage('okay');
        expect(testNPC.getMessage()).toEqual('okay');
    });
});

},{"../static/npc.js":3,"../static/utility.js":4}]},{},[5])(5)
});
