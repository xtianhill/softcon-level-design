/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

/*Element prototype */
/*note: pos, scl, and spd are vectors with x and y values */

function Element(pos, url, scl, spd){
	this.position=pos ; 
	this.sprite=url; //url to image file
	this.scale=scl; //scale to resize image dimensions
	this.speed=spd; // x: speed of x coordinate, y: speed of y coordinate 

}



/*example for how to create a function for a prototype. this is the javascript version
 of creating a method within a class*/

Element.prototype.foo = function(/*args can go here*/){
 	//foo function body here
}

