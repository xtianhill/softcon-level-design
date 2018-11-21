
/*
|------------------------------------------------------------------------------
| Tests for Parser
|------------------------------------------------------------------------------
|
| This file contains tests for the Parser.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const JSONtoElements = require('../static/parsing.js')
const NPC = require('../static/npc.js');
const Enemy = require('../static/enemy.js');
const Player = require('../static/player.js');
const Item = require('../static/item.js');
const Element = require('../static/element.js');
const Character = require('../static/character.js');
const Environment = require('../static/environment.js');
const Vector = require('../static/utility.js');


describe('Parsing', function() {
	var json1 = { "Player" : "player1", "Player" : "player2" };
	var JSON2 = 2;
	var JSON3 = 3;

//testing JSONtoElements
it('should test this function', function() {
	//console.log(Parsing);
	(JSONtoElements(json1));
})

});