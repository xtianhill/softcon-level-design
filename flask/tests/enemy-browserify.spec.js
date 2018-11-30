(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.enemy = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    t = typeof dmg;
    t2 = typeof range;
    //if (t === "number" && t2 === "number" && (dir === "right" || dir === "left" || dir === "still")) {
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
        console.log("please dear god");
        this.damage = dmg;
        this.direction = dir;
        this.range = range;
        this.startPos = startLoc;
   // }
    // else {
    //     return {}
    // }
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

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
        t = typeof amount;
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
    t = typeof rng;
    if (t === "number"){
        this.range = rng;
    }
    else{
        return null;
    }
}

//Getter for direction
Enemy.prototype.getDirection = function(){
    return this.direction;
}

//Changes direction
Enemy.prototype.changeDirection = function(){
    if(this.direction === "right"){
        this.direction = "left";
    } else if(this.direction === "left"){
        this.direction = "right";
    }
}

//Setter for direction
Enemy.prototype.setDirection = function(dir){
    //set damage to amount
        t = typeof dir;
        if (t === "string" && (dir == "right" || dir == "left" || dir == "still")){
            this.direction = dir;
        }
        else{
            return null;
        }
}

module.exports = Enemy;

},{"./character.js":1}],4:[function(require,module,exports){
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
| Tests for Enemy Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Enemy class.
| We test input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

var Enemy = require('../static/enemy.js');
const Vector = require('../static/utility.js');

describe('Enemy', function() {
    let testEnemy;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testEnemy = new Enemy(new Vector(1,1), 20, 10, true, 5, new Vector(10,10),'dummy', new Vector(10,10), new Vector(0,0), 10, 10, "right", 5, new Vector(5,5));
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should create a new enemy with create enemy with loc (1,1), maxhealth 20 health 10, status true, damage 5', function() {
        //console.log(testEnemy);
        expect(testEnemy.getDamage()).toEqual(5);
        expect(testEnemy.getPosition()).toEqual(new Vector(1,1));
        expect(testEnemy.getMaxHealth()).toEqual(20);
        expect(testEnemy.getHealth()).toEqual(10);
        expect(testEnemy.getStatus()).toEqual(true);
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests for Damage
    |--------------------------------------------------------------------------
    */
    // test setDamage and getDamage
    it('should set the damage level of the Enemy', function() {
        testEnemy.setDamage(5);
        expect(testEnemy.getDamage()).toEqual(5);
    });

    it('should return the damage level of the Enemy', function() {
        expect(testEnemy.getDamage()).toEqual(5);
        testEnemy.setDamage(4);
        expect(testEnemy.getDamage()).toEqual(4);
    });

    it('should fail to set the damage level of the Enemy due to invalid input', function() {
        testEnemy.setDamage("hello");
        expect(testEnemy.getDamage()).toEqual(5);
    });

    // test getRange and setRange
    it('should set the range to 20 and get the range successfully', function() {
        testEnemy.setRange(20);
        expect(testEnemy.getRange()).toEqual(20);
    });

    it('should fail to set the range due to invalid input', function() {
        testEnemy.setRange("hello");
        expect(testEnemy.getRange()).toEqual(5);
    });

    // test getDirection, setDirection, changeDirection
    it('should test setting and getting the Direction successfully', function() {
        testEnemy.setDirection("right");
        expect(testEnemy.getDirection()).toEqual("right");
    });

    it('should fail to set Direction due to invalid input', function() {
        testEnemy.setDirection("nowehere");
        expect(testEnemy.getDirection()).toEqual("right");
    });

    it('should test changeDirection', function() {
        testEnemy.changeDirection();
        expect(testEnemy.getDirection()).toEqual("left");
    });
    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests for Range
    |--------------------------------------------------------------------------
    */

    it('should get and set Range', function(){
        expect(testEnemy.getRange()).toEqual(5);
        testEnemy.setRange(10);
        expect(testEnemy.getRange()).toEqual(10);
    });

    /*
    |--------------------------------------------------------------------------
    | Direction Method Tests
    |--------------------------------------------------------------------------
    */

    it('should get and set directions', function(){
        expect(testEnemy.getDirection()).toEqual("right");
        testEnemy.setDirection("left");
        expect(testEnemy.getDirection()).toEqual("left");
        testEnemy.setDirection("still");
        expect(testEnemy.getDirection()).toEqual("still");
    });

    it('should try and set direction to an invalid string', function(){
        testEnemy.setDirection("up");
        expect(testEnemy.getDirection()).toEqual("right");
    });

    it('should change direction', function(){
        console.log(testEnemy);
        testEnemy.changeDirection();
        expect(testEnemy.getDirection()).toEqual("left");
        testEnemy.changeDirection();
        expect(testEnemy.getDirection()).toEqual("right");
    });

});

},{"../static/enemy.js":3,"../static/utility.js":4}]},{},[5])(5)
});
