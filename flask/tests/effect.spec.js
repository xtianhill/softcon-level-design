const Effect = require('../static/effect.js');

describe('Effect', function(){
    let testEffect;

    beforeEach(function(){
        testEffect = new Effect('fire');
    })
    it('should construct a default effect', function(){
        expect(testEffect.getIsActive()).toBeFalsy();
        expect(testEffect.getEffect()).toEqual('fire');
    });
    
    it('should activate the effect', function(){
        testEffect.activate();
        expect(testEffect.getIsActive()).toBeTruthy();
    });
    
    it('should deactivate the effect', function(){
        testEffect.activate();
        testEffect.deactivate();
        expect(testEffect.getIsActive().toBeFalsy);
    });

    it('should get and set the title', function(){
        testEffect.setEffect('ice!');
        expect(testEffect.getEffect()).toEqual('ice!');
    }); 
});