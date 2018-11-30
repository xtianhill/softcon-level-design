/*
|------------------------------------------------------------------------------
| Vector Class
|------------------------------------------------------------------------------
|
| This file contains the Vector prototype (the javascript equivalent of a
| class). 
|
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Vector(x,y){
	if (typeof(x) != 'number' || typeof(y) != 'number'){
		return null
	}
	this.x=x;
	this.y=y;
}

//Add to the vector
Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

//Multiply the vector times a vector
Vector.prototype.times = function(vec) {
	return new Vector (this.x * vec.x, this.y * vec.y);
}

//Multiply the vector times a number
Vector.prototype.times = function(num) {
	return new Vector (this.x * num, this.y * num);
}

module.exports = Vector;
