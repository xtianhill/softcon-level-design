function Effect(){
    this.isActive = false;
}

Effect.prototype.Effect = function(bool){
    console.log('called');
    this.isActive = bool;
}

Effect.prototype.activate = function(){
    this.isActive = true;
}

Effect.prototype.deactivate = function(){
    this.isActive = false;
}

Effect.prototype.getIsActive = function(){
    return this.isActive;
}

module.exports = Effect;
