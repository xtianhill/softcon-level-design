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
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testVector0 = new Vector(0, 0);
        testVector1 = new Vector(6, 9);
        testVector2 = new Vector(12, 18);
        testVector3 = new Vector(72, 162);
    })

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should create new vectors with values (0,0), (6,9), (12, 18)', function(){
        expect(testVector0).toEqual(new Vector(0, 0));
        expect(testVector1).toEqual(new Vector(6, 9));
        expect(testVector2).toEqual(new Vector(12, 18));
    });

    it('should fail to create a vectors with invalid input', function(){
        testVector = new Vector('ten', testVector0);
        expect(testVector).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Plus Tests
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

    it('should multiply vectors', function() {
        expect(testVector1.times(testVector2)).toEqual(testVector3);
        expect(testVector0.times(testVector3)).toEqual(testVector0);
    });

    it('should multiply a vector times a number', function() {
        expect(testVector0.times(13)).toEqual(testVector0);
        expect(testVector1.times(2)).toEqual(testVector2);
    });
});
