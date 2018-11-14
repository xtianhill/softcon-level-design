const Character = require('./character.js');
const Vector = require('./utility.js').vector;

function NPC(loc, max, hea, stat, msg, hbox, url, size){
    Character.call(this, loc, max, hea, stat, hbox, url, size);
    this.message = msg;
}

NPC.prototype = Object.create(Character.prototype);

//empty constructor
NPC.prototype.NPC = function(){
    //create an NPC with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, and no message
    Character.call(this, new Vector(0,0), 10, 10, 1, new Vector(50,50), null, new Vector(50,50));
    this.message = "";
}  


NPC.prototype.getMessage = function(){
    if(this.message != null)
        return this.message;
    else 
    {
        return 0;
    }
}

NPC.prototype.setMessage = function(msg){
    this.message = msg;
}  



module.exports = NPC;
