const Vector = require('./utility.js');

/*Element prototype */
/*note: pos, scl, hitbox are vectors with x and y values */

function Element(pos, url, sz, hbox){
	this.position = pos; 
	this.sprite = url; //url to image file
	this.size = sz; //scale to resize image dimensions
	this.hitbox = hbox;
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

Element.prototype.getSize = function(){
	return this.size;
}

Element.prototype.setSize = function(scale){
	this.size = scale;
}

Element.prototype.getHitbox = function(){
	return this.hitbox;
}

Element.prototype.setHitbox = function(hitbox){
	this.hitbox = hitbox;
}

module.exports = Element;