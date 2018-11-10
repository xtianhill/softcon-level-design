/* basic engine prototype */

function Engine(grid){
    this.grid = grid;
}

function setGrid(grid){
    this.grid = grid;
}

function getGrid(){
    return this.grid;
}
function update(progress) {
    // use progress to ensure smooth animations
//     // udpate any elements in level since last render
//     // need to deal with effects, collision detection, etc etc
}

function detectCollision(element1, element2) {
    // does element1 hit element2? return true if yes
}

var canvas = document.getElementById("c");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "red";

function draw(increase){
    ctx.rect(20+increase,20,150,100);
    ctx.stroke();
}
var increase = 0;
function loop(timestamp) {
    // game loop
    var progress = timestamp - lastRender;
    //update(progress);
    draw(increase);
    increase = increase+1;
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);