const Element = require('./element.js');
const Vector = require('./utility.js');
//data: point location, int health, bool status
//function void dechealth


/*Character Prototype
Note: location is a vector with x and y*/

function Character(loc, max, hea, stat, hbox, url, size, spd, mvspd, grav){

    if((spd instanceof Vector) && (typeof mvspd === "number") && (typeof grav === "number")&&  (typeof stat === "boolean") && (typeof max === "number") && (typeof hea ==="number")){
        Element.call(this, loc, url, size, hbox);
        this.maxHealth = max; //maximum health
	    this.health=hea; //int health
	    this.status =stat; //true for alive, false for dead
        this.speed = spd; //for moving
        this.moveSpeed = mvspd; //tells how fast it moves
        this.gravity = grav;
    }
    else return {};

}

Character.prototype = Object.create(Element.prototype);


/* Example for how to create a function for a prototype. this is the javascript version
 of creating a method within a class*/
//decrement health function
// not in iteration 1
// Character.prototype.decHealth = function(amount){
//  	//decrement health by amount
// }
Character.prototype.getPosition = function(){
	return this.position;
}

Character.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

Character.prototype.getMaxHealth = function(){
    return this.maxHealth;
}

Character.prototype.setMaxHealth = function(amount){
    if(typeof amount === "number"){
        this.maxHealth = amount;
    }
}

Character.prototype.getHealth = function(){
    return this.health;
}

Character.prototype.setHealth = function(amount){
    if(typeof amount === "number"){
        this.health= amount;
    }
}

Character.prototype.getStatus = function(){
    return this.status;
}

Character.prototype.setStatus = function(s){
    if(typeof s === 'boolean'){
        this.status = s;
    }
}

Character.prototype.getSpeed = function(){
    return this.speed;
}

Character.prototype.setSpeed = function(spd){
    if(spd instanceof Vector){
        this.speed =spd;
    }
}

Character.prototype.getMovementSpeed = function() {
    return this.moveSpeed;
}

Character.prototype.setMovementSpeed = function(ms){
    if(typeof ms === "number"){
        this.moveSpeed = ms;
    }
}

Character.prototype.getGravity = function () {
    return this.gravity;
}

Character.prototype.setGravity = function(g) {
    if(typeof g === "number"){
        this.gravity = g;
    }
}

Character.prototype.newXPos = function(step, dir) {
  this.speed.x = 0
  if (dir == "right") this.speed.x = this.moveSpeed;
  if (dir == "left")  this.speed.x -= this.moveSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.position.plus(motion);
  return newPos;
};

Character.prototype.moveX = function(newPos, obstacle) {
  if(obstacle != null) {
      if(obstacle.getSolid() == 0){
          this.position = newPos;
        }
   }
   else{
       this.position = newPos;
     }
}

Character.prototype.newYPos = function(step) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.position.plus(motion);
  return newPos;
};

Character.prototype.moveY = function(newPos, obstacle, up) {
  var jumpSpeed = 70;
  if(obstacle != null) {
      if(obstacle.getSolid() == 1)
          newPos.x = this.position.x
          if (up && this.speed.y > 0){
              this.speed.y = -jumpSpeed;
          } else
              this.speed.y = 0;
        else
            this.position=newPos;
        }
   else
       this.position = newPos;
};



module.exports = Character;
