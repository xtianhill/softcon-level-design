const Enviroment = require('./environment.js');
const vector = require('./utility.js').vector;

describe('Environment', function(){
    let testEnvironment;
    beforeEach(function(){
        testEnvironment = new Enviroment(true, new vector(1,1), null, new vector(50,10), new vector(20,50));
    })
    it('should construct an environment', function(){
        expect(testEnvironment.getSolid()).toBeTruthy();
        expect(testEnvironment.getPosition()).toEqual(new vector(1,1));
        expect(testEnvironment.getSprite()).toEqual(null);
        expect(testEnvironment.getScale()).toEqual(new vector(50,10));
        expect(testEnvironment.getHitbox()).toEqual(new vector(20,50));
    })


    it('should correctly set and get solid', function(){
        testEnvironment.setSolid(false);
        expect(testEnvironment.getSolid()).toBeFalsy();

    })
})
