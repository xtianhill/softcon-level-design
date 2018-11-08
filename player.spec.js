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

describe('Player', function() {
    let testPlayer;
    let testItem;

    //test default constructor

    describe('Player', function() {
        it('should create a new player with loc (0,0), maxhealth 10 health 10, status 1, and null item', function() {
            testPlayer = Player();
            expect(testPlayer.getOwnedItem()).toBeNull();
            expect(testPlayer.getLocation()).toEqual(vector(0,0));
            expect(testPlayer.getMaxHealth()).toEqual(10);
            expect(testPlayer.getHealth()).toEqual(10);
            expect(testPlayer.getStatus()).toEqual(1);
        });
    });

    //test full constructor

describe('Player', function(_loc,_max,_hea,_stat,_item) {
        it('should create a new player with loc (1,1), maxhealth 20 health 0, status 0, item testItem', function() {
            testItem = Item();
            testPlayer = Player(vector(1,1), 20, 0, 0, testItem);
            expect(testPlayer.getOwnedItem()).toEqual(testItem);
            expect(testPlayer.getLocation()).toEqual(vector(1,1));
            expect(testPlayer.getMaxHealth()).toEqual(20);
            expect(testPlayer.getHealth()).toEqual(0);
            expect(testPlayer.getStatus()).toEqual(0);
        });
    });

    //test setOwnedItem

    describe('setOwnedItem', function(_item) {
        testPlayer = Player();
        testItem = Item();
        it('should set the Players owned item to testitem and return 1', function() {
            expect(testPlayer.setOwnedItem(testItem)).toEqual(1);
            expect(testPlayer.getOwnedItem()).toEqual(testItem);
        });
        it('should not set the players item to 3 and then return 0', function() {
            expect(testPlayer.setOwnedItem(3)).toEqual(0);
            expect(testPlayer.getOwneditem()).toEqual(testItem);
        });
    });

    //test getOwnedItem
    describe('getOwnedItem', function() {
        testPlayer = Player();
        testItem = Item();
        it('should return the players item', function() {
            expect(testPlayer.getOwnedItem()).toBeNull();
            testPlayer.setOwnedItem(testItem);
            expect(testPlayer.getOwnedItem()).toEqual(testItem);
        });
    });

});

