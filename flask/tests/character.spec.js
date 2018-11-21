/*
|------------------------------------------------------------------------------
| Tests for Character Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Character class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const Vector = require('../static/utility.js');
const Character = require('../static/character.js');
const Environment = require('../static/environment.js');

describe('Character', function() {
    let testCharacter;

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */
    // Default Constructor Test
    beforeEach(function(){
        testCharacter = new Character(new Vector(1,1), 20, 10, true,
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, 40);
    });

    // Full Constructor Tests
    it('should create a new character with fiven specs', function() {
        expect(testCharacter.getPosition()).toEqual(new Vector(1,1));
        expect(testCharacter.getMaxHealth()).toEqual(20);
        expect(testCharacter.getHealth()).toEqual(10);
        expect(testCharacter.getStatus()).toBeTruthy();
        expect(testCharacter.getHitbox()).toEqual(new Vector(50,50));
        expect(testCharacter.getSprite()).toEqual('url');
        expect(testCharacter.getSize()).toEqual(new Vector(50,50));
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,0));
        expect(testCharacter.getMovementSpeed()).toEqual(60);
        expect(testCharacter.getGravity()).toEqual(40);
    });

    it('should return an empty object due to invalid max health', function() {
        testCharacter = new Character(new Vector(0,0), "bad", 10,
                                      true, new Vector(50,50),
                                      'url', new Vector(50,50),
                                      new Vector(0,0), 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid health', function() {
        testCharacter = new Character(new Vector(0,0), 20, "bad", true,
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid status', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, "bad",
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid speed', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, true,
                                       new Vector(50,50), 'url',
                                       new Vector(50,50), "bad", 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid movement speed', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, true,
                                       new Vector(50,50), 'url',
                                       new Vector(50,50),
                                       new Vector(0,0), "bad", 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid gravity', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, true,
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, "bad");
        expect(testCharacter).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    // setMaxHealth and getMaxHealth Tests
    it('should set the characters max health to 30', function() {
        testCharacter.setMaxHealth(30);
        expect(testCharacter.getMaxHealth()).toEqual(30);
    });

    it('should fail to set the max health due to invalid input', function() {
        testCharacter.setMaxHealth('p');
        expect(testCharacter.getMaxHealth()).toEqual(20);
    });

    // setHealth and getHealth Tests
    it('should set the characters health to 5', function() {
        testCharacter.setHealth(5);
        expect(testCharacter.getHealth()).toEqual(5);
    });

    it('should fail to set the health due to invalid input', function() {
        testCharacter.setHealth('one');
        expect(testCharacter.getHealth()).toEqual(10);
    });

    // setStatus and getStatus Tests
    it('should set the charaters status to false', function() {
        testCharacter.setStatus(false);
        expect(testCharacter.getStatus()).toBeFalsy();
    });

    it('should fail to set the status due to invalid input', function() {
        testCharacter.setStatus("bad");
        expect(testCharacter.getStatus()).toEqual(true);
    });

    // setSpeed and getSpeed Tests
    it('should set the charaters speed to vector 100,100', function() {
        testCharacter.setSpeed(new Vector(100,100));
        expect(testCharacter.getSpeed()).toEqual(new Vector(100,100));
    });

    it('should fail to set the speed due to invalid input', function() {
        testCharacter.setSpeed("bad");
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,0));
    });

    // setMovementSpeed and getMovementSpeed Tests
    it('should set movement speed to 100', function() {
        testCharacter.setMovementSpeed(100);
        expect(testCharacter.getMovementSpeed()).toEqual(100);
    });

    it('should fail to set Movement speed due to invalid input', function(){
        testCharacter.setMovementSpeed("bad");
        expect(testCharacter.getMovementSpeed()).toEqual(60);
    });

    // setGravity and getGravity Tests
    it('should set gravity to 100', function(){
        testCharacter.setGravity(100);
        expect(testCharacter.getGravity()).toEqual(100);
    });

    it('should fail to set gravity due to invalid input', function(){
        testCharacter.setGravity("bad")
        expect(testCharacter.getGravity()).toEqual(40);
    });

    /*
    |--------------------------------------------------------------------------
    | Movement Tests
    |--------------------------------------------------------------------------
    */

    // newXPos Tests
    it('should make newXpos with step 1 and dir right', function(){
        expect(testCharacter.newXPos(1,'right')).toEqual(new Vector(61,1));
    });

    it('should make newXpos with step 1 and dir right', function(){
        expect(testCharacter.newXPos(1,'left')).toEqual(new Vector(-59,1));
    });

    // moveX Tests
    it('should move x to newpos because of null obstacle', function(){
        testCharacter.moveX(new Vector(61,1),null);
        expect(testCharacter.getPosition()).toEqual(new Vector(61,1));
    });

    it('should move x to newpos because of non-solid obstacle', function(){
        testEnvironment = new Environment(false, new Vector(1,1), null,
                                          new Vector(50,10),
                                          new Vector(20,50));
        testCharacter.moveX(new Vector(61,1), testEnvironment);
        expect(testCharacter.getPosition()).toEqual(new Vector(61,1));
    });

    it('should not move x to newpos because of solid obstacle', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.moveX(new Vector(61,1), testEnvironment);
        expect(testCharacter.getPosition()).toEqual(new Vector(1,1));
    });

    // newYPos Tests
    it('should make newYpos with step 1 ', function(){
        expect(testCharacter.newYPos(1)).toEqual(new Vector(1,41));
    });

    it('should make newYpos with step 5 ', function(){
        expect(testCharacter.newYPos(5)).toEqual(new Vector(1,1001));
    });

    // moveY Tests
    it('should move y to newpos because of null obstacle', function(){
        testCharacter.moveY(new Vector(1,41),null, true);
        expect(testCharacter.getPosition()).toEqual(new Vector(1,41));
    });

    it('should move y to newpos because of non-solid obstacle', function(){
        testEnvironment =  new Environment(false, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.moveY(new Vector(1,41), testEnvironment, true);
        expect(testCharacter.getPosition()).toEqual(new Vector(1, 41));
    });

    it('should not move y to newpos because of solid obstacle and should set yspeed to 0', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.moveY(new Vector(1,41), testEnvironment, false);
        expect(testCharacter.getPosition()).toEqual(new Vector(1, 1));
    });

    it('should not move y to newpos because of solid obstacle and should set yspeed to 0', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.moveY(new Vector(1,41), testEnvironment, false);
        expect(testCharacter.getPosition()).toEqual(new Vector(1, 1));
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,0));
    });

    it('should not move y to newpos because of solid obstacle and should set yspeed to -70', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.setSpeed(new Vector(0,10));
        testCharacter.moveY(new Vector(1,41), testEnvironment, true);
        expect(testCharacter.getPosition()).toEqual(new Vector(1, 1));
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,-70));
    });
});
