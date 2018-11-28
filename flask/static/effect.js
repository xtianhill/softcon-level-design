/*
|------------------------------------------------------------------------------
| Effect Class
|------------------------------------------------------------------------------
|
| This file contains the Effect prototype (the javascript equivalent of a
| class). Effect is used by Environment and Item. It contains data
| about how an Effect affects the game (e.g. restores health), as well as
| methods for activating or changing an Effect.
|
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Constructors
|------------------------------------------------------------------------------
*/

function Effect(title, amount){
    if (title == 'heal' || title == 'damage'){
    this.effect = title;
    this.isActive = false;
    this.amount = amount;
  }
  else{
    return {};
  }
}

// Effect.prototype.Effect = function(bool, title){
//     if (title == 'heal' || title == 'damage'){
//     this.isActive = bool;
//     this.effect = title;
//   }
//   else{
//     return {};
//   }
// }

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/

// Getter for isActive
Effect.prototype.getIsActive = function(){
    return this.isActive;
}

// Setter for Effect type
Effect.prototype.setEffect = function(effect){
    this.effect = effect;
}

// Getter for  Effect type
Effect.prototype.getEffect = function(){
    return this.effect;
}

// Setter for isActive
Effect.prototype.activate = function(){
    this.isActive = true;
}

// Setter for isActive
Effect.prototype.deactivate = function(){
    this.isActive = false;
}

module.exports = Effect;
