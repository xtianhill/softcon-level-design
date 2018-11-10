/* basic engine prototype */

function Engine(grid){
    this.grid = grid;
}

var state = {
  x: (width/2)
  y: (height/2)
  pressedKeys:{
    left : false,
    right: false,
    up: false,
    down:false
  }
}

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}

function keydown(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}

function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)

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
    if (state.pressedKeys.left) {
      state.x -= progress
    }
    if (state.pressedKeys.right) {
      state.x += progress
    }
    if (state.pressedKeys.up) {
      state.y -= progress
    }
    if (state.pressedKeys.down) {
      state.y += progress
    }
// Flip position at boundaries
    if (state.x > width) {
      state.x -= width
    }
    else if (state.x < 0) {
      state.x += width
    }
    if (state.y > height) {
      state.y -= height
    }
    else if (state.y < 0) {
      state.y += height
    }
}

Engine.prototype.detectCollision = function(element1, element2){
    // does element1 hit element2? return true if yes
}

Engine.prototype.draw = function(){
    // draw the state of the game
    // draw the state of the game
    // draw every element at its position
}

Engine.prototype.loop = function(){
    // game loop
    var progress = timestamp - lastRender
    update(progress);
    draw();

    lastRender = timestamp
    window.requestAnimationFrame(loop)

}


module.exports = Engine;
    //update(progress);
    //draw();


}

module.exports = Engine;
