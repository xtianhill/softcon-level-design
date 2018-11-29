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
const Effect = require('../static/effect.js');
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
        testEnvironment = new Enviroment(true, new vector(1,1), null, new vector(50,10), new vector(20,50), new Effect('heal', 5));
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
        expect(testEnvironment.getSolid()).toBeTruthy();
    });

    //getEffect and setEffect
    it('should correctly set and get effect', function(){
        EffectA = new Effect('heal', 5);
        testEnvironment.setEffect(EffectA);
        expect(testEnvironment.getEffect()).toEqual(EffectA);
        EffectB = new Effect('heal', 8);
        testEnvironment.setEffect(EffectB);
        expect(testEnvironment.getEffect()).toEqual(EffectB);
    });

    it('should fail to correctly set effect due to invalid input', function() {
        EffectB = new Effect('heal', 8);
        testEnvironment.setEffect("fake effect");
        expect(testEnvironment.getEffect()).toEqual(EffectB);
        testEnvironment.setEffect(1234);
        expect(testEnvironment.getEffect()).toEqual(EffectB);
    });
});
