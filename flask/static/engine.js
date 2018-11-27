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

var gameState;


function initialize(){
    var step = 0.05;
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");
    document.addEventListener('keydown', function(e) {keyDownHandler(e, gameState)}, false);
    document.addEventListener('keyup', function(e) {keyUpHandler(e, gameState)}, false);
    var rightPressed = false;
    var leftPressed = false;
    var downPressed = false;
    var upPressed = false;
    var data = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Player","top":350,"left":100,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1},{"type":"Element","name":"Item","top":200,"left":500,"url":"https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Enemy","top":350,"left":300,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"NPC","top":250,"left":500,"url":"https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Enemy","top":350,"left":650,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":300,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"button"}],"background":"","backgroundImage":"https://d2ujflorbtfzji.cloudfront.net/package-screenshot/4b7e815a-669f-4023-ac73-6c7691fe9a9f_scaled.jpg","backgroundImageOpacity":1,"backgroundImageStretch":true}';
    
    // query database and get level info, then translate into list of elements
    var parsedJSON = JSONtoElements(data);
    var elements = parsedJSON.elements;
    var backgroundUrl = parsedJSON.backgroundUrl;
    var width = canvas.width;
    var height = canvas.height;
    var wrap = document.getElementById("wrap");
    
    // isolate the pc
    var pc;
    for(i=0; i<elements.length; i++){
        if(elements[i] instanceof Player){
            pc = elements[i];
            elements.splice(i,1);
        }
    }
    // make a health bar dependent on the players stats
    var healthBar = document.getElementById("health");
    healthBar.value = pc.health;
    healthBar.max = pc.maxHealth;

    // set the initial game state
    gameState = { canvas: canvas
        , width: width
        , height: height
        , ctx: ctx
        , rightPressed: rightPressed
        , leftPressed: leftPressed
        , downPressed: downPressed
        , upPressed: upPressed
        , elements: elements
        , wrap: wrap
        , pc: pc
        , step: step
        , backgroundUrl: backgroundUrl};
        console.log(pc.inventory);
}

// GAME STATE

function update(gameState) {
    // move right or left as long as no wall is in the way
    newXPos = null;
    if (gameState.rightPressed){
        newXPos = gameState.pc.newXPos(gameState.step, "right");
        if(newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
           || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
           newXPos = null;
    }
    else if (gameState.leftPressed){
        newXPos = gameState.pc.newXPos(gameState.step, "left");
        if(newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
           || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
           newXPos = null;
    }

    // find things that collide if moving left-right
    xObstacle = null;
    if(newXPos != null){
        for(i=0; i<gameState.elements.length; i++){
            if(detectCollision(newXPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])){
                if(gameState.elements[i] instanceof Environment)
                    xObstacle = gameState.elements[i];
                else
                    onCollision(gameState, i);
            }
        }

    gameState.pc.moveX(newXPos, xObstacle);
    }

    // find collisions if trying to jump or landing on something
    newYPos = gameState.pc.newYPos(gameState.step);
    if(newYPos.y + (0.5 * gameState.pc.size.y) - (0.5 * gameState.pc.hitbox.y) < 0)
        newYPos = null;
    else if(newYPos.y + (0.5 * gameState.pc.size.y) + (0.5 * gameState.pc.hitbox.y) > gameState.height)
        newYPos = newYPos; //player.die()
    yObstacle = null;
    if(newYPos != null){
        for(i=0; i<gameState.elements.length; i++){
           if(detectCollision(newYPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])){
                if(gameState.elements[i] instanceof Environment)
                    yObstacle = gameState.elements[i];
                else
                    onCollision(gameState, i);
            }
        }
    }
    // jump or fall as long as no ground (or ceiling, hopefully) is in the way
    if (gameState.upPressed){
      if(gameState.pc.position.y-1 > 0){
        gameState.pc.moveY(newYPos, yObstacle, true);
    }
    } else {
        gameState.pc.moveY(newYPos, yObstacle, false);
  }

  //physics for npcs and enemies
  for(i=0; i<gameState.elements.length; i++){
    if (gameState.elements[i] instanceof NPC || gameState.elements[i] instanceof Enemy) {
        newYPos = gameState.elements[i].newYPos(gameState.step);
        yObstacle = null;
        for(j=0; j<gameState.elements.length; j++){
            if (i != j && detectCollision(newYPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j])){
                yObstacle = gameState.elements[j];
            }
        }
        gameState.elements[i].moveY(newYPos, yObstacle, false);
    }
    if (gameState.elements[i] instanceof Enemy) {
      newXPos = gameState.elements[i].newXPos(gameState.step, gameState.elements[i].direction);
      for(j=0; j<gameState.elements.length; j++){
          xObstacle = null;
          if(i != j && detectCollision(newXPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j]))
              if(gameState.elements[j] instanceof Environment){
                  xObstacle = gameState.elements[j];
                  gameState.elements[i].changeDirection();
                  break;
                }
              if(gameState.elements[i].startPos.x - newXPos.x > gameState.elements[i].range
                  || newXPos.x - gameState.elements[i].startPos.x > gameState.elements[i].range){
                  gameState.elements[i].changeDirection();
                  break;
                  }
          gameState.elements[i].moveX(newXPos, null);
      }
    }
}
}

function detectCollision(pos1, pos2, element1, element2) {
    box1 = element1.hitbox;
    size1 = element1.size;
    box2 = element2.hitbox;
    size2 = element2.size;
    if(pos1 == null || pos2 == null || box1 == null || box2 == null)
        return false;
    left1 = pos1.x + (0.5 * size1.x) - (0.5 * box1.x);
    right1 = pos1.x + (0.5 * size1.x) + (0.5 * box1.x);
    top1 = pos1.y + (0.5 * size1.y) - (0.5 * box1.y);
    bottom1 = pos1.y + (0.5 * size1.y) + (0.5 * box1.y);
    left2 = pos2.x + (0.5 * size2.x) - (0.5 * box2.x);
    right2 = pos2.x + (0.5 * size2.x) + (0.5 * box2.x);
    top2 = pos2.y + (0.5 * size2.y) - (0.5 * box2.y);
    bottom2 = pos2.y + (0.5 * size2.y) + (0.5 * box2.y);

    if (right1 > left2 && //right edge of self, left edge of other
        left1 < right2 && //left edge of self, right edge of other
        bottom1 > top2 && //bottom edge of self, top edge of other
        top1 < bottom2)   //top edge of self, bottom edge of other
        return true;
    return false;
}

function onCollision(gameState, i) {
	    //if npc, show message
            if(gameState.elements[i] instanceof NPC){
               //elements[i].displayMessage();
               gameState.ctx.font = "12px Arial";
               gameState.ctx.fillText(gameState.elements[i].getMessage(), 0, 0);
               gameState.elements[i].shouldDisplay = true;
            }

            //if enemy, either damage w/item or lose health
            if(gameState.elements[i] instanceof Enemy){
                if(gameState.pc.equippedItem != null) {
                    if(gameState.pc.equippedItem.getEffect() == "damage"){
                        gameState.elements[i].decHealth(1);
                    }
                }
                gameState.pc.decHealth(gameState.elements[i].getDamage());
                updateHealth(gameState.pc);
            }

            //if item, pick up and remove from elements, display in inventory
             if(gameState.elements[i] instanceof Item){
                gameState.pc.pickUpItem(gameState.elements[i]);
                gameState.elements.splice(i,1);
                showInventory(gameState.pc);
             }
    }

function keyDownHandler(event, gameState) {
    if(event.keyCode == 68) {
        gameState.rightPressed = true;
    }
    if(event.keyCode == 65) {
        gameState.leftPressed = true;
    }
    if(event.keyCode == 83) {
    	gameState.downPressed = true;
    }
    if(event.keyCode == 87) {
    	gameState.upPressed = true;
    }
}

function keyUpHandler(event, gameState) {
    if(event.keyCode == 68) {
        gameState.rightPressed = false;
    }
    if(event.keyCode == 65) {
        gameState.leftPressed = false;
    }
    if(event.keyCode == 83) {
    	gameState.downPressed = false;
    }
    else if(event.keyCode == 87) {
    	gameState.upPressed = false;
    }
}

// need to create all the images given urls - this could/should happen within translation function
function imgInit(gameState){
    for(i = 0; i<gameState.elements.length; i++){
        gameState.elements[i].img = new Image;
        gameState.elements[i].img.src = gameState.elements[i].sprite;
    }
    var tmp = gameState.backgroundUrl;
    gameState.backgroundUrl = new Image;
    gameState.backgroundUrl.src = tmp;

    gameState.pc.img = new Image;
    gameState.pc.img.src = gameState.pc.sprite;
}

function draw(gameState){
    gameState.ctx.clearRect(0, 0, gameState.width, gameState.height);
    gameState.ctx.drawImage(gameState.backgroundUrl, 0,0, gameState.width, gameState.height);

    for(i = 0; i<gameState.elements.length; i++){
        var curElement = gameState.elements[i];
        if (curElement.shouldDisplay){
            gameState.ctx.font = 'Press Start 2P';
            gameState.ctx.fillText(curElement.getMessage(), curElement.position.x, curElement.position.y-10);
            curElement.shouldDisplay = false;
        }
        gameState.ctx.drawImage(curElement.img,curElement.position.x,curElement.position.y,
            curElement.size.x,curElement.size.y);
    }
    gameState.ctx.drawImage(gameState.pc.img,gameState.pc.position.x,gameState.pc.position.y,
        gameState.pc.size.x,gameState.pc.size.y);
    scrollPlayerIntoView();
}

function scrollPlayerIntoView() {
  var margin = gameState.wrap.offsetWidth / 2.5;

  var left = gameState.wrap.scrollLeft;
  var right = left + gameState.wrap.offsetWidth;
  var center = gameState.pc.position.plus(gameState.pc.size.times(0.5));

  scrollVal = center.x + margin - gameState.wrap.offsetWidth;

//   console.log(scrollVal);
//   console.log(gameState.width);

  if (center.x < left + margin){
    gameState.wrap.scrollLeft = center.x - margin;
  }
  else if (center.x > right - margin && scrollVal < gameState.width) {
    gameState.wrap.scrollLeft = scrollVal;
  }
};

// displays the characters inventory in html. only called when new item picked up
function showInventory(pc){
    var ul = document.getElementById('inventory');
    ul.innerHTML = "";
    var inventory = gameState.pc.inventory;
    console.log(inventory);
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var listItem = document.createElement("li");
        var _img = document.createElement('img');
        _img.src = item.sprite;
        _img.style = "width:30px;height:30px;";
        listItem.appendChild(_img);

        ul.appendChild(listItem);
    }
}

function updateHealth(pc){  
    if(pc.health >=0) {
        var healthBar = document.getElementById("health");
        healthBar.value = pc.health;
    }
}

function testWinConditions(gameState){
    // to be written
}


initialize();
imgInit(gameState);

function loop(timestamp) {
    // game loop

    update(gameState);
    draw(gameState);

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

module.exports.showInventory = showInventory;
