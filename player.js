/*Player Prototype
Note: location is a vector with x and y*/

function Player(loc, max, hea, stat, itm){
    Character.call(this, loc, max, hea, stat);
    this.ownedItem = itm;
}

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
}
  
