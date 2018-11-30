/*
|------------------------------------------------------------------------------
| Tests for Player Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Player class.
| We test input for each method. Thorough testing on the constructor is used
| to verify input to all methods that are not setter methods. Since Player is
| a subclass of Character, any constructor input or setter methods that are
| input-validated in Character are not re-tested here.
|
|------------------------------------------------------------------------------
*/

var Player = require('../static/player.js');
var Item = require('../static/item.js');
var Vector = require('../static/utility.js');
var Effect = require('../static/effect.js');
var Enemy = require('../static/enemy.js');
var Character = require('../static/character.js');

describe('Player', function() {
    let testPlayer;
    let testItem;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testItem = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2),
                            new Vector(2,2), true, new Effect('heal', 10), new Vector(0,0), false);
        testItem2 = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2),
                            new Vector(2,2), true, new Effect('damage', 10), new Vector(0,0), false);
        testPlayer = new Player(new Vector(1,1), 20, 10, true, testItem, [testItem],
                                new Vector(12,12), 'dummy_url', new Vector(3,3),
                                new Vector(0,0), 50, 80, new Vector(0,0));
        testVector1 = new Vector(6, 9);
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Test Full Constructor
    it('should create a new player with loc (1,1), maxhealth 20 health 0, status 0, item testItem', function() {
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
        expect(testPlayer.getPosition()).toEqual(new Vector(1,1));
        expect(testPlayer.getMaxHealth()).toEqual(20);
        expect(testPlayer.getHealth()).toEqual(10);
        expect(testPlayer.getStatus()).toEqual(true);
    });

    /*
    |--------------------------------------------------------------------------
    | Setter and Getter Tests
    |--------------------------------------------------------------------------
    */

    //test setInventory and getInventory
    it('should set Inventory to a test Item and get Inventory', function() {
        testPlayer.setInventory([testItem2]);
        expect(testPlayer.getInventory()).toEqual([testItem2]);
    })

    it('should fail to set Inventory due to an Inventory composed of non-Items', function() {
        testPlayer.setInventory(["sword", "dried fruit", "water bottle", "hat"]);
        expect(testPlayer.getInventory()).toEqual([testItem]);
    })

    it('should fail to set Inventory due to an Inventory that is not a list', function() {
        testPlayer.setInventory("sword");
        expect(testPlayer.getInventory()).toEqual([testItem]);
    })

    //test setEquippedItem
    it('should set equippedItem to testItem2', function() {
        testPlayer.setEquippedItem(testItem2);
        expect(testPlayer.getEquippedItem()).toEqual(testItem2);
    });

    it('should fail to set equippedItem due to invalid input', function() {
        testPlayer.setEquippedItem('blah');
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
    });

    /*
    |--------------------------------------------------------------------------
    | Use Item Tests
    |--------------------------------------------------------------------------
    */

    // set items position to be relative to the player, add the item to inventory,
    // and set equipped item
    it('should pick up item', function(){
        testPlayer.pickUpItem(testItem2);
        expect(testPlayer.getEquippedItem()).toEqual(testItem2);
        expect(testPlayer.getInventory()).toEqual([testItem2,testItem]);
    });

});
