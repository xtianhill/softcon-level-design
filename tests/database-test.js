const storeGrid = require('../database.js').storeGrid;
// const getByTitle = require('../database.js').getByTitle;

/*
 * Tests for Grid.toJSON()
 */

var element1 = {xCoord:0, yCoord:0, sprite:""};
var element2 = {xCoord:5, yCoord:5, sprite:""};

var grid0 = {};
var grid1 = {width:10, height:10, title:"test grid 1", squares:[[]]};
var grid2 = {width:100, height:100, title:"test grid 2", squares:[[element1, element2]]};

var gridJSON0 = "{type:\"grid\",{}}";
var gridJSON1 = "{type:\"grid\",{\"width\":10,\"height\":10,\"title\":\"test grid 1\",\"squares\":[[]]}}";
var gridJSON2 = "{type:\"grid\",{\"width\":100,\"height\":100,\"title\":\"test grid 2\",\"squares\":[[{\"xCoord\":0,\"yCoord\":0,\"sprite\":\"\"},{\"xCoord\":5,\"yCoord\":5,\"sprite\":\"\"}]]}}";

describe('toJSON', () => {
    it('empty grid to JSON', () => {
        const result = grid0.toJSON();
        const expected = "{type:\"grid\",{}}";
        expect(result).toBe(expected);
    })
    it('grid with no elements to JSON', () => {
        const result = grid1.toJSON();
        const expected = "{type:\"grid\",{\"width\":10,\"height\":10,\"title\":\"test grid 1\",\"squares\":[[]]}}";
        expect(result).toBe(expected);
    })
    it('grid with two elements to JSON', () => {
        const result = grid2.toJSON();
        const expected = "{type:\"grid\",{\"width\":100,\"height\":100,\"title\":\"test grid 2\",\"squares\":[[{\"xCoord\":0,\"yCoord\":0,\"sprite\":\"\"},{\"xCoord\":5,\"yCoord\":5,\"sprite\":\"\"}]]}}";
        expect(result).toBe(expected);
    })
})

describe('toGrid', () => {
    it('empty grid JSON to grid object', () => {
        const result = toGrid(gridJSON0);
        const expected = grid0;
        expect(result).toBe(expected);
    })
    it('grid JSON with no elements to grid object', () => {
        const result = toGrid(gridJSON1);
        const expected = grid1;
        expect(result).toBe(expected);
    })
    it('grid JSON with two elements to grid object', () => {
        const result = toGrid(gridJSON2);
        const expected = grid2;
        expect(result).toBe(expected);
    })
})

describe('storeGrid', () => {
    it('stores empty grid', () => {
        const result = storeGrid(grid0);
        const expected = false;
        expect(result).toBe(expected);
    })
    it('stores grid with no elements', () => {
        const result = storeGrid(grid0);
        const expected = true;
        expect(result).toBe(expected);
    })
    it('stores grid with two elements', () => {
        const result = storeGrid(grid0);
        const expected = true;
        expect(result).toBe(expected);
    })
})

describe('getByTitle', () => {
    it('get grid with empty title', () => {
        const result = getByTitle("");
        const expected = grid0;
        expect(result).toBe(expected);
    })
    it('get grid with title \'test grid 1\'', () => {
        const result = getByTitle("test grid 1")
        const expected = grid1;
        expect(result).toBe(expected);
    })
    it('get grid with title \'test grid 2\'', () => {
        const result = getByTitle("test grid 2")
        const expected = grid2;
        expect(result).toBe(expected);
    })
})