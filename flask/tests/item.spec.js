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
    | Constructor Tests
    |--------------------------------------------------------------------------
    */
    // Default Constructor Test
    beforeEach(function(){
        testItem = new Item('pos', 'url', 'sz', 'hbox', true, true);
    });

    // Full Constructor Tests
    it('should construct an item', function(){
        expect(testItem.getCollected()).toBeTruthy();
        expect(testItem.getEffect()).toBeTruthy();

    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */
    // setEffect and getEffect tests
    it('should set and get effect with valid input', function() {
        testItem.setEffect("airbender");
        expect(testItem.getEffect()).toBeTruthy();
    })


    it('should fail to set effect due to invalid input', function(){
    	testItem.setEffect(false);
    	expect(testItem.getEffect()).toBeFalsy();
    });

    it('should fail to set effect due to invalid input', function() {
        testItem.setEffect(300);
        expect(testItem.getEffect()).toBeFalsy();
    });

    // setCollected and getCollected tests
    it('should set and get collected with valid input', function(){
    	testItem.setCollected(false);
    	expect(testItem.getCollected()).toBeFalsy();
    });

    it('should fail to set collected due to invalid input', function() {
        testItem.setCollected("hooray");
        expect(testItem.getCollected()).toBeFalsy();
    })

});