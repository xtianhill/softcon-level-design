/*Enemy Prototype
Note: location is a vector with x and y*/

function Enemy(loc, max, hea, stat, dmg){
    Character.call(this, loc, max, hea, stat);
    this.damage = dmg;
}

//empty constructor
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
}  


Enemy.prototype.getDamage = function(){
    //get damage amount
}

Enemy.prototype.setDamage = function(amount){
    //set damage to amount
}
