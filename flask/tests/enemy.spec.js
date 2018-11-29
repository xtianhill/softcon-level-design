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

    // test getRange and setRange
    it('should set the range to null and get the range successfully', function() {
        testEnemy.setRange(null);
        expect(testEnemy.getRange()).toEqual(null);
    });

    it('should fail to set the range due to invalid input', function() {
        testEnemy.setRange("hello");
        expect(testEnemy.getRange()).toBeFalsy();
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

});
