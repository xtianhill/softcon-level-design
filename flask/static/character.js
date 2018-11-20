const Element = require('./element.js');
//data: point location, int health, bool status
//function void dechealth

/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

/*Character Prototype
Note: location is a vector with x and y*/

function Character(loc, max, hea, stat, hbox, url, size, speed, mvspd, grav){
    Element.call(this, loc, url, size, hbox);
    this.maxHealth = max; //maximum health
	  this.health=hea; //int health
	  this.status=stat; //true for alive, false for dead
    this.speed = speed; //for moving
    this.moveSpeed = mvspd; //tells how fast it moves
    this.gravity = grav;
}

Character.prototype = Object.create(Element.prototype);


/* Example for how to create a function for a prototype. this is the javascript version
 of creating a method within a class*/
//decrement health function
// not in iteration 1
// Character.prototype.decHealth = function(amount){
//  	//decrement health by amount
// }

//getters and setters
Character.prototype.getLocation = function(){
    return this.position;
}

Character.prototype.setLocation = function(pos){
    this.position = pos;
}

Character.prototype.getMaxHealth = function(){
    return this.maxHealth;
}

Character.prototype.setMaxHealth = function(amount){
    this.maxHealth = amount;
}

Character.prototype.getHealth = function(){
    return this.health;
}

Character.prototype.setHealth = function(amount){
    this.health= amount;
}

Character.prototype.getStatus = function(){
    return this.status;
}

Character.prototype.setStatus = function(s){
    this.status = s;
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
       } 
   else
       this.position = newPos;
};



module.exports = Character;
