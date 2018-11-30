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
const database = require('./database.js');

var gameState;

// searches the database by the title given and returns the data to be parsed
async function getData(title){
    var data;
    try{
        data = await database.getByTitle(title);
        return data;
    } catch (error){
        data = "error";
        return data;
    }
}

var title = document.getElementById("levelTitle").innerHTML;
console.log(title);
getData(title).then((data) => {

/*
|------------------------------------------------------------------------------
| Initialize gameState, canvas, and other variables from JSON
|------------------------------------------------------------------------------
*/
    function initialize(){
        var step = 0.05; // controls frequency of physics calculations
        var sinceItem = 0;
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

        /*
         * Christian's log
         */
        console.log("data: " + data);

        // comment this line if you want to load from database
        // data = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Player","top":350,"left":100,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1},{"type":"Element","name":"Item","top":100,"left":400,"url":"https://66.media.tumblr.com/f7acf066084d424d5da0c09795fe8483/tumblr_inline_piy8y9FbkJ1ruhpn7_540.png","scale":1},{"type":"Element","name":"Item","top":200,"left":500,"url":"https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Enemy","top":350,"left":300,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"NPC","top":250,"left":500,"url":"https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Enemy","top":350,"left":650,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":300,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"button"}],"background":"","backgroundImage":"https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png","backgroundImageOpacity":1,"backgroundImageStretch":true}';

        // translate data from database into list of elements
        var parsedJSON = JSONtoElements(data);
        var elements = parsedJSON.elements;
        var characters = [];
        var backgroundUrl = parsedJSON.backgroundUrl;
        //var winConditions =  ["enemy", "npc"];
        var winConditions= parsedJSON.winconds;
        var width = canvas.width;
        var height = canvas.height;
        var wrap = document.getElementById("wrap");

        console.log("elements", elements);
        // set win conditions to false if they were chosen by designer
        var victory = false;
        var npcCondition = true;
        var endCondition = true;
        var enemyCondition = true;
        var ul = document.getElementById("rules");
        ul.innerHTML = "";
        console.log(ul);
        for(i=0; i<winConditions.length; i++){
            var listItem = document.createElement("li");
            if(winConditions[i] === "npc"){
                npcCondition = false;
                listItem.append(document.createTextNode("Talk to every NPC!"));
                ul.appendChild(listItem);
            }
            if(winConditions[i] === "enemy"){
                enemyCondition = false;
                listItem.append(document.createTextNode("Kill every enemy!"));
                ul.appendChild(listItem);
            }
            if(winConditions[i] === "end"){
                endCondition = false;
                listItem.append(document.createTextNode("Reach the end of the level!"));
                ul.appendChild(listItem);
            }
        }

        // identify the pc
        var pc;
        for(i=0; i<elements.length; i++){
            if(elements[i] instanceof Player){
                pc = elements[i];
                elements.splice(i,1);
            }
        }

        // identify the characters
        for(i=0; i<elements.length; i++){
            if(elements[i] instanceof Character){
                characters.push(elements[i]);
            }
        }

        // set the font style for in game messages
        ctx.font = '10px "Press Start 2P"';
        ctx.fillStyle = "#ffffff";

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
            , sinceItem: sinceItem
            , backgroundUrl: backgroundUrl
            , npcCondition: npcCondition
            , emenyCondition: enemyCondition
            , endCondition: endCondition
            , victory: victory
        };

        showInventory(gameState);
    }

    /*
    |------------------------------------------------------------------------------
    | Update internal gamestate: physics and item interactions
    |------------------------------------------------------------------------------
    */

    function update(gameState) {

        // find hypothetical new right/left position as long as within the level's
        // limits and no wall is in the way
        newXPos = null;
        if(!gameState.victory){
            if (gameState.rightPressed) {
                gameState.pc.dir = "right";
                newXPos = gameState.pc.newXPos(gameState.step, "right");
                if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
                    || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
                    newXPos = null;
            }
            else if (gameState.leftPressed) {
                gameState.pc.dir = "left";
                newXPos = gameState.pc.newXPos(gameState.step, "left");
                if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
                    || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
                    newXPos = null;
            }

            // find collisions based on hypothetical new x-position, move if legal
            xObstacle = null;
            if (newXPos != null) {
                for (i = 0; i < gameState.elements.length; i++) {
                    if (detectCollision(newXPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                        if (gameState.elements[i] instanceof Environment)
                            xObstacle = gameState.elements[i];
                        onCollision(gameState, i);
                    }
                }
                gameState.pc.moveX(newXPos, xObstacle);
            }

            // find hypothetical new up/down position as long as within the level's
            // limits and no platform is in the way
            newYPos = gameState.pc.newYPos(gameState.step);
            if (newYPos.y + (0.5 * gameState.pc.size.y) - (0.5 * gameState.pc.hitbox.y) < 0)
                newYPos = null;
            else if (newYPos.y + (0.5 * gameState.pc.size.y) + (0.5 * gameState.pc.hitbox.y) > gameState.height)
                gameState.pc.status = false;

            // find collisions based on hypothetical new y-position, jump or fall if legal
            yObstacle = null;
            if (newYPos != null) {
                for (i = 0; i < gameState.elements.length; i++) {
                    if (detectCollision(newYPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                        if (gameState.elements[i] instanceof Environment)
                            yObstacle = gameState.elements[i];
                        onCollision(gameState, i);
                    }
                }
            if (gameState.upPressed) {
                if (gameState.pc.position.y - 1 > 0) {
                    gameState.pc.moveY(newYPos, yObstacle, true);
                }
            } else {
                gameState.pc.moveY(newYPos, yObstacle, false);
            }
        }
        }

        // physics for npcs and enemies: both can fall, enemies may walk back and forth
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
        if(gameState.itemUsed && !gameState.victory){
            handleItemUse(gameState);
            gameState.sinceItem = 0;
            gameState.itemUsed = false;
        }

        // change item selected
        if(gameState.changeItem && gameState.pc.status && !gameState.victory){
                changeItem(gameState);
                gameState.changeItem = false;
        }

        // counter to make tile effects only happen every few seconds
        gameState.pc.sinceTile += 1;
        gameState.sinceItem += 1;

        // test if the level is won
        testWinConditions(gameState);
    }

    /*
    |------------------------------------------------------------------------------
    | Draw new frame
    |------------------------------------------------------------------------------
    */

    function draw(gameState) {
        // clear canvas
        gameState.ctx.clearRect(0, 0, gameState.width, gameState.height);

        // center camera on player and redraw background
        scrollPlayerIntoView();

        // draw non-player elements
        for (i = 0; i < gameState.elements.length; i++) {
            var curElement = gameState.elements[i];

            // if curElement is an NPC with a message
            if (curElement.shouldDisplay) {
                gameState.ctx.font = '10px "Press Start 2P"';
                gameState.ctx.fillStyle = "#ffffff";
                gameState.ctx.fillText(curElement.getMessage(),
                    curElement.position.x,
                    curElement.position.y - 10);
                curElement.shouldDisplay = false;
            }

            // draw the element
            if (curElement instanceof Enemy && curElement.getDirection() == "right") {
                gameState.ctx.save();
                gameState.ctx.scale(-1, 1);
                gameState.ctx.drawImage(curElement.img, -curElement.position.x, curElement.position.y,
                    -curElement.size.x, curElement.size.y);
                gameState.ctx.restore();
            }
            else {
                gameState.ctx.drawImage(curElement.img, curElement.position.x, curElement.position.y,
                    curElement.size.x, curElement.size.y);
            }

            // draw health bars for NPCs and Enemies
            if ((curElement instanceof Enemy || curElement instanceof NPC) && curElement.status) {
                gameState.ctx.fillStyle = "#206020";
                gameState.ctx.fillRect(curElement.position.x, curElement.position.y - 8,
                    curElement.size.x, 4);
                gameState.ctx.fillStyle = "#009900";
                var percentFull = curElement.health / curElement.maxHealth;
                gameState.ctx.fillRect(curElement.position.x, curElement.position.y - 8,
                    percentFull * curElement.size.x, 4);
            }
        }

        // draw pc + equipped item if the game isnt over

        if (gameState.pc.status && !gameState.victory) {


            if (gameState.pc.dir == "left") {
                gameState.ctx.save();
                gameState.ctx.scale(-1, 1);
                gameState.ctx.drawImage(gameState.pc.img, -gameState.pc.position.x, gameState.pc.position.y,
                    -gameState.pc.size.x, gameState.pc.size.y);
                gameState.ctx.restore();
            }
            else {
                gameState.ctx.drawImage(gameState.pc.img, gameState.pc.position.x, gameState.pc.position.y,
                    gameState.pc.size.x, gameState.pc.size.y);
            }

            if (gameState.pc.dir == "left") {
                gameState.ctx.save();
                gameState.ctx.scale(-1, 1);
                if (gameState.pc.equippedItem != null) {
                    var item = gameState.pc.equippedItem;
                    if (gameState.sinceItem < 10) {
                        gameState.ctx.drawImage(item.img, -item.position.x + 5, item.position.y,
                            -item.size.x, item.size.y);
                    }
                    else {
                        gameState.ctx.drawImage(item.img, -item.position.x, item.position.y,
                            -item.size.x, item.size.y);
                    }
                }
                gameState.ctx.restore();
            }
            else {
                if (gameState.pc.equippedItem != null) {
                    var item = gameState.pc.equippedItem;
                    if (gameState.sinceItem < 10) {
                        gameState.ctx.drawImage(item.img, item.position.x + 5, item.position.y,
                            item.size.x, item.size.y);
                    }
                    else {
                        gameState.ctx.drawImage(item.img, item.position.x, item.position.y,
                            item.size.x, item.size.y);
                    }
                }
            }
        }


    // on player death visuals
    if(!gameState.pc.status){
        onPlayerDeath(gameState);
    }

    // on player victory visuals
    if(gameState.victory){
        onVictory(gameState);
    }
}

    /*
    |------------------------------------------------------------------------------
    | Helper Functions
    |------------------------------------------------------------------------------
    */

    // detect collisions between two hypothetical positions of two elements
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

    // react to collisions with various types of elements
    function onCollision(gameState, i) {
            //if npc, show message
                if(gameState.elements[i] instanceof NPC){
                   //elements[i].displayMessage();
                   gameState.ctx.fillText(gameState.elements[i].getMessage(), 0, 0);
                   gameState.elements[i].shouldDisplay = true;
                   gameState.elements[i].spokenTo = true;
                }

                //if enemy, either damage w/item or lose health
                if(gameState.elements[i] instanceof Enemy){
                    gameState.pc.decHealth(gameState.elements[i].getDamage());
                }

                //if item, pick up and remove from elements, display in inventory
                 if(gameState.elements[i] instanceof Item){
                    gameState.pc.pickUpItem(gameState.elements[i]);
                    gameState.elements.splice(i,1);
                    showInventory(gameState);
                 }

                 //if enviroment with effect, affect pc
                 if(gameState.elements[i] instanceof Environment){
                    if(gameState.pc.sinceTile > 50 && gameState.elements[i].getEffect()){
                        if(gameState.elements[i].getEffect().getEffect() == "damage")
                            gameState.pc.decHealth(gameState.elements[i].getEffect().getAmount());
                        else if(gameState.elements[i].getEffect().getEffect() == "heal")
                            gameState.pc.addHealth(gameState.elements[i].getEffect().getAmount());
                        gameState.pc.sinceTile = 0;
                      }
                 }
        }

    // detect key presses
    function keyDownHandler(event, gameState) {
        if(event.keyCode == 81){
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

    // detect keys not being pressed
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

    // create all the images given urls
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

// scroll camera view to keep player at the center; redraw background
function scrollPlayerIntoView() {
  var bgWidth = gameState.backgroundUrl.width; // width of background image
  var bgHeight = gameState.backgroundUrl.height; // height of background image
  var displayWidth = gameState.wrap.clientWidth; // width of viewport
  var displayHeight = gameState.wrap.clientHeight; // height of viewport
  var levelWidth = gameState.width; // width of level
  var margin = displayWidth / 2.5; // window in which player movement won't scroll display

  var left = gameState.wrap.scrollLeft; // current scroll location: left boundary
  var right = left + displayWidth; // current scroll location: right boundary
  var center = gameState.pc.position.plus(gameState.pc.size.times(0.5)); // center of player

  scrollVal1 = center.x - margin; // new left boundary: scroll back
  scrollVal2 = center.x + margin - displayWidth; // new left boundary: scroll forward
  scrollVal3 = levelWidth - displayWidth; // new left boundary: at end of level

  // player is too far to left of screen; but not at start of level: scroll back
  if (center.x < left + margin && scrollVal1 > 0)
    gameState.wrap.scrollLeft = scrollVal1;

  // player is too far to right of screen; but not at end of level: scroll forward
  else if (center.x > right - margin && scrollVal2 < levelWidth - displayWidth)
      gameState.wrap.scrollLeft = scrollVal2;

  // player is too far to right of screen; and at end of level: don't scroll past end of viewport
  else if (center.x > right - margin && scrollVal2 < levelWidth)
      gameState.wrap.scrollLeft = scrollVal3;

  // else player's location is within the allowed window: don't change scroll

  // code to scale background image when window is resized
  var hRatio = displayWidth  / bgWidth;
  var vRatio =  displayHeight / bgHeight;
  var ratio  = Math.max ( hRatio, vRatio );
  var centerShift_x = ( displayWidth - bgWidth*ratio ) / 2;
  var centerShift_y = ( displayHeight - bgHeight*ratio ) / 2;

  // clear background; redraw background at new scroll with scaling
  gameState.ctx.clearRect(0, 0, displayWidth, displayHeight);
  gameState.ctx.drawImage(gameState.backgroundUrl, 0, 0, bgWidth, bgHeight,
                          gameState.wrap.scrollLeft+centerShift_x,centerShift_y,
                          bgWidth*ratio, bgHeight*ratio);

  // draw player's health bar in top left corner
  gameState.ctx.fillStyle = "#206020";
  gameState.ctx.fillRect(gameState.wrap.scrollLeft+8, 8, 300, 10);
  gameState.ctx.fillStyle = "#009900";
  var percentFull = gameState.pc.health / gameState.pc.maxHealth;
  if(!gameState.pc.status) { percentFull=0; }
  gameState.ctx.fillRect(gameState.wrap.scrollLeft+8, 8, percentFull*300, 10);
  gameState.ctx.fillStyle = "#ffffff";
  gameState.ctx.font = '10px "Press Start 2P"';
  gameState.ctx.fillText(Math.round(100*percentFull) + "/100", gameState.wrap.scrollLeft+316, 18);

}

// display player's inventory in html; only called when new item picked up or item switched
function showInventory(gameState){
    var box = document.getElementById('inventory_box');
    var ul = document.getElementById('inventory');
    ul.innerHTML = "";
    var inventory = gameState.pc.inventory;
    if(inventory.length == 0)
        box.style.visibility = "hidden";
    else
        box.style.visibility = "visible";
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var listItem = document.createElement("li");

        var _img = document.createElement('img');
        _img.src = item.sprite;
        _img.style = "width:60px;height:60px;";
        listItem.appendChild(_img);

        ul.appendChild(listItem);
    }
}

  // display player's inventory in html; only called when new item picked up
  function showInventory(gameState){
      var box = document.getElementById('inventory_box');
      var ul = document.getElementById('inventory');
      ul.innerHTML = "";
      var inventory = gameState.pc.inventory;
      if(inventory.length == 0)
          box.style.visibility = "hidden";
      else
          box.style.visibility = "visible";
      for (var i = 0; i < inventory.length; i++) {
          var item = inventory[i];

          var listItem = document.createElement("li");

          var _img = document.createElement('img');
          _img.src = item.sprite;
          _img.style = "width:60px;height:60px;";
          listItem.appendChild(_img);

          ul.appendChild(listItem);
      }
  }

    // define visuals and state-changes when player dies
    function onPlayerDeath(gameState){
        //var empty = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        gameState.ctx.font = '10px "Press Start 2P"';
        gameState.ctx.fillStyle = "#ffffff";
        gameState.ctx.fillText("GAME OVER DUDE", gameState.pc.position.x, gameState.pc.position.y - 10);
        gameState.changeItem = false;
    }

    // visuals for when player has won
    function onVictory(gameState){
        gameState.ctx.fillStyle = "rgba(0,0,0,.5)";
        gameState.ctx.fillRect(gameState.wrap.scrollLeft, 0,
            gameState.wrap.clientWidth, gameState.wrap.clientHeight);
        gameState.ctx.fillStyle = "#ffffff";
        gameState.ctx.font = '30px "Press Start 2P"';
        gameState.ctx.fillText("VICTORY IS YOURS",
            gameState.wrap.scrollLeft + .25* gameState.wrap.clientWidth,
            gameState.wrap.clientHeight/2);
    }

    function reset(){
        initialize();
        imgInit(gameState);
        gameState.wrap.scrollLeft = 0;
    }

    function testNPCCondition(characters){
        for(i=0; i<characters.length; i++){
            if((characters[i] instanceof NPC) && !characters[i].spokenTo){
                return false;
            }
        }
        return true;
    }

    function testEnemyCondition(characters){
        for(i=0; i<characters.length; i++){
            if(characters[i] instanceof Enemy && characters[i].status){
                return false;
            }
        }
        return true;
    }

    function testEndCondition(gameState){
        if(gameState.pc.position.x+gameState.pc.hitbox.x >= gameState.width - 15){
            return true;
        }
        return false;
    }

    function testWinConditions(gameState){
        if(!gameState.npcCondition){
            gameState.npcCondition = testNPCCondition(gameState.characters);
        }
        if(!gameState.enemyCondition){
            gameState.enemyCondition = testEnemyCondition(gameState.characters);
        }
        if(!gameState.endCondition){
            gameState.endCondition = testEndCondition(gameState);
        }
        if(gameState.npcCondition && gameState.enemyCondition && gameState.endCondition){
            gameState.victory = true;
        }
    }

    function handleItemUse (gameState){
        for(var i=0; i<gameState.characters.length; i++){
            if(gameState.characters[i].status){
                if(detectCollision(gameState.characters[i].position, gameState.pc.equippedItem.position,
                    gameState.characters[i], gameState.pc.equippedItem)){
                        gameState.pc.useItem(gameState.characters[i]);
                        return;
                }
            }
        }
        gameState.pc.useItem(gameState.pc);
    }

    function changeItem(gameState){
        if(gameState.pc.equippedItem!=null){
            if(gameState.pc.inventory.length > 1){
                gameState.pc.inventory.push(gameState.pc.equippedItem);
                gameState.pc.inventory.shift();
            }
            gameState.pc.setEquippedItem(gameState.pc.inventory[0]);
            gameState.pc.equippedItem.updatePosition(gameState.pc);
        }
        showInventory(gameState);
    }

    /*
    |------------------------------------------------------------------------------
    | Run Game Loop
    |------------------------------------------------------------------------------
    */

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

});
module.exports.getData = getData;
