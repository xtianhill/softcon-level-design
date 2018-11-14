/*Player Prototype
Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');

function Player(loc, max, hea, stat, itm, inv, hbox, url, size){
    Character.call(this, loc, max, hea, stat, hbox, url, size);
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

Player.prototype.moveLeft = function(){
    currX= this.getLocation().x;
    currY= this.getLocation().y;
    this.setLocation(vector(x-.1,y));

}

Player.prototype.moveRight = function(){
    currX= this.getLocation().x;
    currY= this.getLocation().y;
    this.setLocation(vector(x+.1,y));
}

module.exports = Player;
