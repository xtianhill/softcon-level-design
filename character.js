  
//data: point location, int health, bool status
//function void dechealth

/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

/*Character Prototype
Note: location is a vector with x and y*/

function Character(loc, max, hea, stat){
    this.location=loc ; //position
    this.maxHealth = max; //maximum health
	this.health=hea; //int health
	this.status=stat; //true for alive, false for dead
}

//empty constructor
Character.prototype.Character = function(){
    //create character with loc = (0,0), maxhealth = 10
    // health = 10, status = 1
}

/* Example for how to create a function for a prototype. this is the javascript version
 of creating a method within a class*/
//decrement health function
Character.prototype.decHealth = function(enemy){
 	//decrement health by enemy damage amount
}

//getters and setters
Character.prototype.getLocation = function(){
    //get location
}

Character.prototype.setLocation = function(x, y){
    //set location to (x,y)
}

Character.prototype.getMaxHealth = function(){
    //get maximum health
}

Character.prototype.setMaxHealth = function(amount){
    //set maximum health to amount
}

Character.prototype.getHealth = function(){
    //get current health
}

Character.prototype.setHealth = function(amount){
    //set current health to amount
}

Character.prototype.getStatus = function(){
    //get status
}

Character.prototype.setStatus = function(s){
    //set status to s
}



module.exports = Character;