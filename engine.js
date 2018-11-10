/* basic engine prototype */

function Engine(grid){
    this.grid = grid;
}

Engine.prototype.setGrid = function(grid){
    this.grid = grid;
}

Engine.prototype.getGrid = function(){
    return this.grid;
}

Engine.prototype.update = function(progress) {
    // use progress to ensure smooth animations
    // udpate any elements in level since last render
    // need to deal with effects, collision detection, etc etc
}

Engine.prototype.detectCollision = function(element1, element2){
    // does element1 hit element2? return true if yes
}

Engine.prototype.draw = function(){
<<<<<<< HEAD
    // draw the state of the game
=======
    // draw the state of the game 
>>>>>>> 10ee85201db3947c3e617fe81d28668b96194fc9
    // draw every element at its position
}

Engine.prototype.loop = function(){
    // game loop
<<<<<<< HEAD
    var progress = timestamp - lastRender
    update(progress);
    draw();

    lastRender = timestamp
    window.requestAnimationFrame(loop)

}


module.exports = Engine;
=======

    //update(progress);
    //draw();

    
}


module.exports = Engine;
>>>>>>> 10ee85201db3947c3e617fe81d28668b96194fc9
