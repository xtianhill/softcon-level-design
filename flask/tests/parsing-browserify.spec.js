(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.parsing = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Character Class
|------------------------------------------------------------------------------
|
| This file contains the Character prototype (the javascript equivalent of a
| class). Character is the super of Player, NPC, and Enemy. It contains data
| about character status (e.g. health, speed), as well as methods for moving
| and interacting with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Element = require('./element.js');
const Vector = require('./utility.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/

function Character(loc, max, hea, stat, hbox, url, size, spd, mvspd, grav){
    // console.log("speed", (spd instanceof Vector));
    // console.log("mvspeed", (typeof mvspd === "number"));
    // console.log("stat", (typeof stat === "boolean"));
    // console.log("grav", (typeof grav === "number"));
    // console.log("health", (typeof hea ==="number"));
    // console.log("max",  (typeof max === "number"));
    if((spd instanceof Vector) && (typeof mvspd === "number") &&
       (typeof grav === "number")&&  (typeof stat === "boolean") &&
       (typeof max === "number") && (typeof hea ==="number")){
        Element.call(this, loc, url, size, hbox);
        this.maxHealth = max; //maximum health
	      this.health=hea; //int health
	      this.status =stat; //true for alive, false for dead
        this.speed = spd; //for moving
        this.moveSpeed = mvspd; //tells how fast it moves
        this.gravity = grav;
    }
     else return {};
}

Character.prototype = Object.create(Element.prototype);

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/

// Getter for position
Character.prototype.getPosition = function(){
	return this.position;
}

// Setter for position
Character.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

// Getter for maxHealth
Character.prototype.getMaxHealth = function(){
    return this.maxHealth;
}

// Setter for maxHealth
Character.prototype.setMaxHealth = function(amount){
    if(typeof amount === "number"){
        this.maxHealth = amount;
    }
}

// Getter for health
Character.prototype.getHealth = function(){
    return this.health;
}

// Setter for health
Character.prototype.setHealth = function(amount){
    if(typeof amount === "number"){
        this.health= amount;
    }
}

// Getter for status
Character.prototype.getStatus = function(){
    return this.status;
}

// Setter for status
Character.prototype.setStatus = function(s){
    if(typeof s === 'boolean'){
        this.status = s;
    }
}

// Getter for speed
Character.prototype.getSpeed = function(){
    return this.speed;
}

// Setter for speed
Character.prototype.setSpeed = function(spd){
    if(spd instanceof Vector){
        this.speed =spd;
    }
}

// Getter for movementSpeed
Character.prototype.getMovementSpeed = function() {
    return this.moveSpeed;
}

// Setter for movementSpeed
Character.prototype.setMovementSpeed = function(ms){
    if(typeof ms === "number"){
        this.moveSpeed = ms;
    }
}

// Getter for gravity
Character.prototype.getGravity = function () {
    return this.gravity;
}

// Setter for gravity
Character.prototype.setGravity = function(g) {
    if(typeof g === "number"){
        this.gravity = g;
    }
}

/*
|------------------------------------------------------------------------------
| Movement-related functions for the Character prototype, wherein much of
| the physics calculations are performed.
|------------------------------------------------------------------------------
*/

// Calculates the hypothetical next x position of a Character given a direction
// in which the character is trying to move.
Character.prototype.newXPos = function(step, dir) {
  this.speed.x = 0
  if (dir == "right") this.speed.x = this.moveSpeed;
  if (dir == "left")  this.speed.x -= this.moveSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next x position of a Character is legal, and if so,
// updates its position.
Character.prototype.moveX = function(newPos, obstacle) {
    if (this.status) {
        if (obstacle != null) {
            if (obstacle.getSolid() == 0) {
                this.position = newPos;
            }
        }
        else {
            this.position = newPos;
        }
    }
}

// Calculates the hypothetical next y position of a character based on gravity
Character.prototype.newYPos = function(step) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * 2 * step);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next y position of a Character is legal, and if so,
// updates its position; if it hits the ground stops its motion; if it is on
// ground and jumps, updates its speed to allow the jump on the next game loop.
Character.prototype.moveY = function(newPos, obstacle, up) {
    var jumpSpeed = 70;
    if (this.status) {
        if (obstacle != null) {
            if (obstacle.solid) {
                newPos.x = this.position.x
                if (up && this.speed.y > 0) {
                    this.speed.y = -jumpSpeed;
                } else
                    this.speed.y = 0;
            }
        } else
            this.position = newPos;
    }
};

Character.prototype.decHealth = function(damage){
    this.health -= damage;
    if(this.health <= 0){
        this.status = false;
    }
}

Character.prototype.addHealth = function(amount){
    this.health += amount;
    if(this.health > this.maxHealth){
        this.health = this.maxHealth;
    }
}

module.exports = Character;

},{"./element.js":3,"./utility.js":10}],2:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Effect Class
|------------------------------------------------------------------------------
|
| This file contains the Effect prototype (the javascript equivalent of a
| class). Effect is used by Environment and Item. It contains data
| about how an Effect affects the game (e.g. restores health), as well as
| methods for activating or changing an Effect.
|
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Constructors
|------------------------------------------------------------------------------
*/

function Effect(title, amount){
    t = typeof title;
    t2 = typeof amount;
    //if (t === "string" && t2 === "number" && (title == 'heal' || title == 'damage')){
    this.effect = title;
    this.isActive = false;
    this.amount = amount;
//   }
//   else{
//     return {};
//   }
}

// Effect.prototype.Effect = function(bool, title){
//     if (title == 'heal' || title == 'damage'){
//     this.isActive = bool;
//     this.effect = title;
//   }
//   else{
//     return {};
//   }
// }

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/

// Getter for isActive
Effect.prototype.getIsActive = function(){
    return this.isActive;
}

// Setter for Effect type
Effect.prototype.setEffect = function(eft){
    t = typeof eft;
    if (t == "object") {
        this.effect = eft.effect;
        this.isActive = eft.isActive;
        this.amount = eft.amount;
    }
    else {
        return null;
    }
}

// Getter for  Effect type
Effect.prototype.getEffect = function(){
    return this.effect;
}

// Setter for isActive
Effect.prototype.activate = function(){
    this.isActive = true;
}

// Setter for isActive
Effect.prototype.deactivate = function(){
    this.isActive = false;
}

// Getter for amount
Effect.prototype.getAmount = function(){
    return this.amount;
}

// Setter for amount
Effect.prototype.setAmount = function(num){
    t = typeof num;
    if (t === "number"){
        this.amount = num;
    }
    else{
        return null;
    }
}

module.exports = Effect;

},{}],3:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Element Class
|------------------------------------------------------------------------------
|
| This file contains the Element prototype (the javascript equivalent of a
| class). Element has getters and setters for its position, sprite, size, and hitbox.
|
|------------------------------------------------------------------------------
*/

const Vector = require('./utility.js');

/*note: pos, scl, hitbox are vectors with x and y values */

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Element(pos, url, sz, hbox){
	if(((pos instanceof Vector) && (typeof url === 'string')) && ((sz instanceof Vector) && (hbox instanceof Vector))){
		this.position = pos; 
		this.sprite = url; //url to image file
		this.size = sz; //scale to resize image dimensions
		this.hitbox = hbox;
	} else {
		return {};
	}
}

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/
//Getter for position
Element.prototype.getPosition = function(){
	return this.position;
}

//Setter for position
Element.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

//Getter for sprite
Element.prototype.getSprite = function(){
	return this.sprite;
}

//Setter for sprite
Element.prototype.setSprite = function(url){
	if(typeof url === 'string'){
		this.sprite = url;
	}
}

//Getter for size
Element.prototype.getSize = function(){
	return this.size;
}

//Setter for size
Element.prototype.setSize = function(scl){
	if (scl instanceof Vector){
		this.size = scl;
	}
}

//Getter for Hitbox
Element.prototype.getHitbox = function(){
	return this.hitbox;
}

//Setter for Hitbox
Element.prototype.setHitbox = function(hbx){
	if(hbx instanceof Vector){
		this.hitbox = hbx;
	}
}

module.exports = Element;
},{"./utility.js":10}],4:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Enemy Class
|------------------------------------------------------------------------------
|
| This file contains the Enemy prototype (the javascript equivalent of a
| class). Enemy is a subclass of the superclass Character. This contains
| data about an Enemy's status, as well as methods for moving and interacting
| with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Character = require('./character.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav, dir, range, startLoc){
    t = typeof dmg;
    t2 = typeof range;
    //if (t === "number" && t2 === "number" && (dir === "right" || dir === "left" || dir === "still")) {
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
        console.log("please dear god");
        this.damage = dmg;
        this.direction = dir;
        this.range = range;
        this.startPos = startLoc;
   // }
    // else {
    //     return {}
    // }
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
    Character.call(this, vector(0,0), 10, 10, 1, new vector(50,50), null, new vector(50,50));
    this.damage = 1;
    this.direction = "left";
    this.shouldFall = 1;
}

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
    return this.damage;
}

//set int damage
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
        t = typeof amount;
        if (t === "number"){
            this.damage = amount;
        }
        else{
            return null;
        }
}

//Getter for range
Enemy.prototype.getRange = function(){
    return this.range;
}

//Setter for range
Enemy.prototype.setRange = function(rng){
    t = typeof rng;
    if (t === "number"){
        this.range = rng;
    }
    else{
        return null;
    }
}

//Getter for direction
Enemy.prototype.getDirection = function(){
    return this.direction;
}

//Changes direction
Enemy.prototype.changeDirection = function(){
    if(this.direction === "right"){
        this.direction = "left";
    } else if(this.direction === "left"){
        this.direction = "right";
    }
}

//Setter for direction
Enemy.prototype.setDirection = function(dir){
    //set damage to amount
        t = typeof dir;
        if (t === "string" && (dir == "right" || dir == "left" || dir == "still")){
            this.direction = dir;
        }
        else{
            return null;
        }
}

module.exports = Enemy;

},{"./character.js":1}],5:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Environment Class
|------------------------------------------------------------------------------
|
| This file contains the Environment prototype (the javascript equivalent of a
| class). 
|
|------------------------------------------------------------------------------
*/


/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');
const Effect = require('./effect.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Environment(solid, pos, url, scale, hbox, eff){
    // console.log("solid", solid == true);
    // console.log("solid", solid == false);
   //if (solid == true || solid == false) {
        console.log("did env work");
      Element.call(this, pos, url, scale, hbox);
      this.solid = solid;
      this.effect = eff;
  //}
//   else{
//       return {};
//     }
};

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= 1;
    this.effect = new Effect("heal", 2);;
};

//Getter for solid
Environment.prototype.getSolid = function(){
    return this.solid;
};

//Setter for solid
Environment.prototype.setSolid = function(bool){
  if (bool == 1 || bool == 0){
      this.solid = bool;
  }
};

//Setter for effect
Environment.prototype.setEffect= function(eft){
    if(eft instanceof Effect)
        {this.effect = eft;}
};

//Getter for effect
Environment.prototype.getEffect=function(){
    return this.effect;
};

module.exports = Environment;

},{"./effect.js":2,"./element.js":3}],6:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Item Class
|------------------------------------------------------------------------------
|
| This file contains the Item prototype (the javascript equivalent of a
| class). It contains data about item status, position, and effect.
|
|------------------------------------------------------------------------------
*/

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');
const Vector = require('./utility.js');
const Effect = require('./effect.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const NPC = require('./npc.js');


/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Item(pos, url, sz, hbox, col, eff, bpos, hov, targets){
    Element.call(this, pos, url, sz, hbox);
    if ((typeof col === 'boolean') && (eff instanceof Effect)) {
        this.collected = col;
        this.effect = eff;
        this.basePos = bpos;
        this.hovering = hov;
        this.wobble = Math.random() * Math.PI * 2;
        this.targets=[];
        // for(i=0;i<targets.length;i++){
        //     console.log("hello");
        //     if(targets[i] === "Player"){
        //         this.targets.push(Player);
        //     }
        //     if(targets[i] === "Enemy"){
        //         this.targets.push(Enemy);
        //     }
        //     if(targets[i] === "NPC"){
        //         this.targets.push(NPC);
        //     }
        // }
        if(this.targets.length == 0){
            this.targets.push(Player);
        }
        
    } else {
        return {};
    }
}

Item.prototype.Item = function(){
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
}

//Getter for effect
Item.prototype.getEffect = function(){
    return this.effect;
}

//Setter for effect
Item.prototype.setEffect = function(eft){
    if (eft instanceof Effect) {
        this.effect = eft;
    }
}

//Getter for whether the item has been collected
Item.prototype.getCollected = function(){
    return this.collected;
}

//Setter for whether the item has been collected
Item.prototype.setCollected = function(b){
    this.collected = b;
}

//Make item hover
Item.prototype.hover = function(step) {
    if (typeof step == 'number') {
        wobbleSpeed = 2;
        // wobbleDist = 1.5;
        this.wobble += step * wobbleSpeed;
        // var wobblePos = Math.sin(this.wobble) * wobbleDist;
        // this.position = this.basePos.plus(new Vector(0, wobblePos));
    } else {
        return null;
    }
}

//Update the item's position
Item.prototype.updatePosition = function(pc) {
    if(pc.dir == "right"){
        this.position.x = pc.position.x + pc.hitbox.x * .75;
        this.position.y = pc.position.y; //- pc.hitbox.y;
      }
      else{
        this.position.x = pc.position.x - pc.hitbox.x * .75;
        this.position.y = pc.position.y; //- pc.hitbox.y;
      }
}
module.exports = Item;

},{"./effect.js":2,"./element.js":3,"./enemy.js":4,"./npc.js":7,"./player.js":9,"./utility.js":10}],7:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| NPC Class
|------------------------------------------------------------------------------
|
| This file contains the NPC prototype (the javascript equivalent of a
| class). NPC is a subclass of the Character superclass. It has 
| information about the NPC's message.
|
|------------------------------------------------------------------------------
*/

const Character = require('./character.js');
const Vector = require('./utility.js').vector;

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function NPC(loc, max, hea, stat, msg, hbox, url, size, speed, mvspd, grav){
    
    if(typeof msg === "string"){
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
        this.message = msg;
        this.spokenTo = false;
    }
    else return {};
}

NPC.prototype = Object.create(Character.prototype); 
NPC.prototype.constructor = NPC;
//Getter for message
NPC.prototype.getMessage = function(){
    return this.message;
    
}

//Setter for message
NPC.prototype.setMessage = function(msg){
    //disallow non-string message
    if(typeof msg == "string"){
        this.message = msg;
        return;
    }   
    else 
        return null;
}



module.exports = NPC;

},{"./character.js":1,"./utility.js":10}],8:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Parser
|------------------------------------------------------------------------------
|
| This file contains the Parser, the JSONtoElements function, which
| creates a new element based on data from a given JSON.
|
|------------------------------------------------------------------------------
*/

const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Effect = require('./effect.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');

var defaultUrl = "https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png";
function JSONtoElements(data){
    if(data == '{}'){
        return {"elements": [],
                "backgroundUrl": '' }; 
    }
    console.log("data in paring", data);
    var dataobj= JSON.parse(data);
    console.log(dataobj);
    
    i=0;
    var elementarray= [];
    var backgroundurl= dataobj.background; //dataobj.backgroundImage";
        for (i=0; i<dataobj.objects.length; i++){
            var temp= dataobj.objects[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    console.log(temp);
                    var eff = new Effect(temp.effect, 1); // new Effect("damage", 1);
                    console.log("did effect work", eff);
                    var solid = temp.solid;
                    console.log("solid!", solid);
                    element = new Environment(solid,pos,url,sz,hitbox,eff);
                    console.log(element);
                }
                else if (temp.name == "Item"){
                    console.log("item", dataobj.objects[i]);
                    var col = false;
                    var eff = new Effect("damage", 1);
                    var hov =true;
                    var targets = dataobj.objects[i].targets;
                    element = new Item(pos, url, sz, hitbox, col, eff, pos, hov, targets);
                    console.log('from parsing');
                }
                else if (temp.name == "Player"){
                    console.log("player",dataobj.objects[i]);
                    var max = 10;//dataobj.objects[i].maxhealth;
                    var stat = true;
                    var itm= null;
                    var inv= [];
                    var hitbox = new Vector(50,50);
                    if(url === defaultUrl)
                        hitbox = new Vector(19,50);
                    var spd = new Vector(0,0);
                    var mvspd = 30;//dataobj.objects[i].speed;
                    var grav =  50;//dataobj.objects[i].gravity;
                    var dir = "right";
                    element = new Player(pos, max, max, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav, dir);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 7;
                    var stat = true; 
                    var msg =  dataobj.objects[i].msg;
                    var spd = new Vector(0,0);
                    var mvspd = 30;
                    var grav = 50;
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "Enemy"){
                    var max = 10;
                    var hea= 10;
                    var stat = true;
                    var dmg =  1;//dataobj.objects[i].damage;
                    var spd = new Vector(0,0);
                    var mvspd = 15;
                    var grav = 60;
                    var dir = "left";
                    var range = 35;
                    var startLoc = pos;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz, spd, mvspd, grav, dir, range, startLoc);
                }
                elementarray.push(element);
            }
        }
        
        return {"elements": elementarray,
                "backgroundUrl": "https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png"
             }
    }
module.exports = JSONtoElements;

},{"./character.js":1,"./effect.js":2,"./element.js":3,"./enemy.js":4,"./environment.js":5,"./item.js":6,"./npc.js":7,"./player.js":9,"./utility.js":10}],9:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Player Class
|------------------------------------------------------------------------------
|
| This file contains the Player prototype (the javascript equivalent of a
| class). Player is a subclass of the superclass Character. It contains
| data about player status and whether the player has an item.
|
|------------------------------------------------------------------------------
*/
/*Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');
const Vector = require('./utility.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed, mvspd, grav, dir){
    if((Array.isArray(inv))){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.equippedItem = itm;
    this.inventory = inv;
    this.sinceTile = 50;
    this.direction = dir;
    
    } else
        return {};
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


//Getter for inventory
Player.prototype.getInventory= function(){
    return this.inventory;
}

//Setter for inventory
Player.prototype.setInventory = function(arr){
    if(Array.isArray(arr)){
        items= true;
        for(i=0; i<arr.length; i++){
            if(!(arr[i] instanceof Item))
                items=false;
        }
        if(items){
        this.inventory = arr;
        }
    }
}

//Getter for an owned item
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//Setter for owned item; return 1 if successful, return 0 for non-item input
Player.prototype.setEquippedItem = function(itm){
    // set owned item to itm
    // set item.collected to be true
    if(itm instanceof Item){
        // this.inventory.push(this.equippedItem);
        this.equippedItem = itm;
        itm.collected = true;
    }
}

//Use owned item
Player.prototype.useItem = function(target){
    /* if there is a target, do the effect (heal or damage)*/
    if(this.status){
        if(this.isTarget(target)){
            if(this.equippedItem.getEffect().effect == "heal" && target.status){
                target.addHealth(this.equippedItem.getEffect().getAmount());
            }
            else if (this.equippedItem.getEffect().effect == "damage" && target.status){
                target.decHealth(this.equippedItem.getEffect().getAmount());
            }
        }
    }

}

//Pick up an item
Player.prototype.pickUpItem = function(item){
    this.setEquippedItem(item);
    this.inventory.unshift(item);
}

Player.prototype.isTarget = function (target){
    for(i=0;i<this.equippedItem.targets.length;i++){
        if(this.equippedItem.targets[i].name == target.constructor.name){
            return true;
        }
    }
    return false;
}

module.exports = Player;

},{"./character.js":1,"./item.js":6,"./utility.js":10}],10:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Vector Class
|------------------------------------------------------------------------------
|
| This file contains the Vector prototype (the javascript equivalent of a
| class).
|
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Vector(x,y){
	if (typeof(x) != 'number' || typeof(y) != 'number'){
		return {};
	}
	else{
		this.x=x;
		this.y=y;
	}
}

//Add to the vector
Vector.prototype.plus = function(vec) {
	if (typeof(vec.x) != 'number' || typeof(vec.y) != 'number'){
		return {};
	}
	else{
		return new Vector (this.x + vec.x, this.y + vec.y);
	}
}

//Multiply the vector times a number or a vector
Vector.prototype.times = function(num) {
	if(typeof(num) == 'number')
	    return new Vector (this.x * num, this.y * num);
	else if(num instanceof Vector)
	    return new Vector (this.x * num.x, this.y * num.y);
}

module.exports = Vector;

},{}],11:[function(require,module,exports){

/*
|------------------------------------------------------------------------------
| Tests for Parser
|------------------------------------------------------------------------------
|
| This file contains tests for the Parser.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const JSONtoElements = require('../static/parsing.js')
const NPC = require('../static/npc.js');
const Enemy = require('../static/enemy.js');
const Player = require('../static/player.js');
const Item = require('../static/item.js');
const Element = require('../static/element.js');
const Character = require('../static/character.js');
const Environment = require('../static/environment.js');
const Vector = require('../static/utility.js');


describe('Parsing', function() {
	let JSON1;
	let JSON2;

	/*
	|--------------------------------------------------------------------------
	| beforeEach: makes an instance of the class to use for tests. Makes a new
	| version of this test instance before every test, clearing out any
	| modifications to the default data.
	|--------------------------------------------------------------------------
	*/

	beforeEach(function(){
		JSON1 = '{}';
		JSON2 = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Environment","top":250,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1,"solid":"1","effect":"heal"},{"type":"Element","name":"Player","top":200,"left":450,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1,"speed":"high","gravity":"medium","maxhealth":"100"}],"background":""}';
	});

	/*
	|--------------------------------------------------------------------------
	| JSONtoElements Tests
	|--------------------------------------------------------------------------
	*/

	it('should return an empty array and empty backgroundurl given an empty JSON', function(){
			var returned = JSONtoElements(JSON1);
			expect((returned).elements).toEqual([]);
			expect((returned).backgroundUrl).toEqual('');
	});

	it('should return an array with 2 environment elements in it and given background image ', function(){
		 var returned = JSONtoElements(JSON2);
		expect((returned).backgroundUrl).toEqual('https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png');
	});
});

},{"../static/character.js":1,"../static/element.js":3,"../static/enemy.js":4,"../static/environment.js":5,"../static/item.js":6,"../static/npc.js":7,"../static/parsing.js":8,"../static/player.js":9,"../static/utility.js":10}]},{},[11])(11)
});
