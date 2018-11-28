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
    var itemUsed = false;
    var changeItem = false;
    var data = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Player","top":350,"left":100,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1},{"type":"Element","name":"Item","top":100,"left":400,"url":"https://vivalasarepas.com/wp-content/uploads/2017/02/sprite.jpg","scale":1},{"type":"Element","name":"Item","top":200,"left":500,"url":"https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Enemy","top":350,"left":300,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"NPC","top":250,"left":500,"url":"https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Enemy","top":350,"left":650,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":300,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"button"}],"background":"","backgroundImage":"https://cdn.cgmagonline.com/wp-content/uploads/2015/07/pixelartheader.jpg","backgroundImageOpacity":1,"backgroundImageStretch":true}';

    // query database and get level info, then translate into list of elements
    var parsedJSON = JSONtoElements(data);
    var elements = parsedJSON.elements;
    var characters = [];
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

    // isolate the characters
    for(i=0; i<elements.length; i++){
        if(elements[i] instanceof Character){
            characters.push(elements[i]);
        }
    }

    // set the font style for in game messages
    ctx.font = "12px Arial";
    ctx.fillStyle = "#ffffff";

    // // make a health bar dependent on the players stats
    // var healthBar = document.getElementById("health");
    // healthBar.value = pc.health;
    // healthBar.max = pc.maxHealth;

    // set the initial game state
    gameState = { canvas: canvas
        , width: width
        , height: height
        , ctx: ctx
        , rightPressed: rightPressed
        , leftPressed: leftPressed
        , downPressed: downPressed
        , upPressed: upPressed
        , itemUsed: itemUsed
        , changeItem: changeItem
        , elements: elements
        , wrap: wrap
        , pc: pc
        , characters: characters
        , step: step
        , backgroundUrl: backgroundUrl};

    showInventory(gameState);
}

function update(gameState) {

    // move right or left as long as no wall is in the way
    newXPos = null;
    if (gameState.rightPressed) {
        newXPos = gameState.pc.newXPos(gameState.step, "right");
        if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
            || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
            newXPos = null;
    }
    else if (gameState.leftPressed) {
        newXPos = gameState.pc.newXPos(gameState.step, "left");
        if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
            || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
            newXPos = null;
    }
    
    // find things that collide if moving left-right
    xObstacle = null;
    if (newXPos != null) {
        for (i = 0; i < gameState.elements.length; i++) {
            if (detectCollision(newXPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                if (gameState.elements[i] instanceof Environment)
                    xObstacle = gameState.elements[i];
                else
                    onCollision(gameState, i);
            }
        }
        gameState.pc.moveX(newXPos, xObstacle);
    }


    // find collisions if trying to jump or landing on something
    newYPos = gameState.pc.newYPos(gameState.step);
    if (newYPos.y + (0.5 * gameState.pc.size.y) - (0.5 * gameState.pc.hitbox.y) < 0)
        newYPos = null;
    else if (newYPos.y + (0.5 * gameState.pc.size.y) + (0.5 * gameState.pc.hitbox.y) > gameState.height)
        newYPos = newYPos; //player.die()
    yObstacle = null;
    if (newYPos != null) {
        for (i = 0; i < gameState.elements.length; i++) {
            if (detectCollision(newYPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                if (gameState.elements[i] instanceof Environment)
                    yObstacle = gameState.elements[i];
                else
                    onCollision(gameState, i);
            }
        }
    }
    // jump or fall as long as no ground (or ceiling, hopefully) is in the way
    if (gameState.upPressed) {
        if (gameState.pc.position.y - 1 > 0) {
            gameState.pc.moveY(newYPos, yObstacle, true);
        }
    } else {
        gameState.pc.moveY(newYPos, yObstacle, false);
    }

    // checks if player fell of the screen
    if (gameState.pc.position.y > gameState.height) {
        gameState.pc.status = false;
    }

    //physics for npcs and enemies
    for (i = 0; i < gameState.elements.length; i++) {
        if (gameState.elements[i] instanceof Item && gameState.elements[i].hovering == true) {
            gameState.elements[i].hover(gameState.step);
        }
        else if (gameState.elements[i] instanceof NPC || gameState.elements[i] instanceof Enemy) {
            newYPos = gameState.elements[i].newYPos(gameState.step);
            yObstacle = null;
            for (j = 0; j < gameState.elements.length; j++) {
                if (i != j && detectCollision(newYPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j])) {
                    yObstacle = gameState.elements[j];
                }
            }
            gameState.elements[i].moveY(newYPos, yObstacle, false);
            if(!gameState.elements[i].status){
                gameState.elements.splice(i,1);
                break;
            }
        }
        if (gameState.elements[i] instanceof Enemy) {
            newXPos = gameState.elements[i].newXPos(gameState.step, gameState.elements[i].direction);
            for (j = 0; j < gameState.elements.length; j++) {
                xObstacle = null;
                if (i != j && detectCollision(newXPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j]))
                    if (gameState.elements[j] instanceof Environment) {
                        xObstacle = gameState.elements[j];
                        gameState.elements[i].changeDirection();
                        break;
                    }
                if (gameState.elements[i].startPos.x - newXPos.x > gameState.elements[i].range
                    || newXPos.x - gameState.elements[i].startPos.x > gameState.elements[i].range) {
                    gameState.elements[i].changeDirection();
                    break;
                }
                gameState.elements[i].moveX(newXPos, null);
            }
        }
        
    }
    // update position of items
    if(gameState.pc.equippedItem != null){
        gameState.pc.equippedItem.updatePosition(gameState.pc);
    }
    
    // if item used
    if(gameState.itemUsed){
        handleItemUse(gameState);
        gameState.itemUsed = false;
    }

    // change item selected
    if(gameState.changeItem){
        changeItem(gameState);
        gameState.changeItem = false;
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
               gameState.ctx.fillText(gameState.elements[i].getMessage(), 0, 0);
               gameState.elements[i].shouldDisplay = true;
            }

            //if enemy, either damage w/item or lose health
            if(gameState.elements[i] instanceof Enemy){
                gameState.pc.decHealth(gameState.elements[i].getDamage());
                // updateHealth(gameState.pc);
            }

            //if item, pick up and remove from elements, display in inventory
             if(gameState.elements[i] instanceof Item){
                gameState.pc.pickUpItem(gameState.elements[i]);
                gameState.elements.splice(i,1);
                showInventory(gameState);
             }
    }

function keyDownHandler(event, gameState) {
    
    if(event.keyCode == 32){
        if(gameState.pc.equippedItem != null) {
            gameState.itemUsed = true;
        }
    }

    if(event.keyCode == 69){ // nice
        gameState.changeItem = true;
    }

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
    scrollPlayerIntoView();

    for(i = 0; i<gameState.elements.length; i++){
        var curElement = gameState.elements[i];
        if (curElement.shouldDisplay){
            gameState.ctx.font = 'Press Start 2P';
            gameState.ctx.fillStyle = "#ffffff";
            gameState.ctx.fillText(curElement.getMessage(),
                                   curElement.position.x,
                                   curElement.position.y-10);
            curElement.shouldDisplay = false;
        }
        gameState.ctx.drawImage(curElement.img,curElement.position.x,curElement.position.y,
            curElement.size.x,curElement.size.y);
    }
    // draw pc
    gameState.ctx.drawImage(gameState.pc.img,gameState.pc.position.x,gameState.pc.position.y,
        gameState.pc.size.x,gameState.pc.size.y);
    gameState.ctx.fillStyle = "#FF0000";
    gameState.ctx.fillRect(8,8,50,10);
    gameState.ctx.fillStyle = "#00FF00";
    var percentFull = gameState.pc.health / gameState.pc.maxHealth;
    gameState.ctx.fillRect(8,8,percentFull * 50, 10);
    
    // draw equipped item
    if(gameState.pc.equippedItem != null){
        var item = gameState.pc.equippedItem;
        gameState.ctx.drawImage(item.img, item.position.x, item.position.y, item.size.x, 
            item.size.y);
    }

    // draw health bars
    for(i = 0; i<gameState.characters.length; i++){
        if (gameState.characters[i].status) {
            gameState.ctx.fillStyle = "#FF0000";
            gameState.ctx.fillRect(gameState.characters[i].position.x, gameState.characters[i].position.y - 8,
                gameState.characters[i].size.x, 4);
            gameState.ctx.fillStyle = "#00FF00";
            var percentFull = gameState.characters[i].health / gameState.characters[i].maxHealth;
            gameState.ctx.fillRect(gameState.characters[i].position.x, gameState.characters[i].position.y - 8,
                percentFull * gameState.characters[i].size.x, 4);
        }
    }

    // on player death visuals
    if(!gameState.pc.status){
        onPlayerDeath(gameState);
    }
}

function scrollPlayerIntoView() {
  var displayWidth = gameState.wrap.clientWidth;
  var displayHeight = gameState.wrap.clientHeight;
  var levelWidth = gameState.width;
  var margin = displayWidth / 2.5;

  var left = gameState.wrap.scrollLeft;
  var right = left + displayWidth;
  var center = gameState.pc.position.plus(gameState.pc.size.times(0.5));

  scrollVal1 = center.x - margin;
  scrollVal2 = center.x + margin - displayWidth;
  scrollVal3 = gameState.wrap.scrollLeft
  args = []

  if (center.x < left + margin && scrollVal1 > 0){
    gameState.wrap.scrollLeft = scrollVal1;
    gameState.ctx.drawImage(gameState.backgroundUrl, scrollVal1, 0);
    args = [scrollVal1, 0]
  }
  else if (center.x > right - margin && scrollVal2 < levelWidth - displayWidth){
      gameState.wrap.scrollLeft = scrollVal2;
      gameState.ctx.drawImage(gameState.backgroundUrl, scrollVal2, 0);
      args = [scrollVal2, 0]
  }
  else if (center.x > right - margin && scrollVal2 < gameState.width) {
      gameState.wrap.scrollLeft = levelWidth - displayWidth;
      gameState.ctx.drawImage(gameState.backgroundUrl, levelWidth-displayWidth, 0);
      args = [levelWidth-displayWidth, 0]
  }
  else {
    gameState.ctx.drawImage(gameState.backgroundUrl, scrollVal3, 0);
    args = [scrollVal3, 0]
  }
   var hRatio = displayWidth  / gameState.backgroundUrl.width;
   var vRatio =  displayHeight / gameState.backgroundUrl.height;
   var ratio  = Math.max ( hRatio, vRatio );
   var centerShift_x = ( displayWidth - gameState.backgroundUrl.width*ratio ) / 2;
   var centerShift_y = ( displayHeight - gameState.backgroundUrl.height*ratio ) / 2;
   gameState.ctx.clearRect(0,0,displayWidth, displayHeight);
   gameState.ctx.drawImage(gameState.backgroundUrl,0,0,gameState.backgroundUrl.width,
                      gameState.backgroundUrl.height,args[0]+centerShift_x,args[1]+centerShift_y,
                      gameState.backgroundUrl.width*ratio, gameState.backgroundUrl.height*ratio);
}

// displays the characters inventory in html. only called when new item picked up
function showInventory(gameState){
    var ul = document.getElementById('inventory');
    ul.innerHTML = "";
    var inventory = gameState.pc.inventory;
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var listItem = document.createElement("li");
        
        listItem.border = "1px solid black";
        
        var _img = document.createElement('img');
        _img.src = item.sprite;
        _img.style = "width:30px;height:30px;";
        if(i == 0){
            _img.border = "1px solid red";
        }
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

function onPlayerDeath(gameState){
    var empty = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    gameState.ctx.fillText("GAME OVER DUDE", gameState.pc.position.x, gameState.pc.position.y - 10);
    gameState.pc.img.src = empty;
    if(gameState.pc.equippedItem != null) {
        gameState.pc.equippedItem.img.src = empty;
    }
}

function reset(){
    initialize();
    imgInit(gameState);
}

function testWinConditions(gameState){
    // to be written
}

function handleItemUse (gameState){
    for(var i=0; i<gameState.characters.length; i++){
        if(detectCollision(gameState.characters[i].position, gameState.pc.equippedItem.position,
            gameState.characters[i], gameState.pc.equippedItem)){
                gameState.pc.useItem(gameState.characters[i]);
                return;
        }
    }
    gameState.pc.useItem(gameState.pc);
    //updateHealth(gameState.pc);
}

function changeItem(gameState){
    if(gameState.pc.equippedItem!=null){
        if(gameState.pc.inventory.length > 1){
            gameState.pc.inventory.push(gameState.pc.equippedItem);
            gameState.pc.inventory.shift();
        }
        gameState.pc.setEquippedItem(gameState.pc.inventory[0]);
    }
    showInventory(gameState);
}


reset();

function loop() {
    // game loop

    update(gameState);
    draw(gameState);
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

module.exports.showInventory = showInventory;
module.exports.reset = reset;
