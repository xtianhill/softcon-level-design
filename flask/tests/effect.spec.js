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

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testEffect = new Effect('heal');
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
      testEffect= new Effect(4);
      expect(testEffect).toEqual({});
    });

    it ('should return null Effect because of bad string input for title', function(){
      testEffect= new Effect('twerk');
      expect(testEffect).toEqual({});
    });

    it ('should return null Effect because of bad booleam input', function(){
      testEffect = new Effect('hello', 'heal');
      expect(testEffect).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    it('should get and set the title', function(){
        testEffect.setEffect('damage');
        expect((testEffect).getEffect()).toEqual('damage');
    });

    it('should fail to set the title because of bad string input for title', function(){
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
});
