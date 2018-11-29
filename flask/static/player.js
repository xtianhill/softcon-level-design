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
function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed, mvspd, grav){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.equippedItem = itm;
    this.inventory = inv;
    this.sinceTile = 50;
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

//Getter for inventory
Player.prototype.getInventory= function(){
    return this.inventory;
}

//Setter for inventory
Player.prototype.setInventory = function(arr)
{
    this.inventory = arr;
}

//Getter for an owned item
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//Setter for owned item; return 1 if successful, return 0 for non-item input
Player.prototype.setEquippedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
    if(itm instanceof Item){
        //this.inventory.push(this.equippedItem);
        this.equippedItem = itm;
        itm.collected = true;
    }
}

//Use owned item
Player.prototype.useItem = function(target){
    /* if there is a target, do the effect (heal or damage)*/
    if(target != null){
        // DO A CHECK TO SEE IF THE TARGET IS LEGIT
        if(this.equippedItem.getEffect().effect == "heal"){
            // CHANGE THIS TO AMOUNT not rando value
            console.log(this.equippedItem);
            target.health += this.equippedItem.effect.amount; //
            if(target.health > target.maxHealth){
                target.health = target.maxHealth;
            }
            console.log(target.health);
        }
        else if (this.equippedItem.getEffect().effect == "damage"){
            console.log(target.health);
            target.health -= this.equippedItem.effect.amount;
            if(target.health <= 0){
                target.status = false;
            }
            console.log(target.health);
        }

    }
}

//Pick up an item
Player.prototype.pickUpItem = function(item){
    this.setEquippedItem(item);
    this.inventory.unshift(item);
}

module.exports = Player;
