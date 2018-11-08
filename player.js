/*Player Prototype
Note: location is a vector with x and y*/
const Character = require('./character.js');

function Player(loc, max, hea, stat, itm, hbox){
    Character.call(this, loc, max, hea, stat, hbox);
    this.ownedItem = itm;
}

Player.prototype = Object.create(Character.prototype);

//empty constructor. void
Player.prototype.Player = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, item = null
}  

//gets OwnedItem. 
Player.prototype.getOwnedItem= function(){
    //return owned item
}

//set owned item and return 1. return 0 for non-item input.
Player.prototype.setOwnedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
}

Player.prototype.useItem = function(){
    // if have an item, use its effect on whatever
}
module.exports = Player;
