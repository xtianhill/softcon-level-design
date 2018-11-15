(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.engine = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Element = require('./element.js');
//data: point location, int health, bool status
//function void dechealth

/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

/*Character Prototype
Note: location is a vector with x and y*/

function Character(loc, max, hea, stat, hbox, url, size, speed, mvspd, grav){
    Element.call(this, loc, url, size, hbox);
    this.maxHealth = max; //maximum health
	  this.health=hea; //int health
	  this.status=stat; //true for alive, false for dead
    this.speed = speed; //for moving
    this.moveSpeed = mvspd; //tells how fast it moves
    this.gravity = grav;
}

Character.prototype = Object.create(Element.prototype);


/* Example for how to create a function for a prototype. this is the javascript version
 of creating a method within a class*/
//decrement health function
// not in iteration 1
// Character.prototype.decHealth = function(amount){
//  	//decrement health by amount
// }

//getters and setters
Character.prototype.getLocation = function(){
    return this.position;
}

Character.prototype.setLocation = function(pos){
    this.position = pos;
}

Character.prototype.getMaxHealth = function(){
    return this.maxHealth;
}

Character.prototype.setMaxHealth = function(amount){
    this.maxHealth = amount;
}

Character.prototype.getHealth = function(){
    return this.health;
}

Character.prototype.setHealth = function(amount){
    this.health= amount;
}

Character.prototype.getStatus = function(){
    return this.status;
}

Character.prototype.setStatus = function(s){
    this.status = s;
}

Character.prototype.newXPos = function(step, dir) {
  this.speed.x = 0
  if (dir == "right") this.speed.x = this.moveSpeed;
  if (dir == "left")  this.speed.x -= this.moveSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.position.plus(motion);
  return newPos;
};

Character.prototype.moveX = function(newPos, obstacle) {
  if(obstacle != null) {
      //if environment solid, do nothing
      if(!obstacle.isSolid)
          this.position = newPos;
   }
   else
       this.position = newPos;
};

Character.prototype.newYPos = function(step) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.position.plus(motion);
  return newPos;
};

Character.prototype.moveY = function(newPos, obstacle, up) {
  var jumpSpeed = 70;
  if(obstacle != null) {
      if(obstacle.getSolid() == 1)
          if (up && this.speed.y > 0){
              this.speed.y = -jumpSpeed;
          } else
              this.speed.y = 0;
       } 
   else
       this.position = newPos;
};



module.exports = Character;

},{"./element.js":2}],2:[function(require,module,exports){
const Vector = require('./utility.js');

/*Element prototype */
/*note: pos, scl, hitbox are vectors with x and y values */

function Element(pos, url, sz, hbox){
	this.position = pos; 
	this.sprite = url; //url to image file
	this.size = sz; //scale to resize image dimensions
	this.hitbox = hbox;
}

Element.prototype.getPosition = function(){
	return this.position;
}

Element.prototype.setPosition = function(pos){
	this.position = pos;
}

Element.prototype.getSprite = function(){
	return this.sprite;
}

Element.prototype.setSprite = function(url){
	this.sprite = url;
}

Element.prototype.getSize = function(){
	return this.size;
}

Element.prototype.setSize = function(scale){
	this.size = scale;
}

Element.prototype.getHitbox = function(){
	return this.hitbox;
}

Element.prototype.setHitbox = function(hitbox){
	this.hitbox = hitbox;
}

module.exports = Element;
},{"./utility.js":10}],3:[function(require,module,exports){
/*Enemy Prototype
Note: location is a vector with x and y*/
const Character = require('./character.js');

function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
    this.damage = dmg;
}

Enemy.prototype = Object.create(Character.prototype);

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
    Character.call(this, vector(0,0), 10, 10, 1, new vector(50,50), null, new vector(50,50));
    this.damage = 1;
}  

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
    return this.damage;
}

//set int damage
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
        this.damage = amount;
        
  
}


module.exports = Enemy;

},{"./character.js":1}],4:[function(require,module,exports){
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
var step = 0.05;

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

    // find things that collide if moving left-right
    xObstacle = null;
    for(i=0; i<elements.length; i++){
        if(detectYCollision(pc.position, elements[i].position, pc.size, elements[i].size)
            && detectXCollision(pc.position, elements[i].position, pc.size, elements[i].size)){
		    if(elements[i] instanceof Environment)
           		xObstacle = elements[i];
	    	else
                onCollision(pc, elements, i);
        }
    }
    
    // move right or left as long as no wall is in the way
    if (rightPressed){
      if (pc.position.x+1 < (width-pc.size.x)){
        newXPos = pc.newXPos(step, "right");
        pc.moveX(newXPos, xObstacle);
      }
    } else if (leftPressed){
      if(pc.position.x-1 > 0){
        newXPos = pc.newXPos(step, "left");
        pc.moveX(newXPos, xObstacle);
      }
    }

    // find collisions if trying to jump or landing on something
    newYPos = pc.newYPos(step);
    yObstacle = null;
    for(i=0; i<elements.length; i++){
            if(detectYCollision(newYPos, elements[i].position, pc.size, elements[i].size)
                && detectXCollision(newYPos, elements[i].position, pc.size, elements[i].size)){
                if(elements[i] instanceof Environment)
                    yObstacle = elements[i];
                else
                    onCollision(pc, elements, i);
            }
        }

    // jump or fall as long as no ground (or ceiling, hopefully) is in the way
    if (upPressed){
      if(pc.position.y-1 > 0){
        pc.moveY(newYPos, yObstacle, true);
    } 
    } else {
      pc.moveY(newYPos, yObstacle, false);
  }

  for(i=0; i<elements.length; i++){
    if (elements[i] instanceof NPC || elements[i] instanceof Enemy) {
        yObstacle = null;
        for(j=0; j<elements.length; j++){
            newPos = elements[i].newYPos(step);
            if (i != j && detectYCollision(newPos, elements[j].position, elements[i].size, elements[j].size)
                && detectXCollision(newPos, elements[j].position, elements[i].size, elements[j].size)) {
                yObstacle = elements[j];
            }
        }
        elements[i].moveY(newPos, yObstacle, false)
        console.log(elements[i])
        console.log(elements[i].speed.y)
    }
}
}
    
function detectXCollision(pos1, pos2, size1, size2) {
    if(pos1 == null || pos2 == null || size1 == null || size2 == null)
        return false;
    if ((pos1.x < pos2.x + size2.x)  && (pos1.x + size1.x  > pos2.x))
        return true;
    return false;
}

function detectYCollision(pos1, pos2, size1, size2) {
    if(pos1 == null || pos2 == null || size1 == null || size2 == null)
        return false;
    if ((pos1.y <  pos2.y + size2.y && pos1.y + size1.y > pos2.y))
        return true;
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

},{"./character.js":1,"./element.js":2,"./enemy.js":3,"./environment.js":5,"./item.js":6,"./npc.js":7,"./parsing.js":8,"./player.js":9,"./utility.js":10}],5:[function(require,module,exports){
/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox){
    Element.call(this, pos, url, scale, hbox);
    this.solid = solid;
}

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= true;
}

Environment.prototype.getSolid = function(){
    return this.solid;
}

Environment.prototype.setSolid = function(bool){
    this.solid = bool;
}

module.exports = Environment;
},{"./element.js":2}],6:[function(require,module,exports){
/* Item Prototype */

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');

function Item(pos, url, sz, hbox, col, eff){
    Element.call(this, pos, url, sz, hbox);
    this.collected = col;
    this.effect = eff;
}

Item.prototype.Item = function(){  
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
};

Item.prototype.setEffect= function(eft){
    this.effect = eft;
};

Item.prototype.getEffect=function(){
    return this.effect;
};

Item.prototype.getCollected= function(){
    return this.collected;
};

Item.prototype.setCollected= function(b){
    this.collected = b;
};

module.exports = Item;
},{"./element.js":2}],7:[function(require,module,exports){
const Character = require('./character.js');
const Vector = require('./utility.js').vector;

function NPC(loc, max, hea, stat, msg, hbox, url, size, speed, mvspd, grav){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.message = msg;
}

NPC.prototype = Object.create(Character.prototype);

//empty constructor
NPC.prototype.NPC = function(){
    //create an NPC with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, and no message
    Character.call(this, new Vector(0,0), 10, 10, 1, new Vector(50,50), null, new Vector(50,50));
    this.message = "";
}  


NPC.prototype.getMessage = function(){
    if(this.message != null)
        return this.message;
    else 
    {
        return 0;
    }
}

NPC.prototype.setMessage = function(msg){
    this.message = msg;
}  



module.exports = NPC;

},{"./character.js":1,"./utility.js":10}],8:[function(require,module,exports){
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');

function JSONtoElements(data){
    var dataobj= JSON.parse(data);
    i=0;
    var elementarray= [];
    var backgroundurl=dataobj.backgroundImage;
        for (i=0; i<dataobj.objects.length; i++){
            var temp= dataobj.objects[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    console.log(pos);
                    element = new Environment(1,pos,url,sz,hitbox);
                }
                else if (temp.name == "Item"){
                    var col=0;
                    var eff="heal";
                    element = new Item(pos, url, sz, hitbox, col, eff);
                }
                else if (temp.name == "Player"){
                    var max = 10;
                    var hea = 10;
                    var stat = 1;
                    var itm= 0;
                    var inv= [];
                    var spd = new Vector(0,0);
                    var mvspd = 60;
                    var grav = 40;
                    element = new Player(pos, max, hea, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 10;
                    var stat= 1;
                    var msg = "hi there";
                    var spd = new Vector(0,0);
                    var mvspd = 30;
                    var grav = 50;
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "Enemy"){
                    var max = 10;
                    var hea= 10;
                    var stat = 1;
                    var dmg= 1;
                    var spd = new Vector(0,0);
                    var mvspd = 40;
                    var grav = 3;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz, spd, mvspd, grav);
                }
                elementarray.push(element);
            }
        }
        return {"elements": elementarray,
                "backgroundUrl": backgroundurl };
    }
module.exports = JSONtoElements;
    
    
},{"./character.js":1,"./element.js":2,"./enemy.js":3,"./environment.js":5,"./item.js":6,"./npc.js":7,"./player.js":9,"./utility.js":10}],9:[function(require,module,exports){
/*Player Prototype
Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');
const Vector = require('./utility.js');

function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed, mvspd, grav){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.equippedItem = itm;
    this.inventory = inv;
}

Player.prototype = Object.create(Character.prototype);

//empty constructor. void
Player.prototype.Player = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, item = null, size 50x50, speed 10x10

    Character.call(this, vector(0,0), 10, 10, 1, vector(50,50), vector(33,13));
    this.equippedItem = null;
    this.inventory = [];
}  

Player.prototype.getInventory= function(){
    return this.inventory;
}

Player.prototype.setInventory = function(arr)
{
    this.inventory = arr;
}

//gets OwnedItem. 
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//set owned item and return 1. return 0 for non-item input
Player.prototype.setEquippedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
    if(itm instanceof Item){
        this.inventory.push(this.equippedItem);
        this.equippedItem = itm;
        itm.collected = true;
    }
}

Player.prototype.useItem = function(){
    if(this.equippedItem.getEffect() == "heal"){
        this.health = this.maxHealth;
        this.equippedItem= null;
    }
    if (this.equippedItem.getEffect() == "damage"){ 
        //swing sword or whatever
    }
    this.equippedItem.getEffect().activate();
}

module.exports = Player;

},{"./character.js":1,"./item.js":6,"./utility.js":10}],10:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

module.exports = Vector;
},{}]},{},[4])(4)
});
