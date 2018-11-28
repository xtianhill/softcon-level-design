/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

Vector.prototype.times = function(vec) {
	return new Vector (this.x * vec.x, this.y * vec.y);
}

Vector.prototype.times = function(num) {
	return new Vector (this.x * num, this.y * num);
}

module.exports = Vector;
