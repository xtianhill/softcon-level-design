function Effect(title){
    this.effect = title;
    this.isActive = false;
}

Effect.prototype.Effect = function(bool, title){
    if(typeof bool != "boolean"){
      return null;
    }
    if (title != "damage" || "heal"){
      return null;
    }
    this.isActive = bool;
    this.effect = title;
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

Effect.prototype.setEffect = function(effect){
    this.effect = effect;
}

Effect.prototype.getEffect = function(){
    return this.effect;
}

module.exports = Effect;
