//full constructor tests
//empty constructor tests
//get/set message tests
// test displayMessage w/ full and empty NPC messages

/*
|------------------------------------------------------------------------------
| Tests for NPC Class
|------------------------------------------------------------------------------
|
| This file contains tests for the NPC class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods. Since NPC is
| a subclass of Character, any constructor input or setter methods that are
| input-validated in Character are not re-tested here.
|
|------------------------------------------------------------------------------
*/


var Vector = require('../static/utility.js');
var NPC = require('../static/npc.js');

describe('NPC', function() {
    let testNPC;

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */
    // Default Constructor Test
    beforeEach(function(){
        testNPC = new NPC(new Vector(10,10),15, 15, 1, "hi", new Vector(50,50), null, new Vector(50,50));
    })

    // Full Constructor Tests
    it('should create a new with given stats', function() {
        expect(testNPC.getMessage()).toEqual("hi");
        expect(testNPC.getPosition()).toEqual(new Vector(10,10));
        expect(testNPC.getMaxHealth()).toEqual(15);
        expect(testNPC.getHealth()).toEqual(15);
        expect(testNPC.getStatus()).toEqual(1);
        expect(testNPC.getHitbox()).toEqual(new Vector(50,50));
        expect(testNPC.getSprite()).toBeNull();
        expect(testNPC.getSize()).toEqual(new Vector(50,50));

    });

    it('should set message to null due to invalid input', function(){
        testNPC = new NPC(new Vector(10,10),15, 15, 1, 2, new Vector(50,50), null, new Vector(50,50)); 
        expect(testNPC).toEqual({});
    });


/*
    |--------------------------------------------------------------------------
    | Setter and Getter Tests
    |--------------------------------------------------------------------------
    */
    // setMessage and getMessage tests
    it('should set the NPCs message to sup', function() {
        testNPC.setMessage('sup');
        expect(testNPC.getMessage()).toEqual('sup');
    });

    it('should not set message to 2 and return null due to invalid input', function() {
        expect(testNPC.setMessage(2)).toBeNull();
        expect(testNPC.getMessage()).toEqual('hi');
    });


    it('should test setMessage and getMessage with valid input', function() {
        expect(testNPC.getMessage()).toEqual('hi');
        testNPC.setMessage('okay');
        expect(testNPC.getMessage()).toEqual('okay');
    });


    it('should fail to set the message due to invalid input', function() {
        testNPC.setMessage(false);
        expect(testNPC.getMessage()).toEqual('okay');
    });
    

});

