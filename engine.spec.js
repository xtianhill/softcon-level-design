const Engine = require('./engine.js');
const Grid = require('./grid.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js').vector;


describe('Engine', function(){
    let testEngine, testGrid, ctx;

    beforeEach(function(){
        ctx.drawImage = jasmine.createSpy('drawImageSpy');
  
        testGrid = new Grid(2,2,'title!');
        el1 = new Environment(true, new Vector(0,0), 'url', 'scl', new Vector(10,10));
        el2 = new Environment(true, new Vector(0,0), 'url', 'scl', new Vector(11,11));
        el3 = new Environment(true, new Vector(12,12), 'url', 'scl', new Vector(1,1));
        testGrid.place(new Vector(0,0), el1);
        testGrid.place(new Vector(0,1), el2);
        testGrid.place(new Vector(1,0), new Environment());
        testGrid.place(new Vector(1,1), new Environment());
        testEngine = new Engine(testGrid);

    });

    it('should construct an engine', function(){
        expect(testEngine.getGrid()).toEqual(new Grid(2,2,'title!'));
    });
    
    it('should draw each element on the grid at its position', function(){

        expect(ctx.drawImage).toHaveBeenCalledTimes(4);
    });
    
    it('should loop', function(){
        spyOn(testEngine.prototype, 'draw');
        spyOn(testEngine.prototype, 'update');
        expect(testEngine.draw).toHaveBeenCalled();
        expect(testEngine.update).toHaveBeenCalled();
    });

    it('should detect collisions', function(){
        var el4 = new Environment(true, new Vector(2,2), 'url', 'scl', new Vector(1,1));
        expect(testEngine.detectCollision(el1, el2)).toBeTruthy();
        expect(testEngine.detectCollision(el1, el3)).toBeFalsy();
        expect(testEngine.detectCollision(el1, el4)).toBeTruthy();
    });
});