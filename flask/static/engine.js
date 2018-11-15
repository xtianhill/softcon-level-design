/* basic engine prototype */
const JSONtoElements = require('./parsing.js');
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');
var step = 0.3;

var canvas = document.getElementById("c");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToe-PSAektDgBsXLsdybQW6F1wGDdpw2mbm3SaReRPuQ0ec0ns";
var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
// var elements =
    // [ new Player(new Vector(0,0), 10, 10, true, 'item', ['item', 'item2'], new Vector(50,50), icon2, new Vector(50,50))
    // , new NPC(new Vector(100,100), 10, 10, true, "y tho", new Vector(50,50), icon, new Vector(50,50)),
    // new Item(new Vector(100,50), icon, new Vector(50,50), new Vector(50,50), false, "damage")
    // ];
var data = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Environment","top":350,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Player","top":150,"left":100,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1},{"type":"button"},{"type":"Element","name":"Enemy","top":150,"left":550,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"NPC","top":300,"left":200,"url":"https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Item","top":150,"left":500,"url":"https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png","scale":1},{"type":"button"},{"type":"button"},{"type":"button"},{"type":"button"}],"background":"","backgroundImage":"https://d2ujflorbtfzji.cloudfront.net/package-screenshot/4b7e815a-669f-4023-ac73-6c7691fe9a9f_scaled.jpg","backgroundImageOpacity":1,"backgroundImageStretch":true}';
// query database and get level info, then translate into list of elements
var parsedJSON = JSONtoElements(data);
var elements = parsedJSON.elements;
var backgroundUrl = parsedJSON.backgroundUrl;

var pc;
for(i=0; i<elements.length; i++){
    if(elements[i] instanceof Player){
        pc = elements[i];
        elements.splice(i,1);
    }
}

function update(progress) {

    xObstacles = [];
    yObstacles = [];
    for(i=0; i<elements.length; i++){
        
        if(detectXCollision(pc, elements[i])){
		if(elements[i] instanceof Environment)
           		xObstacles.push(elements[i]);
	    	else
            onCollision(pc, elements, i);
        }
        if(detectYCollision(pc, elements[i]) && detectXCollision(pc, elements[i])){
            if(elements[i] instanceof Environment){
                yObstacles.push(elements[i]);
            } else{
                onCollision(pc, elements, i);
            }
        }
    }
    if (rightPressed){
      if (pc.position.x+1 < (width-pc.size.x)){
        newPos = pc.newXPos(step);
        pc.moveX(newPos, xObstacles);
      }
    } else if (leftPressed){
      if(pc.position.x-1 > 0){
        newPos = pc.newXPos(-1*step);
        pc.moveX(newPos, xObstacles);
      }
    } else if (upPressed){
      if(pc.position.y-1 > 0){
        newPos = pc.newYPos(step);
        pc.moveY(newPos, yObstacles, true);
      }
    } 
    newPos = pc.newYPos(step);
    pc.moveY(newPos, yObstacles, false);
}
    

function detectXCollision(element1, element2) {
    if ((element1.position.x < element2.position.x + element2.size.x)  && (element1.position.x + element1.size.x  > element2.position.x)) {
        return true;
    }
    return false;
}

function detectYCollision(element1, element2) {
    if ((element1.position.y < element2.position.y + element2.size.y && element1.position.y + element1.size.y > element2.position.y)) {
        return true;
    }
    return false;
}

function onCollision(pc, elements, i) {
	    //if npc, show message
            if(elements[i] instanceof NPC){
               //elements[i].displayMessage();
                ctx.font = "12px Arial";
                ctx.fillText(elements[i].getMessage(), 0, 0);
                elements[i].shouldDisplay = true;
            }

            //if enemy, either damage w/item or lose health
            if(elements[i] instanceof Enemy){
                if(pc.equippedItem != 0) {
                    if(pc.equippedItem.getEffect() == "damage"){
                        elements[i].decHealth(1);
                    } else{
                        pc.decHealth(elements[i].getDamage());
                    }
                }
            }

            //if item, pick up and remove from elements
       
            // if(elements[i] instanceof Item){
            //     if(!pc.getEquippedItem()){
            //         pc.setEquippedItem(elements[i]);
            //     }
            //     pc.inventory.push(elements[i]);
            //     elements.splice(i,1);
            // }
    }

function keyDownHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    if(event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 83) {
    	downPressed = true;
    }
    if(event.keyCode == 87) {
    	upPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    if(event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
}

// need to create all the images given urls - this could/should happen within translation function
function imgInit(){
    for(i = 0; i<elements.length; i++){
        elements[i].img = new Image;
        elements[i].img.src = elements[i].sprite;
    }
    var tmp = backgroundUrl;
    backgroundUrl = new Image;
    backgroundUrl.src = tmp;

    pc.img = new Image;
    pc.img.src = pc.sprite;

}

imgInit();

function draw(){
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(backgroundUrl, 0,0);
    
    for(i = 0; i<elements.length; i++){
        var curElement = elements[i];
        if (curElement.shouldDisplay){
            ctx.font = "12px Arial";
            ctx.fillText(curElement.getMessage(), curElement.position.x, curElement.position.y-10);
            curElement.shouldDisplay = false;
        }
        ctx.drawImage(curElement.img,curElement.position.x,curElement.position.y,
            curElement.size.x,curElement.size.y);
    }
    ctx.drawImage(pc.img,pc.position.x,pc.position.y,
        pc.size.x,pc.size.y);
}
function showInventory(){
    var ul = document.getElementById('inventory');
    var inventory = elements[0].inventory;
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var listItem = document.createElement("li");
        listItem.textContent = '<img src="' + item.sprite + '" + />';

        ul.appendChild(listItem);
    }
}

function loop(timestamp) {
    // game loop
    var progress = timestamp - lastRender;
    update();
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);

module.exports.showInventory = showInventory;
