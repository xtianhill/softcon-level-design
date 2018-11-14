const Enviroment = require('./environment.js');

describe('Enviroment', function(){
    let testEnvironment;
    beforeEach(function(){
        testEnvironment = new Enviroment(true, 'pos', 'url', 'scl');
    })
    it('should construct an environment', function(){
        expect(testEnvironment.getSolid()).toBeTruthy();
        expect(testEnvironment.getPosition()).toEqual('pos');
        expect(testEnvironment.getSprite()).toEqual('url');
        expect(testEnvironment.getScale()).toEqual('scl');
    })
})