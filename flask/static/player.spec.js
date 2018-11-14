//test default constructor
// test constructor

//test getItAr
//test setItAr

//test 

//full constructor tests
//empty constructor tests
//get/set message tests

var Player = require('./player.js');
var Item = require('./item.js');
var Vector = require('./utility.js');
var Effect = require('./effect.js');

describe('Player', function() {
    let testPlayer;
    let testItem;

    beforeEach(function(){
        testPlayer = new Player();
        testItem = new Item();
    });
    //test default constructor

    it('should create a new player with loc (0,0), maxhealth 10 health 10, status 1, and null item', function() {
        expect(testPlayer.getOwnedItem()).toBeNull();
        expect(testPlayer.getLocation()).toEqual(new Vector(0,0));
        expect(testPlayer.getMaxHealth()).toEqual(10);
        expect(testPlayer.getHealth()).toEqual(10);
        expect(testPlayer.getStatus()).toEqual(1);
    });


    //test full constructor

    it('should create a new player with loc (1,1), maxhealth 20 health 0, status 0, item testItem', function() {
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem);
        expect(testPlayer.getOwnedItem()).toEqual(testItem);
        expect(testPlayer.getLocation()).toEqual(new Vector(1,1));
        expect(testPlayer.getMaxHealth()).toEqual(20);
        expect(testPlayer.getHealth()).toEqual(0);
        expect(testPlayer.getStatus()).toEqual(0);
    });

    //test setOwnedItem

    it('should set the Players owned item to testitem and return 1', function() {
        expect(testPlayer.setOwnedItem(testItem)).toEqual(1);
        expect(testPlayer.getOwnedItem()).toEqual(testItem);
    });
    it('should not set the players item to 3 and then return 0', function() {
        expect(testPlayer.setOwnedItem(3)).toEqual(0);
        expect(testPlayer.getOwnedItem()).toEqual(testItem);
    });

    //test getOwnedItem
    it('should return the players item', function() {
        expect(testPlayer.getOwnedItem()).toBeNull();
        testPlayer.setOwnedItem(testItem);
        expect(testPlayer.getOwnedItem()).toEqual(testItem);
    });

    // test useItem -> dont know if effects will be functions, or just have titles that useItem
    // will switch between at this point, so.. for now will say it activates effect
    it('should use item', function(){
        testItem.setEffect(new Effect('fire'));
        testPlayer.setOwnedItem(testItem);
        testPlayer.useItem();
        expect(testItem.getEffect().getIsActive()).toBeTruthy();
    });

});

