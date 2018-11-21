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

describe('Utility', function(){
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
    it('should create new vectors with values (0,0), (6,9), (12, 18)', function(){
        expect(testVector0.x).toEqual(0);
        expect(testVector0.y).toEqual(0);
        expect(testVector0.x).toEqual(6);
        expect(testVector1.y).toEqual(9);
        expect(testVector0.x).toEqual(12);
        expect(testVector1.y).toEqual(18);
    });

    it('should fail to create a vectors with invalid input', function(){
        testVector = new Vector('ten', testVector0);
        expect(testVector).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    it('should add vectors', function() {
        expect(testVector0.plus(testVector0)).toEqual(testVector0);
        expect(testVector0.plus(testVector1)).toEqual(testVector1);
        expect(testVector1.plus(testVector1)).toEqual(testVector2);
    });

    it('should fail to add vectors due to invalid input', function() {
        expect(testVector0.plus(5)).toEqual({});
        expect(testVector0.plus("testVector1")).toEqual({});
    });
});
