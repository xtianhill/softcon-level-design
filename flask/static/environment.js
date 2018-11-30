/*
|------------------------------------------------------------------------------
| Environment Class
|------------------------------------------------------------------------------
|
| This file contains the Environment prototype (the javascript equivalent of a
| class). 
|
|------------------------------------------------------------------------------
*/


/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');
const Effect = require('./effect.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Environment(solid, pos, url, scale, hbox, eff){
  if (solid == 0 || solid == 1) {
      Element.call(this, pos, url, scale, hbox);
      this.solid = solid;
      this.effect = eff;
  }
  else{
      return {};
    }
};

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= 1;
    this.effect = new Effect("heal", 2);;
};

//Getter for solid
Environment.prototype.getSolid = function(){
    return this.solid;
};

//Setter for solid
Environment.prototype.setSolid = function(bool){
  if (bool == 1 || bool == 0){
      this.solid = bool;
  }
};

//Setter for effect
Environment.prototype.setEffect= function(eft){
    if(eft instanceof Effect)
        {this.effect = eft;}
};

//Getter for effect
Environment.prototype.getEffect=function(){
    return this.effect;
};

module.exports = Environment;
