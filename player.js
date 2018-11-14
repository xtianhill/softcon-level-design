/*Player Prototype
Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');

function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed);
    this.equippedItem = itm;
    this.inventory = inv;
}

Player.prototype = Object.create(Character.prototype);

//empty constructor. void
Player.prototype.Player = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, item = null

    Character.call(this, vector(0,0), 10, 10, 1, vector(50,50));
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
        return 1;
    }
    else return 0;
}

Player.prototype.useItem = function(){
    if(this.equippedItem.getEffect() == "heal"){
        this.health = this.maxHealth;
        this.equippedItem= null;
    }
    if (this.equippedItem.getEffect() == "damage"){
        //swing sword or whatever
    }
}

Player.prototype.newXPos = function(step, dir) {
  var playerXSpeed = 7;
  this.speed.x = 0;
  if (dir == "right") this.speed.x -= playerXSpeed;
  if (dir == "left") this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.loc.plus(motion);
  return newPos;
};

Player.prototype.moveX = function(newPos, obstacles) {

  //obstacles is a list constructed by detect collision in update
  if(obstacles != null) {
        for element in obstacles{
            //if environment, just stop
            if(elements[i] instanceof Environment){
                //if environment solid, do nothing
                //if enviroment is not solid:
                    this.loc = newPos;
            }
            else {
            //if npc, show message
            if(elements[i] instanceof NPC){
               //...
            }

            //if enemy, either damage w/item or lose health
            if(elements[i] instanceof Enemy){
                //...
            }

            //if item, pick up and remove from elements
            if(elements[i] instanceof Item){
                //...
            }
        this.loc = newPos;
        }
        }
    }
};

Player.prototype.newYPos = function(step) {
  var gravity = 30;
  var jumpSpeed = 17;

  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.loc.plus(motion);

  return newPos;
};

Player.prototype.moveY = function(newPos, obstacles, up) {

  //obstacles is a list constructed by detect collision in update
  if(obstacles != null) {
        for element in obstacles{
            //if environment, just stop
            if(elements[i] instanceof Environment){
                //if environment solid, do nothing
                //if enviroment is not solid:
                    if (up && this.speed.y > 0)
                      this.speed.y = -jumpSpeed;
                    else
                       this.speed.y = 0;
            }
            else {
            //if npc, show message
            if(elements[i] instanceof NPC){
               //...
            }

            //if enemy, either damage w/item or lose health
            if(elements[i] instanceof Enemy){
                //...
            }

            //if item, pick up and remove from elements
            if(elements[i] instanceof Item){
                //...
            }
        this.loc = newPos;
        }
        }
    } else
        this.loc = newPos;
};

module.exports = Player;
