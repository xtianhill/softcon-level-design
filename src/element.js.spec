var Element = require('./element.js');
var expect = require('chai').expect;

describe('Element', function() {
    let testElement;

    describe('add1', function() {
        testElement = new Element('pos', 'url', 'scl', 'spd');
        it('should add 1 to bar when called', function() {
            testElement.add1();
            expect(testElement.bar).to.equal(2);
        });
    });
});