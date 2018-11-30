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
