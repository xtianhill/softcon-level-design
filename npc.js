
function NPC(loc, max, hea, stat, msg){
    Character.call(this, loc, max, hea, stat);
    this.message = msg;
}

//empty constructor
NPC.prototype.NPC = function(){
    //create an NPC with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, and no message
}  


NPC.prototype.getMessage = function(){
    //get string message
}

NPC.prototype.setMessage = function(msg){
    //set message to msg
}  


NPC.prototype.displayMessage = function(){
    //print message to the screen, return 1 on success or 0 if message is empty
}  