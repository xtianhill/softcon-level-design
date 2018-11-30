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
var Player = require('../static/player.js');
var Vector = require('../static/utility.js');
var Effect = require('../static/effect.js');
const Enemy = require('../static/enemy.js');

describe('Item', function(){
    let testItem;
    let testPlayer;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testItem = new Item('pos', 'url', 'sz', 'hbox', true, new Effect('heal', 10));
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem, [testItem],
                                new Vector(12,12), 'dummy_url', new Vector(3,3),
                                new Vector(0,0), 50, 80);
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
        testItem = new Item('pos', 'url', 'sz', 'hbox', 19, new Effect('heal', 9));
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
        testEffect1 = new Effect('damage', 10);
        testItem.setEffect(testEffect1);
        expect((testItem.getEffect()).getEffect()).toEqual('damage');;
    })

    it('should fail to set effect due to invalid input', function(){
    	testItem.setEffect(false);
    	expect((testItem.getEffect()).getEffect()).toEqual('heal');
    });

    it('should fail to set effect due to invalid input', function() {
        testItem.setEffect(300);
        expect((testItem.getEffect()).getEffect()).toEqual('heal');
    });

    // setCollected and getCollected tests
    it('should set and get collected with valid input', function(){
    	testItem.setCollected(false);
    	expect(testItem.getCollected()).toBeFalsy();
    });

    it('should fail to set collected due to invalid input', function() {
        testItem.setCollected("hooray");
        expect(testItem.getCollected()).toBeTruthy();
    });

    /*
    |--------------------------------------------------------------------------
    | Hover and Update Tests
    |--------------------------------------------------------------------------
    */

    // hover test
    it('should make item hover with valid input', function() {
        testItem.hover(0.05);
        shouldWobble = (2 * 0.05 + testItem.wobble) - 0.1;
        expect(testItem.wobble).toEqual(shouldWobble);
    });

    it('should fail to make item hover due to invalid input', function() {
        testItem.hover(false);
        originalWobbleValue = testItem.wobble;
        expect(testItem.wobble).toEqual(originalWobbleValue);
    });
    
    // update test
    // it('should update item position with valid input'), function() {
    //     testItem.updatePosition(testPlayer.dir).

});


