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
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem, [], 'hbox', 'rul', 'size', 'speed');

    });

    //test full constructor

    it('should create a new player with loc (1,1), maxhealth 20 health 0, status 0, item testItem', function() {
        
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
        expect(testPlayer.getLocation()).toEqual(new Vector(1,1));
        expect(testPlayer.getMaxHealth()).toEqual(20);
        expect(testPlayer.getHealth()).toEqual(0);
        expect(testPlayer.getStatus()).toEqual(0);
    });

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

});