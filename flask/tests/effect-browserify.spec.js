(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.effect = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function Effect(title){
    this.effect = title;
    this.isActive = false;
}

Effect.prototype.Effect = function(bool, title){
    if(typeof bool != "boolean"){
      return null;
    }
    if (title != "damage" || "heal"){
      return null;
    }
    this.isActive = bool;
    this.effect = title;
}

Effect.prototype.activate = function(){
    this.isActive = true;
}

Effect.prototype.deactivate = function(){
    this.isActive = false;
}

Effect.prototype.getIsActive = function(){
    return this.isActive;
}

Effect.prototype.setEffect = function(effect){
    this.effect = effect;
}

Effect.prototype.getEffect = function(){
    return this.effect;
}

module.exports = Effect;

},{}],2:[function(require,module,exports){
//Type Checking and throw exception
const Effect = require('../static/effect.js');

describe('Effect', function(){
    let testEffect;

    beforeEach(function(){
        testEffect = new Effect('fire');
    })
    it('should construct a default effect', function(){
        expect(testEffect.getIsActive()).toBeFalsy();
        expect(testEffect.getEffect()).toEqual('fire');
    });

    it('should activate the effect', function(){
        testEffect.activate();
        expect(testEffect.getIsActive()).toBeTruthy();
    });

    it('should deactivate the effect', function(){
        testEffect.activate();
        testEffect.deactivate();
        expect(testEffect.getIsActive().toBeFalsy);
    });

    it('should get and set the title', function(){
        testEffect.setEffect('ice!');
        expect(testEffect.getEffect()).toEqual('ice!');
    });
});

},{"../static/effect.js":1}]},{},[2])(2)
});
