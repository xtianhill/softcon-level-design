/*Enemy Prototype
Note: location is a vector with x and y*/

function Enemy(loc, max, hea, stat, dmg){
    Character.call(this, loc, max, hea, stat);
    this.damage = dmg;
}

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
}  

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
}

//set int damage and return 1. returns 0 if amount isn't an int.
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
}
