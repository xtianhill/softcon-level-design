/*
|------------------------------------------------------------------------------
| Item Class
|------------------------------------------------------------------------------
|
| This file contains the Item prototype (the javascript equivalent of a
| class). It contains data about item status, position, and effect.
|
|------------------------------------------------------------------------------
*/

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');
const Vector = require('./utility.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Item(pos, url, sz, hbox, col, eff, bpos, hov){
    Element.call(this, pos, url, sz, hbox);
    this.collected = col;
    this.effect = eff;
    this.basePos = bpos;
    this.hovering = hov;
    this.wobble = Math.random() * Math.PI * 2;
    this.targets = "";
}

Item.prototype.Item = function(){
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
};

//Setter for effect
Item.prototype.setEffect= function(eft){
    this.effect = eft;
};

//Getter for effect
Item.prototype.getEffect=function(){
    return this.effect;
};

//Getter for whether the item has been collected
Item.prototype.getCollected= function(){
    return this.collected;
};

//Setter for whether the item has been collected
Item.prototype.setCollected= function(b){
    this.collected = b;
};

//Make item hover
Item.prototype.hover = function(step) {
    wobbleSpeed = 2;
    wobbleDist = 1.5;
    this.wobble += step * wobbleSpeed;
    var wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.position = this.basePos.plus(new Vector(0, wobblePos));
};

//Update the item's position
Item.prototype.updatePosition = function(pc) {
    if(pc.dir == "right"){
        this.position.x = pc.position.x + pc.hitbox.x * .75;
        this.position.y = pc.position.y; //- pc.hitbox.y;
      }
      else{
        this.position.x = pc.position.x - pc.hitbox.x * .75;
        this.position.y = pc.position.y; //- pc.hitbox.y;
      }
}
module.exports = Item;
