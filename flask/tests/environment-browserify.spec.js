(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.environment = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    t = typeof title;
    t2 = typeof amount;
    if (t === "string" && t2 === "number" && (title == 'heal' || title == 'damage')){
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
Effect.prototype.setEffect = function(eft){
    t = typeof eft;
    if (t == "object") {
        this.effect = eft.effect;
        this.isActive = eft.isActive;
        this.amount = eft.amount;
    }
    else {
        return null;
    }
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
    t = typeof num;
    if (t === "number"){
        this.amount = num;
    }
    else{
        return null;
    }
}

module.exports = Effect;

},{}],2:[function(require,module,exports){
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
| Environment Class
|------------------------------------------------------------------------------
|
| This file contains the Environment prototype (the javascript equivalent of a
| class). 
|
|------------------------------------------------------------------------------
*/


/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');
const Effect = require('./effect.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Environment(solid, pos, url, scale, hbox, eff){
    // console.log("solid", solid == true);
    // console.log("solid", solid == false);
    if (solid == true || solid == false) {
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
    this.solid= 1;
    this.effect = new Effect("heal", 2);;
};

//Getter for solid
Environment.prototype.getSolid = function(){
    return this.solid;
};

//Setter for solid
Environment.prototype.setSolid = function(bool){
  if (bool == 1 || bool == 0){
      this.solid = bool;
  }
};

//Setter for effect
Environment.prototype.setEffect= function(eft){
    if(eft instanceof Effect)
        {this.effect = eft;}
};

//Getter for effect
Environment.prototype.getEffect=function(){
    return this.effect;
};

module.exports = Environment;

},{"./effect.js":1,"./element.js":2}],4:[function(require,module,exports){
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
| Tests for Environment Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Environment class.
| We test input for each method. Thorough testing on the constructor
| is used to verify input to all methods that are not setter methods.
|
|------------------------------------------------------------------------------
*/

const Enviroment = require('../static/environment.js');
const Effect = require('../static/effect.js');
const vector = require('../static/utility.js');

describe('Environment', function(){
    let testEnvironment;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testEnvironment = new Enviroment(true, new vector(1,1), null, new vector(50,10), new vector(20,50), new Effect('heal', 5));
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should construct a solid environment', function(){
        expect(testEnvironment.getSolid()).toBeTruthy();
    });

    it('should fail to construct an environment due to invalid input for solid', function(){
        testEnvironment = new Enviroment("apple", new vector(1,1), null, new vector(50,10), new vector(20,50));
        expect(testEnvironment).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Setter and getter tests
    |--------------------------------------------------------------------------
    */

    // setSolid and getSolid tests
    it('should correctly set and get solid', function(){
        testEnvironment.setSolid(false);
        expect(testEnvironment.getSolid()).toBeFalsy();
    });

    it('should fail to set solid due to invalid input', function() {
        testEnvironment.setSolid("hello");
        expect(testEnvironment.getSolid()).toBeTruthy();
    });

    //getEffect and setEffect
    it('should correctly set and get effect', function(){
        EffectA = new Effect('heal', 5);
        testEnvironment.setEffect(EffectA);
        expect(testEnvironment.getEffect()).toEqual(EffectA);
        EffectB = new Effect('heal', 8);
        testEnvironment.setEffect(EffectB);
        expect(testEnvironment.getEffect()).toEqual(EffectB);
    });

    it('should fail to correctly set effect due to invalid input', function() {
        EffectB = new Effect('heal', 8);
        testEnvironment.setEffect(EffectB);
        testEnvironment.setEffect("fake effect");
        expect(testEnvironment.getEffect()).toEqual(EffectB);
        testEnvironment.setEffect(1234);
        expect(testEnvironment.getEffect()).toEqual(EffectB);
    });
});

},{"../static/effect.js":1,"../static/environment.js":3,"../static/utility.js":4}]},{},[5])(5)
});
