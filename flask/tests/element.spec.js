const Element = require('../static/element.js');
const Vector = require('../static/utility.js');

describe('Element', function() {
    let testElement;
    
    beforeEach(function() {
        testElement = new Element(new Vector(0,0), "dummyUrl", new Vector(50,50), new Vector(50,50));
      });
    
    it('should have constructed an element with given specifications', function() {
        expect(testElement.getPosition()).toEqual(new Vector(0,0));
        expect(testElement.getSprite()).toEqual('dummyUrl');
        expect(testElement.getSize()).toEqual(new Vector(50,50));
        expect(testElement.getHitbox()).toEqual(new Vector(50,50));
    });

    it('should return an empty object due to invalid position', function() {
        testElement= new Element(4, "dummyUrl", new Vector(50,50), new Vector(50,50));
        expect(testElement).toEqual({});
    });
    
    it('should return an empty object due to invalid url', function() {
        testElement= new Element(new Vector(0,0), 4, new Vector(50,50), new Vector(50,50));
        expect(testElement).toEqual({});
    });

    it('should return an empty object due to invalid scale', function() {
        testElement= new Element(new Vector(0,0), "dummyUrl", 3, new Vector(50,50));
        expect(testElement).toEqual({});
    });

    it('should return an empty object due to invalid hitbox', function() {
        testElement= new Element(new Vector(0,0), "dummyUrl", new Vector(50,50), 3);
        expect(testElement).toEqual({});
    });
    

    it('should set position and get position', function() {
        testElement.setPosition(new Vector(10,10));
        expect(testElement.getPosition()).toEqual(new Vector(10,10));
    });

    it('should fail to set position due to invalid input', function() {
        testElement.setPosition(3);
        expect(testElement.getPosition()).toEqual(new Vector(0,0));
    });

    it('should set sprite and get sprite', function() {
        testElement.setSprite("aSprite");
        expect(testElement.getSprite()).toEqual("aSprite");
    });

    it('should fail to set sprite due to invalid input', function() {
        testElement.setSprite(3);
        expect(testElement.getSprite()).toEqual("dummyUrl");
    });

    it('should set size and get size', function() {
        testElement.setSize(new Vector(10,10));
        expect(testElement.getSize()).toEqual(new Vector(10,10));
    });

    it('should fail to set size due to invalid input', function() {
        testElement.setSize(3);
        expect(testElement.getSize()).toEqual(new Vector(50,50));
    });

    it('should set hitbox and get hitbox', function() {
        testElement.setHitbox(new Vector(10,10));
        expect(testElement.getHitbox()).toEqual(new Vector(10,10));
    });

    it('should fail to set hitbox due to invalid input', function() {
        testElement.setHitbox(3);
        expect(testElement.getHitbox()).toEqual(new Vector(50,50));
    });

});