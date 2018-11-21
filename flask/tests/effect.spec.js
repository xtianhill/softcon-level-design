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


//Type Checking and throw exception
const Effect = require('../static/effect.js');

describe('Effect', function(){
    let testEffect;

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */
    // Default Constructor Test


    beforeEach(function(){
        testEffect = new Effect('heal');
    })
    it('should construct a default effect', function(){
        expect((testEffect).getIsActive()).toBeFalsy();
        expect((testEffect).getEffect()).toEqual('heal');
    });

    it('should return null Effect because of integer input for title', function(){
      testEffect= new Effect(4);
      expect(testEffect).toEqual({});
    })

    it ('should return null Effect because of bad string input for title', function(){
      testEffect= new Effect('twerk');
      expect(testEffect).toEqual({});
    })
    /*
    |--------------------------------------------------------------------------
    | Activation Method Tests
    |--------------------------------------------------------------------------
    */

    it('should activate the effect', function(){
        testEffect.activate();
        expect(testEffect.getIsActive()).toBeTruthy();
    });

    it('should deactivate the effect', function(){
        (testEffect).activate();
        (testEffect).deactivate();
        expect((testEffect).getIsActive().toBeFalsy());
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    it('should get and set the title', function(){
        testEffect.setEffect('damage');
        expect(testEffect.getEffect()).toEqual('damage');
    });
});
