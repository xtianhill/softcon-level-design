(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.environment = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./utility.js":3}],2:[function(require,module,exports){
/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox){
  if (typeof solid == "boolean") {
      Element.call(this, pos, url, scale, hbox);
      this.solid = solid;
  }
  else
      return {};
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
  if (typeof solid == "boolean"){
      this.solid = bool;
  }
}

module.exports = Environment;

},{"./element.js":1}],3:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

module.exports = Vector;
},{}],4:[function(require,module,exports){
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
        testEnvironment = new Enviroment(true, new vector(1,1), null, new vector(50,10), new vector(20,50));
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
        expect(testEnemy.getSolid()).toBeTruthy();
    });
});

},{"../static/environment.js":2,"../static/utility.js":3}]},{},[4])(4)
});
