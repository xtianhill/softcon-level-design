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

},{"./element.js":2,"./utility.js":4}],2:[function(require,module,exports){
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
},{"./utility.js":4}],3:[function(require,module,exports){
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


module.exports = Enemy;

},{"./character.js":1}],4:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
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
        testEnemy = new Enemy(new Vector(1,1), 20, 0, 0, 5, new Vector(10,10), new Vector(10,10));
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should create a new enemy with create enemy with loc (1,1), maxhealth 20 health 0, status 0, damage 5', function() {
        expect(testEnemy.getDamage()).toEqual(5);
        expect(testEnemy.getLocation()).toEqual(new Vector(1,1));
        expect(testEnemy.getMaxHealth()).toEqual(20);
        expect(testEnemy.getHealth()).toEqual(0);
        expect(testEnemy.getStatus()).toEqual(0);
    });

    // Invalid Input Constructor Tests
    it('should return an empty object due to invalid damage', function() {
        testEnemy = new Enemy(new Vector(0,0), 20, 0, 0, "bad",
                                        new Vector(10,10),
                                        new Vector(10,10));
        expect(testEnemy).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
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

});

},{"../static/enemy.js":3,"../static/utility.js":4}]},{},[5])(5)
});
