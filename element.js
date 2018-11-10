const Vector = require('./utility.js').vector;

/*Element prototype */
/*note: pos, scl, hitbox are vectors with x and y values */

function Element(gpos, url, scl, hbox, ppos){
	this.gridPosition = gpos; 
	this.sprite = url; //url to image file
	this.scale = scl; //scale to resize image dimensions
	this.hitbox = hbox;
	this.pointPosition = ppos;
}

Element.prototype.getGridPosition = function(){
	return this.gridPosition;
}

Element.prototype.setGridPosition = function(pos){
	this.gridPosition = pos;
}

Element.prototype.getPointPosition = function(){
	return this.pointPosition;
}

Element.prototype.setPointPosition = function(pos){
	this.pointPositionosition = pos;
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

Element.prototype.getHitbox = function(){
	return this.hitbox;
}

Element.prototype.setHitbox = function(hitbox){
	this.hitbox = hitbox;
}

module.exports = Element;