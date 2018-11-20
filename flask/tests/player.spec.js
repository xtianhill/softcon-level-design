//test default constructor
// test constructor

//test getItAr
//test setItAr

//test 

//full constructor tests
//empty constructor tests
//get/set message tests

var Player = require('../static/player.js');
var Item = require('../static/item.js');
var Vector = require('../static/utility.js');
var Effect = require('../static/effect.js');

describe('Player', function() {
    let testPlayer;
    
    let testItem;
    
    beforeEach(function(){
        testItem = new Item('pos', 'url', 'sz', 'hbox', true, new Effect('fire'));
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem, [testItem], 'hbox', 'rul', 'size', 'speed');

    });

    //test full constructor

    it('should create a new player with loc (1,1), maxhealth 20 health 0, status 0, item testItem', function() {
        
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
        expect(testPlayer.getLocation()).toEqual(new Vector(1,1));
        expect(testPlayer.getMaxHealth()).toEqual(20);
        expect(testPlayer.getHealth()).toEqual(0);
        expect(testPlayer.getStatus()).toEqual(0);
    });

    //test setInventory and getInventory
    it('should test setInventory', function() {
        testPlayer.setInventory(["sword", "dried fruit", "water bottle", "hat"]);
        expect(testPlayer.getInventory()).toEqual(["sword", "dried fruit", "water bottle", "hat"]);
    })


    //test setEquippedItem

    it('should set the Players owned item to testitem', function() {
        testPlayer.setEquippedItem(testItem);
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
    });

    //test getEquippedItem
    it('should not set item if type isnt item', function() {
        testPlayer.setEquippedItem('blah');
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
    });

    // test useItem -> dont know if effects will be functions, or just have titles that useItem
    // will switch between at this point, so.. for now will say it activates effect
    it('should use item', function(){
        testItem.setEffect(new Effect('fire'));
        testPlayer.setEquippedItem(testItem);
        testPlayer.useItem();
        expect(testItem.getEffect().getIsActive()).toBeTruthy();
    });

    //test heal effect in useItem
    it('should test heal', function() {
        testItem.setEffect(new Effect('heal'));
        testPlayer.setEquippedItem(testItem);
        testPlayer.useItem();
        expect(testPlayer.getHealth()).toEqual(testPlayer.getMaxHealth());
        expect(testPlayer.getHealth()).toEqual(20);
        expect(testPlayer.getEquippedItem()).toEqual(null);
    });

    // set items position to be relative to the player, add the item to inventory, 
    // and set equipped item
    it('should pick up item', function(){
        var newItem = new Item(new Vector(0,0), 'url', 'sz', 'hbox', true, new Effect('fire'));
        testPlayer.pickUpItem(newItem);
        expect(testPlayer.equippedItem).toEqual(newItem);
        expect(testPlayer.equippedItem.pos.x).toEqual(11);
        expect(testPlayer.equippedItem.pos.y).toEqual(6);
        expect(testPlayer.inventory).toEqual([testItem, newItem]);

    });


});