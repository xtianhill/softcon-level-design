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
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Default Constructor Test
    beforeEach(function(){
        testEnvironment = new Enviroment(true, new vector(1,1), null, new vector(50,10), new vector(20,50));
    })

    // Full Constructor Tests
    it('should construct an environment', function(){
        expect(testEnvironment.getSolid()).toBeTruthy();
        expect(testEnvironment.getPosition()).toEqual(new vector(1,1));
        expect(testEnvironment.getSprite()).toEqual(null);
        expect(testEnvironment.getSize()).toEqual(new vector(50,10));
        expect(testEnvironment.getHitbox()).toEqual(new vector(20,50));
    })

    /*
    |--------------------------------------------------------------------------
    | Setter and getter tests
    |--------------------------------------------------------------------------
    */

    // setSolid and getSolid tests
    it('should correctly set and get solid', function(){
        testEnvironment.setSolid(false);
        expect(testEnvironment.getSolid()).toBeFalsy();
    })

    it('should fail to set solid', function() {
        testEnvironment.setSolid("hello");
        expect(testEnemy.getSolid()).toEqual(1);
    });
})
