/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox){
  if (typeof solid == "boolean") {
      Element.call(this, pos, url, scale, hbox);
      this.solid = solid;
  }
  else
      return {};
}

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= true;
}

Environment.prototype.getSolid = function(){
    return this.solid;
}

Environment.prototype.setSolid = function(bool){
  if (typeof solid == "boolean"){
      this.solid = bool;
  }
}

module.exports = Environment;
