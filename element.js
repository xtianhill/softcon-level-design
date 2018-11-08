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

//empty constructor. void
Element.prototype.Element = function(){
    //create element with pos = , url = https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/45553256_1847037375409918_2529009054647320576_n.png?_nc_cat=107&_nc_ht=scontent-ort2-2.xx&oh=c959df2ca02e1b820aae869c12b4b978&oe=5C743003
    // scale = , speed = 
}

//gets position. return position coordinates
Element.prototype.getposition = function(){
    //get position coordinates
}

//gets sprite. return sprite url
Element.prototype.getsprite = function(){
    //get sprite url
}

//gets scale. return scale dimensions
Element.prototype.getscale = function(){
    //get scale dimensions
}

//gets speed. return speed of x and y
Element.prototype.getspeed = function(){
    //get speed of x and y
}



/* Example for how to create a function for a prototype. this is the javascript version
 of creating a method within a class*/

Element.prototype.foo = function(/*args can go here*/){
 	//foo function body here
}

