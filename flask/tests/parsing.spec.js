
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
		JSON2 = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Environment","top":250,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1,"solid":"1","effect":"heal"},{"type":"Element","name":"Player","top":200,"left":450,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1,"speed":"high","gravity":"medium","maxhealth":"100"}],"background":""}';
	});

	/*
	|--------------------------------------------------------------------------
	| JSONtoElements Tests
	|--------------------------------------------------------------------------
	*/

	it('should return an empty array and empty backgroundurl given an empty JSON', function(){
			var returned = JSONtoElements(JSON1);
			expect((returned).elements).toEqual([]);
			expect((returned).backgroundUrl).toEqual('');
	});

	it('should return an array with 2 environment elements in it and given background image ', function(){
		 var returned = JSONtoElements(JSON2);
		expect((returned).backgroundUrl).toEqual('https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png');
	});
});
