const Vector = require('../static/utility.js');

describe('Utility', function(){
    let testVector0;
    let testVector1;
    let testVector2;

    beforeEach(function(){
        testVector0 = new Vector(0, 0);
        testVector1 = new Vector(6, 9);
        testVector2 = new Vector(12, 18);
    })
    it('should construct a 0,0 vector', function(){
        expect(testVector0.x).toEqual(0);
        expect(testVector1.y).toEqual(9);
    });
    it('should add two vectors', function() {
        expect(testVector0.plus(testVector0)).toEqual(testVector0);
        expect(testVector0.plus(testVector1)).toEqual(testVector1);
        expect(testVector1.plus(testVector1)).toEqual(testVector2);
    });
});
