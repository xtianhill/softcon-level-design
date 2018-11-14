
// if it hits 0, status should change to 0 from 1

//full constructor tests
//empty constructor tests
//get/set message tests

const Vector = require('../static/utility.js').vector;
var Character = require('../static/character.js');

describe('Character', function() {
    let testCharacter;

    //test default constructor
    beforeEach(function(){
        testCharacter = Character();
    });
    it('should create a new character with with loc (0,0), maxhealth 10 health 10, and status 1', function() {
        expect(testCharacter.getLocation()).toEqual(new Vector(0,0));
        expect(testCharacter.getMaxHealth()).toEqual(10);
        expect(testCharacter.getHealth()).toEqual(10);
        expect(testCharacter.getStatus()).toEqual(1);
    });

    //test full constructor
    it('should create a new character with loc (1,1), maxhealth 20 health 0, status 0', function() {
        testCharacter = Character(new Vector(1,1), 20, 0, 0, new Vector(10,10));
        expect(testCharacter.getLocation()).toEqual(new Vector(1,1));
        expect(testCharacter.getMaxHealth()).toEqual(20);
        expect(testCharacter.getHealth()).toEqual(0);
        expect(testCharacter.getStatus()).toEqual(0);
        expect(testCharacter.getHitbox()).toEqual(new Vector(1,1));
    });

    //test setLocation
    it('should set the characters location to (1,1) and return 1', function() {
        expect(testCharacter.setLocation(new Vector(1,1))).toEqual(1);
        expect(testCharacter.getLocation()).toEqual(vector(1,1));
    });
    it('should not set the characters location to (-1, -1) and then return 0', function() {
        expect(testCharacter.setLocation(new Vector(-1,-1))).toEqual(0);
        expect(testCharacter.getLocation()).toEqual(vector(1,1));
    });

    //test get location
    it('should return the Characters location vector', function() {
        expect(testCharacter.getLocation()).toEqual(new Vector(0,0));
        testCharacter.setLocation(new Vector(1,1));
        expect(testCharacter.getLocation()).toEqual(new Vector(1,1));
    });

    //test setMaxHealth

    it('should set the characters max health to 20 and return 1', function() {
        expect(testCharacter.setMaxHealth(20)).toEqual(1);
        expect(testCharacter.getMaxHealth()).toEqual(20);
    });
    it('should not set the characters max health to -1 and then return 0', function() {
        expect(testCharacter.setMaxHealth(-1)).toEqual(0);
        expect(testCharacter.getMaxHealth()).toEqual(20);
    });

    //test getMaxHealth
    it('should return the Characters max health', function() {
        expect(testCharacter.getMaxHealth()).toEqual(10);
        testCharacter.setMaxHealth(20);
        expect(testCharacter.getMaxHealth()).toEqual(20);
    });

    //test setHealth

    it('should set the characters health to 20 and return 1', function() {
        expect(testCharacter.setHealth(20)).toEqual(1);
        expect(testCharacter.getHealth()).toEqual(20);
    });
    it('should set the characters health to -1 and then return 1', function() {
        expect(testCharacter.setHealth(-1)).toEqual(1);
        expect(testCharacter.getMaxHealth()).toEqual(-1);
    });

    //test getHealth
    it('should return the Characters health', function() {
        expect(testCharacter.getHealth()).toEqual(10);
        testCharacter.setHealth(1);
        expect(testCharacter.getMaxHealth()).toEqual(1);
    });

    //test setStatus

    it('should set the characters status to 0 and return 1', function() {
        expect(testCharacter.setStatus(0)).toEqual(1);
        expect(testCharacter.getStatus()).toEqual(0);
    });
    it('should not set the charaters status to 3 and then return 0', function() {
        expect(testCharacter.setStatus(3)).toEqual(0);
        expect(testCharacter.getStatus()).toEqual(0);
    });

    //test getStatus

    it('should return the Characters status', function() {
        expect(testCharacter.getStatus()).toEqual(1);
        testCharacter.setStatus(0);
        expect(testCharacter.getStatus()).toEqual(0);
    });

    //test decHealth
    it('should decrement the health of the character by the given amount and return 1', function(_amount) {
        testCharacter = Character();
        expect(testCharacter.decHealth(1)).toEqual(1);
        expect(testCharacter.getHealth()).toEqual(9);
    });
    it('should decrement health by 100, return 1, change status to 0', function() {
        testCharacter = Character();
        expect(testCharacter.decHealth()).toEqual(1);
        expect(testCharacter.getHealth()).toEqual(-90);
        expect(testCharaceter.getStatus()).toEqual(0);
    });
});

