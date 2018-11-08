/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

/*Element prototype */
/*note: pos, scl are vectors with x and y values */

function Element(pos, url, scl){
	this.position=pos; 
	this.sprite=url; //url to image file
	this.scale=scl; //scale to resize image dimensions
}

Element.prototype.getPosition = function(){
	return this.position;
}

Element.prototype.setPosition = function(pos){
	this.position = pos;
}

Element.prototype.getSprite = function(){
	return this.sprite;
}

Element.prototype.setSprite = function(url){
	this.sprite = url;
}

Element.prototype.getScale = function(){
	return this.scale;
}

Element.prototype.setScale = function(scale){
	this.scale = scale;
}

module.exports = Element;