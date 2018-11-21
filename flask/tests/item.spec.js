/*
|------------------------------------------------------------------------------
| Tests for Item Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Item class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

var Item = require('../static/item.js');
describe('Item', function(){
    let testItem;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testItem = new Item('pos', 'url', 'sz', 'hbox', true, new Effect('heal'));
    });


    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should construct an item', function(){
        expect(testItem.getCollected()).toBeTruthy();
        expect(testItem.getEffect()).toBeTruthy();
    });

    // Invalid Input Constructor Tests
    it('should fail to construct an item due to invalid input for collected', function(){
        testItem = new Item('pos', 'url', 'sz', 'hbox', 19, new Effect('heal'));
        expect(testItem).toEqual({});
    });

    it('should fail to construct an item due to invalid input for effect', function(){
        testItem = new Item('pos', 'url', 'sz', 'hbox', true, "wrong");
        expect(testItem).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    // setEffect and getEffect Tests
    it('should set and get effect with valid input', function() {
        testItem.setEffect(new Effect('damage'));
        expect(testItem.getEffect()).toEqual('damage');;
    })

    it('should fail to set effect due to invalid input', function(){
    	testItem.setEffect(false);
    	expect(testItem.getEffect()).toEqual('heal');
    });

    it('should fail to set effect due to invalid input', function() {
        testItem.setEffect(300);
        expect(testItem.getEffect()).toEqual('heal');
    });

    // setCollected and getCollected tests
    it('should set and get collected with valid input', function(){
    	testItem.setCollected(false);
    	expect(testItem.getCollected()).toBeFalsy();
    });

    it('should fail to set collected due to invalid input', function() {
        testItem.setCollected("hooray");
        expect(testItem.getCollected()).toBeTruthy();
    })

});
