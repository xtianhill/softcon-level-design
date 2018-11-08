const Effect = require('./effect.js');

describe('Effect', function(){
    let testEffect;

    beforeEach(function(){
        testEffect = new Effect();
    })
    it('should construct a default effect', function(){
        expect(testEffect.getIsActive()).toBeFalsy();
    });
    
    it('should construct an effect', function(){
        testEffect = new Effect(true);
        expect(testEffect.getIsActive()).toBeTruthy();
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
});