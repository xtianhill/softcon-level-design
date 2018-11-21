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
