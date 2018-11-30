(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.effect = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
| Tests for Effect Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Effect class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const Effect = require('../static/effect.js');

describe('Effect', function(){
    let testEffect;
    let testEffect1;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testEffect = new Effect('heal', 10);
        testEffect1 = new Effect('damage', 13);
    })

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // test full constructor
    it('should construct a default effect', function(){
        expect((testEffect).getIsActive()).toBeFalsy();
        expect((testEffect).getEffect()).toEqual('heal');
    });

    // test invalid input
    it('should return null Effect because of integer input for title', function(){
      testEffect= new Effect(4, 4);
      expect(testEffect).toEqual({});
    });

    it ('should return null Effect because of bad string input for title', function(){
      testEffect= new Effect('twerk', 4);
      expect(testEffect).toEqual({});
    });

    it ('should return null Effect because of bad boolean input', function(){
      testEffect = new Effect('hello', 'heal', 4);
      expect(testEffect).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    it('should get and set the effect', function(){
        testEffect.setEffect(testEffect1);
        expect((testEffect).getEffect()).toEqual('damage');
        expect(testEffect.amount).toEqual(testEffect1.amount);
        expect(testEffect.amount).toEqual(13);
    });

    it('should fail to set the title because of bad input for title', function(){
        testEffect.setEffect('fake_news');
        expect((testEffect).getEffect()).toEqual('heal');
    });

    it('should fail to set the title because of invalid input', function(){
        testEffect.setEffect(800);
        expect((testEffect).getEffect()).toEqual('heal');
    });

    /*
    |--------------------------------------------------------------------------
    | Activation Method Tests
    |--------------------------------------------------------------------------
    */

    it('should activate the effect', function(){
        (testEffect).activate();
        expect((testEffect).getIsActive()).toBeTruthy();
    });

    it('should deactivate the effect', function(){
        (testEffect).activate();
        (testEffect).deactivate();
        expect((testEffect).getIsActive()).toBeFalsy();
    });

    /*
    |--------------------------------------------------------------------------
    | Amount Method Tests
    |--------------------------------------------------------------------------
    */

    it('should get and set the amounts', function(){
        expect((testEffect).getAmount()).toEqual(10);
        testEffect.setAmount(5);
        expect((testEffect).getAmount()).toEqual(5);
    });

});

},{"../static/effect.js":1}]},{},[2])(2)
});
