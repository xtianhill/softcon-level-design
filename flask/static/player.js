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
    if((itm instanceof Item) && (Array.isArray(inv)) && (dir instanceof Vector)){
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
