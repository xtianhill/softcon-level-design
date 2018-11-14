// if it hits 0, status should change to 0 from 1

//full constructor tests
//empty constructor tests
//get/set message tests

const Vector = require('../static/utility.js');
const Character = require('../static/character.js');

describe('Character', function() {
    let testCharacter;

    //test default constructor
    beforeEach(function(){
        testCharacter = new Character(new Vector(1,1), 20, 10, 1, new Vector(10,10), 'url', 'size');
    });

    //test full constructor
    it('should create a new character with loc (1,1), maxhealth 20 health 0, status 0', function() {
        expect(testCharacter.getLocation()).toEqual(new Vector(1,1));
        expect(testCharacter.getMaxHealth()).toEqual(20);
        expect(testCharacter.getHealth()).toEqual(10);
        expect(testCharacter.getStatus()).toEqual(1);
        expect(testCharacter.getHitbox()).toEqual(new Vector(10,10));
    });

    //test setLocation
    it('should set the characters location to (1,1)', function() {
        testCharacter.setLocation(new Vector(1,1));
        expect(testCharacter.getLocation()).toEqual(new Vector(1,1));
    });

    //test get location
    it('should return the Characters location vector', function() {
        expect(testCharacter.getLocation()).toEqual(new Vector(1,1));
        testCharacter.setLocation(new Vector(2,2));
        expect(testCharacter.getLocation()).toEqual(new Vector(2,2));
    });

    //test setMaxHealth

    it('should set the characters max health to 20', function() {
        testCharacter.setMaxHealth(20);
        expect(testCharacter.getMaxHealth()).toEqual(20);
    });

    //test getMaxHealth
    it('should return the Characters max health', function() {
        expect(testCharacter.getMaxHealth()).toEqual(20);
        testCharacter.setMaxHealth(30);
        expect(testCharacter.getMaxHealth()).toEqual(30);
    });

    //test setHealth

    it('should set the characters health to 20', function() {
        testCharacter.setHealth(20);
        expect(testCharacter.getHealth()).toEqual(20);
    });

    //test getHealth
    it('should return the Characters health', function() {
        expect(testCharacter.getHealth()).toEqual(10);
        testCharacter.setHealth(1);
        expect(testCharacter.getHealth()).toEqual(1);
    });

    //test setStatus
    it('should set the charaters status to 3', function() {
        testCharacter.setStatus(3);
        expect(testCharacter.getStatus()).toEqual(3);
    });

    //test getStatus

    it('should return the Characters status', function() {
        expect(testCharacter.getStatus()).toEqual(1);
        testCharacter.setStatus(0);
        expect(testCharacter.getStatus()).toEqual(0);
    });
});