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

function Character(loc, max, hea, stat, hbox, url, size){
    Element.call(this, loc, url, size, hbox);
    this.maxHealth = max; //maximum health
	this.health=hea; //int health
	this.status=stat; //true for alive, false for dead
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



module.exports = Character;
