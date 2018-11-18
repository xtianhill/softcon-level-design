//full constructor tests
//empty constructor tests
//get/set message tests
// test displayMessage w/ full and empty NPC messages
var Vector = require('../static/utility.js');
var NPC = require('../static/npc.js');

describe('NPC', function() {
    let testNPC;
    beforeEach(function(){
        testNPC = new NPC(new Vector(10,10),15, 15, 1, "hi", new Vector(50,50), null, new Vector(50,50));
    })
    //test constructor

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


    //test get setMessage

    it('should set the NPCs message to sup', function() {
        testNPC.setMessage('sup');
        expect(testNPC.getMessage()).toEqual('sup');
    });

    it('should not set message to 2 and return null', function() {
        expect(testNPC.setMessage(2)).toBeNull();
        expect(testNPC.getMessage()).toEqual('hi');
    });


    //test getMessage
    it('should return the NPCs message', function() {
        expect(testNPC.getMessage()).toEqual('hi');
        testNPC.setMessage('okay');
        expect(testNPC.getMessage()).toEqual('okay');
    });

   
    

});

