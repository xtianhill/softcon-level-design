/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox, eff){
  if (solid == 1 || solid == 0) {
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
    this.solid= true;
    this.effect = new Effect("heal", 2);;
};

Environment.prototype.getSolid = function(){
    return this.solid;
};

Environment.prototype.setSolid = function(bool){
  if (solid == 1 || solid == 0){
      this.solid = bool;
  }
};

Environment.prototype.setEffect= function(eft){
    this.effect = eft;
};

Environment.prototype.getEffect=function(){
    return this.effect;
};

module.exports = Environment;
