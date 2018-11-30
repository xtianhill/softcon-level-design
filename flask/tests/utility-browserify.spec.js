(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.utility = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Vector Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Vector class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const Vector = require('../static/utility.js');

describe('Utility', function(){
    let testVector0;
    let testVector1;
    let testVector2;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testVector0 = new Vector(0, 0);
        testVector1 = new Vector(6, 9);
        testVector2 = new Vector(12, 18);
        testVector3 = new Vector(72, 162);
    })

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should create new vectors with values (0,0), (6,9), (12, 18)', function(){
        expect(testVector0).toEqual(new Vector(0, 0));
        expect(testVector1).toEqual(new Vector(6, 9));
        expect(testVector2).toEqual(new Vector(12, 18));
        expect(testVector3).toEqual(new Vector(72, 162));
    });

    it('should fail to create a vectors with invalid input', function(){
        testVector = new Vector('ten', testVector0);
        expect(testVector).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Plus Tests
    |--------------------------------------------------------------------------
    */

    it('should add vectors', function() {
        expect(testVector0.plus(testVector0)).toEqual(testVector0);
        expect(testVector0.plus(testVector1)).toEqual(testVector1);
        expect(testVector1.plus(testVector1)).toEqual(testVector2);
    });

    it('should fail to add vectors due to invalid input', function() {
        expect(testVector0.plus(5)).toEqual({});
        expect(testVector0.plus("testVector1")).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Multiply Tests
    |--------------------------------------------------------------------------
    */

    it('should multiply vectors', function() {
        expect(testVector1.times(testVector2)).toEqual(testVector3);
        expect(testVector0.times(testVector3)).toEqual(testVector0);
    });

    it('should multiply a vector times a number', function() {
        expect(testVector0.times(13)).toEqual(testVector0);
        expect(testVector1.times(2)).toEqual(testVector2);
        console.log(testVector1.times(2));
    });
});

},{"../static/utility.js":1}]},{},[2])(2)
});
