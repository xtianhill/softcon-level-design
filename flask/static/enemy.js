/*Enemy Prototype
Note: location is a vector with x and y*/
const Character = require('./character.js');

function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav, dir, range, startLoc){
    t = typeof dmg
    t2 = typeof range
    if (t === "number" && (dir === "right" || dir === "left" || dir === "still")) {
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
        this.damage = dmg;
        this.direction = dir;
        this.range = range;
        this.startPos = startLoc;
    }
    else {
        return {}
    }
}

Enemy.prototype = Object.create(Character.prototype);

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
    Character.call(this, vector(0,0), 10, 10, 1, new vector(50,50), null, new vector(50,50));
    this.damage = 1;
    this.direction = "left";
    this.shouldFall = 1;
}

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
    return this.damage;
}

//set int damage
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
        t = typeof amount
        if (t === "number"){
            this.damage = amount;
        }
        else{
            return null;
        }
}

Enemy.prototype.getRange = function(){
    return this.range;
}

Enemy.prototype.setRange = function(rng){
    this.range = rng;
}

//gets direction
Enemy.prototype.getDirection = function(){
    return this.direction;
}

Enemy.prototype.changeDirection = function(){
    if(this.direction == "right")
        this.direction = "left";
    else if(this.direction == "left")
        this.direction = "right";
}

//set int damage
Enemy.prototype.setDirection = function(dir){
    //set damage to amount
        if (dir == "right" || dir == "left" || dir == "still"){
            this.direction = dir;
        }
        else{
            return null;
        }
}

Enemy.prototype.decHealth = function(){
    // decrease an enemies health if attacked with damage effect
}
module.exports = Enemy;
