function Effect(title){
    if (title == 'heal' || title == 'damage'){
    this.effect = title;
    this.isActive = false;
  }
  else{
    return {};
  }
}

Effect.prototype.Effect = function(bool, title){
    /*if(typeof bool != "boolean"){
      return {};
    }*/
    if (title == 'heal' || title == 'damage'){
    this.isActive = bool;
    this.effect = title;
  }
  else{
    return {};
  }
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
