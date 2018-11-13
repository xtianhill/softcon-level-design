const Character = require('./character.js');

function NPC(loc, max, hea, stat, msg, hbox, url, size){
    Character.call(this, loc, max, hea, stat, hbox, url, size);
    this.message = msg;
}

NPC.prototype = Object.create(Character.prototype);

//empty constructor
NPC.prototype.NPC = function(){
    //create an NPC with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, and no message
    Character.call(this, vector(0,0), 10, 10, 1, /*generic hitbox*/);
    this.message = "";
}  


NPC.prototype.getMessage = function(){
    return this.message;
}

NPC.prototype.setMessage = function(msg){
    this.message = msg;
}  


NPC.prototype.displayMessage = function(){
    //print message to the screen, return 1 on success or 0 if message is empty
    if(this.message == null || this.message == ''){
        return 0;
    }
    window.alert(this.message);
    return 1;
}  


module.exports = NPC;