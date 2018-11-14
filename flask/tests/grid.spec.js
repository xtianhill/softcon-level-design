const Grid = require('../static/grid.js');
const Element = require('../static/element.js');
const Vector = require('../static/utility.js').vector;

describe('Grid', function(){
    let testGrid;

    beforeEach(function(){
        testGrid = new Grid(5,5,'test');
    });

    it('should construct a grid', function(){
        expect(testGrid.getWidth()).toEqual(5);
        expect(testGrid.getHeight()).toEqual(5);
        expect(testGrid.getTitle()).toEqual('test');
    });

    describe('defineSquares', function() {
        it('should define an array [height][width]', function(){
            var expectedGrid = [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']];
            expect(testGrid.getSquares()).toEqual(expectedGrid);
        });
    });

    it('should place an element at a given point', function(){
        var testElement = new Element('pos', 'url', 'scl');
        testGrid.place(new Vector(1,1), testElement);
        expect(testGrid.getSquares()[1][1]).toEqual(testElement);
    });

    it('should delete element at given point', function(){
        var testElement = new Element('pos', 'url', 'scl');
        testGrid.place(new Vector(1,1), testElement);
        testGrid.delete(new Vector(1,1));
        expect(testGrid.getSquares()[1][1]).toEqual('');
    })

    it('should set width and get width', function() {
        testGrid.setWidth('newWidth');
        expect(testGrid.getWidth()).toEqual('newWidth');
    });

    it('should set height and get height', function() {
        testGrid.setHeight('newHeight');
        expect(testGrid.getHeight()).toEqual('newHeight');
    });

    it('should set title and get title', function() {
        testGrid.setTitle('newTitle');
        expect(testGrid.getTitle()).toEqual('newTitle');
    });

    it('should set squares and get squares', function() {
        testGrid.setSquares('newSquares');
        expect(testGrid.getSquares()).toEqual('newSquares');
    });

});