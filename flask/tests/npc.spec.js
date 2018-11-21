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
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testNPC = new NPC(new Vector(10,10),15, 15, 1, "hi", new Vector(50,50), null, new Vector(50,50));
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should construct a new NPC', function() {
        expect(testNPC.getMessage()).toEqual("hi");
    });

    it('should fail to construct a new NPC due to invalid input', function(){
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
});
