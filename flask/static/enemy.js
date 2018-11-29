/*
|------------------------------------------------------------------------------
| Enemy Class
|------------------------------------------------------------------------------
|
| This file contains the Enemy prototype (the javascript equivalent of a
| class). Enemy is a subclass of the superclass Character. This contains
| data about an Enemy's status, as well as methods for moving and interacting
| with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Character = require('./character.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav, dir, range, startLoc){
    t = typeof dmg;
    t2 = typeof range;
    if (t === "number" && t2 === "number" && (dir === "right" || dir === "left" || dir === "still")) {
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
Enemy.prototype.constructor = Enemy;

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

//Getter for range
Enemy.prototype.getRange = function(){
    return this.range;
}

//Setter for range
Enemy.prototype.setRange = function(rng){
    this.range = rng;
}

//Getter for direction
Enemy.prototype.getDirection = function(){
    return this.direction;
}

//Changes direction
Enemy.prototype.changeDirection = function(){
    if(this.direction == "right")
        this.direction = "left";
    else if(this.direction == "left")
        this.direction = "right";
}

//Setter for direction
Enemy.prototype.setDirection = function(dir){
    //set damage to amount
        if (dir == "right" || dir == "left" || dir == "still"){
            this.direction = dir;
        }
        else{
            return null;
        }
}

module.exports = Enemy;
