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
    if((this.equippedItem.getEffect())["effect"] == "heal"){
        this.health = this.maxHealth;
        this.equippedItem= null;
    }
    else if ((this.equippedItem.getEffect())["effect"] == "damage"){ 
        //swing sword or whatever
    }
    else {
        this.equippedItem.getEffect().activate();
    }
}

Player.prototype.pickUpItem = function(){
    // to be called when player collides with item
}

module.exports = Player;
