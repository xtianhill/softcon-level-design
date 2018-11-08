/* Grid Prototype */

function Grid(width, height, title) {
    this.width = width;
    this.height = height;
    this.title = title;
    this.squares = defineSquares(width, height);
}

function defineSquares() {
    // make 2d array of proper size
}

Grid.prototype.setWidth = function(width){

};

Grid.prototype.getWidth = function(){

};

Grid.prototype.setHeight = function(height){

};

Grid.prototype.getHeight = function(){

};

Grid.prototype.setTitle = function(title){

};

Grid.prototype.getTitle = function(){

};

Grid.prototype.setSquares = function(squares){

};

Grid.prototype.getSquares = function(){

};

Grid.prototype.place = function(point, element){

}

Grid.prototype.delete = function(point){

}



module.exports = Grid;