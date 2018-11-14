const Element = require('../static/element.js');
const Vector = require('../static/utility.js');

describe('Element', function() {
    let testElement;
    
    beforeEach(function() {
        testElement = new Element('pos', 'url', 'scl', 'hb');
      });
    
    it('should have constructed an element', function() {
        expect(testElement.getPosition()).toEqual('pos');
        expect(testElement.getSprite()).toEqual('url');
        expect(testElement.getSize()).toEqual('scl');
        expect(testElement.getHitbox()).toEqual('hb');
    });
    
    it('should set position and get position', function() {
        testElement.setPosition(new Vector(10,10));
        expect(testElement.getPosition()).toEqual(new Vector(10,10));
    });

    it('should set sprite and get sprite', function() {
        testElement.setSprite(new Vector(10,10));
        expect(testElement.getSprite()).toEqual(new Vector(10,10));
    });

    it('should set size and get size', function() {
        testElement.setSize(new Vector(10,10));
        expect(testElement.getSize()).toEqual(new Vector(10,10));
    });

    it('should set hitbox and get hitbox', function() {
        testElement.setHitbox(new Vector(10,10));
        expect(testElement.getHitbox()).toEqual(new Vector(10,10));
    });

});