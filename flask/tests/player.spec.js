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

describe('Player', function() {
    let testPlayer;
    let testItem;

     /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Default Constructor Test
    beforeEach(function(){
        testItem = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2),
                            new Vector(2,2), true, new Effect('heal'));
        testItem2 = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2),
                            new Vector(2,2), true, new Effect('damage'));
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem, [testItem],
                                new Vector(12,12), 'dummy_url', new Vector(3,3),
                                new Vector(0,0), 50, 80);
    });

    // Test full constructor
    it('should create a new player with loc (1,1), maxhealth 20 health 0, status 0, item testItem', function() {
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
        expect(testPlayer.getLocation()).toEqual(new Vector(1,1));
        expect(testPlayer.getMaxHealth()).toEqual(20);
        expect(testPlayer.getHealth()).toEqual(0);
        expect(testPlayer.getStatus()).toEqual(0);
    });

    it('should return an empty object due to invalid equippedItem', function() {
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, "fake_item", [testItem],
                              new Vector(12,12), 'dummy_url', new Vector(3,3),
                              new Vector(0,0), 50, 80);
        expect(testPlayer).toEqual({});
    });

    it('should return an empty object due to invalid Inventory', function() {
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem, [10,13,15],
                              new Vector(12,12), 'dummy_url', new Vector(3,3),
                              new Vector(0,0), 50, 80);
        expect(testPlayer).toEqual({});
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

    // test damage effect in useItem
    it('should active the effect of equippedItem', function(){
        testEnemy = new Enemy(new Vector(1,1), 20, 0, 0, 5, new Vector(10,10),
                              new Vector(10,10));
        testPlayer.setEquippedItem(testItem);
        testPlayer.useItem();
        expect(testEnemy.getHealth()).toEqual(testEnemy.getMaxHealth());
        expect(testEnemy.getHealth()).toEqual(20);
        expect(testEnemy.getEquippedItem()).toEqual(null);
        expect(testItem.getEffect().getIsActive()).toBeTruthy();
    });

    //test heal effect in useItem
    it('should test heal', function() {
        testPlayer.setEquippedItem(testItem);
        testPlayer.useItem();
        expect(testPlayer.getHealth()).toEqual(testPlayer.getMaxHealth());
        expect(testPlayer.getHealth()).toEqual(20);
        expect(testPlayer.getEquippedItem()).toEqual(null);
        expect(testItem.getEffect().getIsActive()).toBeTruthy();
    });

    // set items position to be relative to the player, add the item to inventory,
    // and set equipped item
    it('should pick up item', function(){
        testPlayer.pickUpItem(testItem2);
        expect(testPlayer.getEquippedItem().toEqual(testItem2));
        expect(testPlayer.getEquippedItem().getPosition().x).toEqual(11);
        expect(testPlayer.getEquippedItem().getPosition().y).toEqual(6);
        expect(testPlayer.getInventory()).toEqual([testItem, testItem2]);
    });
});
