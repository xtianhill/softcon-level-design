/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale){
    Element.call(this, pos, url, scale);
    this.solid = solid;
}

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.getSolid = function(){
}

Environment.prototype.setSolid = function(){

}

module.exports = Environment;