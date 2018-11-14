/*Player Prototype
Note: location is a vector with x and y*/
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

//gets OwnedItem. 
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//set owned item and return 1. return 0 for non-item input.
Player.prototype.setOwnedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
    if(itm instanceof item){
        this.ownedItem = itm;
        itm.collected = true;
        return 1;
    }
    else return 0;
}

Player.prototype.useItem = function(){
    // if have an item, use its effect on whatever
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
