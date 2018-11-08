//full constructor tests
//empty constructor tests
//get/set message tests
// test displayMessage w/ full and empty NPC messages

var NPC = require('./npc.js');

describe('NPC', function() {
    let testNPC;

    //test default constructor

    describe('NPC', function() {
        it('should create a new enemy with create a npc with loc (0,0), maxhealth 10 health 10, status 1, and message empty string', function() {
            testNPC = NPC();
            expect(testNPC.getMessage()).toEqual('');
            expect(testNPC.getLocation()).toEqual(vector(0,0));
            expect(testNPC.getMaxHealth()).toEqual(10);
            expect(testNPC.getHealth()).toEqual(10);
            expect(testNPC.getStatus()).toEqual(1);
        });
    });

    //test full constructor

describe('NPC', function(_loc,_max,_hea,_stat,_msg) {
        it('should create a new enemy with create enemy with loc (1,1), maxhealth 20 health 0, status 0, message hello', function() {
            testNPC = NPC(vector(1,1), 20, 0, 0, 'hello');
            expect(testNPC.getMessage()).toEqual('hello');
            expect(testNPC.getLocation()).toEqual(vector(1,1));
            expect(testNPC.getMaxHealth()).toEqual(20);
            expect(testNPC.getHealth()).toEqual(0);
            expect(testNPC.getStatus()).toEqual(0);
        });
    });

    //test setDamage

    describe('setMessage', function(_msg) {
        testNPC = NPC();
        it('should set the NPCs message to sup and return 1', function() {
            expect(testNPC.setMessage('sup')).toEqual(1);
            expect(testNPC.getMessage()).toEqual('sup');
        });
        it('should not set the npcs message to 3 and then return 0', function() {
            expect(testNPC.setMessage(3)).toEqual(0);
            expect(testNPC.getMessage()).toEqual('sup');
        });
    });

    //test getDamage
    describe('getMessage', function() {
        testNPC = NPC();
        it('should return the NPCs message', function() {
            expect(testNPC.getMessage()).toEqual(0);
            testNPC.setMessage('hi');
            expect(testNPC.getMessage()).toEqual('hi');
        });
    });

    describe('displayMessage', function() {
        it('should print NPCs message to the screen and return 1', function() {
            testNPC = NPC(vector(0,0), 0, 0, 0, "Hey");
            expect(testNPC.displayMessage()).toEqual(1);
        });
        it('should not print the npcs empty message to the screen and then return 0', function() {
            testNPC = NPC();
            expect(testNPC.displayMessage()).toEqual(0);
        });
    });

});

