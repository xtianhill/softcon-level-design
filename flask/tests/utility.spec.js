/*
|------------------------------------------------------------------------------
| Tests for Vector Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Vector class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const Vector = require('../static/utility.js');

describe('Effect', function(){
    let testVector0;
    let testVector1;
    let testVector2;

     /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */
    // Default Constructor Test
    beforeEach(function(){
        testVector0 = new Vector(0, 0);
        testVector1 = new Vector(6, 9);
        testVector2 = new Vector(12, 18);
    })

    // Full Constructor Tests
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