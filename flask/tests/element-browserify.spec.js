(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.element = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./utility.js":2}],2:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

module.exports = Vector;
},{}],3:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Element Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Element class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const Element = require('../static/element.js');
const Vector = require('../static/utility.js');

describe('Element', function() {
    let testElement;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function() {
        testElement = new Element(new Vector(0,0), "dummyUrl", new Vector(50,50), new Vector(50,50));
      });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should have constructed an element with given specifications', function() {
        expect(testElement.getPosition()).toEqual(new Vector(0,0));
        expect(testElement.getSprite()).toEqual('dummyUrl');
        expect(testElement.getSize()).toEqual(new Vector(50,50));
        expect(testElement.getHitbox()).toEqual(new Vector(50,50));
    });

    // Invalid Input Constructor Tests
    it('should return an empty object due to invalid position', function() {
        testElement= new Element(4, "dummyUrl", new Vector(50,50), new Vector(50,50));
        expect(testElement).toEqual({});
    });

    it('should return an empty object due to invalid url', function() {
        testElement= new Element(new Vector(0,0), 4, new Vector(50,50), new Vector(50,50));
        expect(testElement).toEqual({});
    });

    it('should return an empty object due to invalid scale', function() {
        testElement= new Element(new Vector(0,0), "dummyUrl", 3, new Vector(50,50));
        expect(testElement).toEqual({});
    });

    it('should return an empty object due to invalid hitbox', function() {
        testElement= new Element(new Vector(0,0), "dummyUrl", new Vector(50,50), 3);
        expect(testElement).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    // setPosition and getPosition tests
    it('should set position and get position', function() {
        testElement.setPosition(new Vector(10,10));
        expect(testElement.getPosition()).toEqual(new Vector(10,10));
    });

    it('should fail to set position due to invalid input', function() {
        testElement.setPosition(3);
        expect(testElement.getPosition()).toEqual(new Vector(0,0));
    });

    // setSprite and getSprite tests
    it('should set sprite and get sprite', function() {
        testElement.setSprite("aSprite");
        expect(testElement.getSprite()).toEqual("aSprite");
    });

    it('should fail to set sprite due to invalid input', function() {
        testElement.setSprite(3);
        expect(testElement.getSprite()).toEqual("dummyUrl");
    });

    // setSize and getSize tests
    it('should set size and get size', function() {
        testElement.setSize(new Vector(10,10));
        expect(testElement.getSize()).toEqual(new Vector(10,10));
    });

    it('should fail to set size due to invalid input', function() {
        testElement.setSize(3);
        expect(testElement.getSize()).toEqual(new Vector(50,50));
    });

    // setHitbox and getHitbox tests
    it('should set hitbox and get hitbox', function() {
        testElement.setHitbox(new Vector(10,10));
        expect(testElement.getHitbox()).toEqual(new Vector(10,10));
    });

    it('should fail to set hitbox due to invalid input', function() {
        testElement.setHitbox(3);
        expect(testElement.getHitbox()).toEqual(new Vector(50,50));
    });

});

},{"../static/element.js":1,"../static/utility.js":2}]},{},[3])(3)
});
