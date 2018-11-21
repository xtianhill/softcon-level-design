(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.engine = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Engine
|------------------------------------------------------------------------------
|
| This file contains tests for the Engine.
|
|------------------------------------------------------------------------------
*/

describe('Engine Tests', function(){


    // GAME STATE TESTS

    // on collision tests
    it('should make player call pickUpItem when colliding with item', function(){

    });

    it('should decrease enemies health when attacked', function(){

    });

    it('should call display message if collision with npc', function(){

    });

    // show inventory tests
    it('should generate list of items to be displayed in html', function(){

    });

    // test draw function
    it('should call drawImage for each element in the list with its position as parameters', function(){

    });

    // test image init
    it('should create img objects for each element and set source to sprite', function(){

    });

    // test key handlers
    it('should set correct direction for key presses', function(){

    });

    // test detectCollisions
    it('should return true if there is an x collision', function(){

    });

    it('should return true if there is an y collision', function(){

    });

    // test win conditions
    it('should set npc condition to true if all npcs have displayed message', function(){

    });

    it('should set enemy condition to true if all enemies are dead', function(){

    });

    it('should set item condition to true if all items picked up', function(){

    });

    it('should set distance condition to true if you reach end of level', function(){

    });

    it('should end game when all conditions met', function(){

    });





});
},{}]},{},[1])(1)
});
