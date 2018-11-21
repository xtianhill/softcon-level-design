
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
	let JSON1;
	let JSON2;

	/*
	|--------------------------------------------------------------------------
	| beforeEach: makes an instance of the class to use for tests. Makes a new
	| version of this test instance before every test, clearing out any
	| modifications to the default data.
	|--------------------------------------------------------------------------
	*/

	beforeEach(function(){
		JSON1 = '{}';
		JSON2 = '{"objects":[{},{"type":"Element","name":"Environment","top":25,"left":0,"url":"https://www.mariowiki.com/images/thumb/5/5d/GoldbrickblockNSMB2.png/400px-GoldbrickblockNSMB2.png","scale":1}], "backgroundImage:""fakeurl"}';
	});

	/*
	|--------------------------------------------------------------------------
	| JSONtoElements Tests
	|--------------------------------------------------------------------------
	*/

	it('should return an empty array and empty backgroundurl given an empty JSON', function(){
			var returned= JSONtoElements(JSON1);
			expect((returned).elements).toEqual([]);
			expect((returned).backgroundUrl).toEqual('');
	});

	it('should return an array with one environment element in it and background image fakeurl', function(){
		var returned = JSONtoElements(JSON2);
		expect((returned).backgroundUrl).toEqual('fakeurl');
	});
});
