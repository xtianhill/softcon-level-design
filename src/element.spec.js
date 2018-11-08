var Element = require('./element.js');

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
        testElement.setPosition('newPos');
        expect(testElement.getPosition()).toEqual('newPos');
    });

    it('should set sprite and get sprite', function() {
        testElement.setSprite('newUrl');
        expect(testElement.getSprite()).toEqual('newUrl');
    });

    it('should set scale and get scale', function() {
        testElement.setScale('newScale');
        expect(testElement.getScale()).toEqual('newScale');
    });

});