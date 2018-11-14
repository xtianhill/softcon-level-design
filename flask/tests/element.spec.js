var Element = require('../static/element.js');

describe('Element', function() {
    let testElement;
    
    beforeEach(function() {
        testElement = new Element('pos', 'url', 'scl');
      });
    
    it('should have constructed an element', function() {
        expect(testElement.getPosition()).toEqual('pos');
        expect(testElement.getSprite()).toEqual('url');
        expect(testElement.getScale()).toEqual('scl');
    });
    
    it('should set position and get position', function() {
        testElement.setPosition(new Vector(10,10));
        expect(testElement.getPosition()).toEqual(new Vector(10,10));
        testElement.setPosition('invalid');
        expect(testElement.getPosition()).toEqual(new Vector(10,10));
    });

    it('should set sprite and get sprite', function() {
        testElement.setSprite(new Vector(10,10));
        expect(testElement.getSprite()).toEqual(new Vector(10,10));
        testElement.setSprite('invalid');
        expect(testElement.getSprite()).toEqual(new Vector(10,10));
    });

    it('should set scale and get scale', function() {
        testElement.setScale(new Vector(10,10));
        expect(testElement.getScale()).toEqual(new Vector(10,10));
        testElement.setScale('invalid');
        expect(testElement.getScale()).toEqual(new Vector(10,10));
    });

    it('should set hitbox and get hitbox', function() {
        testElement.setHitbox(new Vector(10,10));
        expect(testElement.getHitbox()).toEqual(new Vector(10,10));
        testElement.setHitbox('invalid');
        expect(testElement.getHitbox()).toEqual(new Vector(10,10));
    });

});