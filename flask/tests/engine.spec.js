/*
|------------------------------------------------------------------------------
| Tests for Engine
|------------------------------------------------------------------------------
|
| This file contains tests for the Engine. Since the engine file is a script
| that interats directly with the browser, this file tests the exposed functions
| on engine-test-class.

|------------------------------------------------------------------------------
*/

const keyUpHandler = require('../static/engine-test-class.js').keyUpHandler;
const keyDownHandler = require('../static/engine-test-class.js').keyDownHandler;
const onCollision = require('../static/engine-test-class.js').onCollision;
const detectCollision = require('../static/engine-test-class.js').detectCollision;
const testWinConditions = require('../static/engine-test-class.js').testWinConditions;
const testNPCCondition = require('../static/engine-test-class.js').testNPCCondition;
const testEndCondition = require('../static/engine-test-class.js').testEndCondition;
const testEnemyCondition = require('../static/engine-test-class.js').testEnemyCondition;

const handleItemUse = require('../static/engine-test-class.js').handleItemUse;
const Player = require('../static/player.js');
const Item = require('../static/item.js');
const Enemy = require('../static/enemy.js');
const NPC = require('../static/npc.js');
const Vector = require('../static/utility.js');
const Effect = require('../static/effect.js');
const Element = require('../static/element.js');

describe('Engine Tests', function(){

    let gameState, testItem;

    beforeEach(function(){
        var vec = new Vector(5,5);
        testItem = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2), new Vector(2,2), true, new Effect('heal', 10), new Vector(0,0), false);
        testItem2 = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2), new Vector(2,2), true, new Effect('damage', 10), new Vector(0,0), false);
        var elements = [new Player(vec, 20, 20, true, testItem2, [testItem, testItem2], vec, 'p_url', vec, vec, 0, 0, vec),
            new Enemy(new Vector(20,20), 20, 20, true, 10, vec, 'e_url', vec, vec, 0, 0, 'right', 5, vec),
            new NPC(vec, 20, 20, true, 'message!', vec, 'n_url', vec, vec, 0, 0),
            testItem];
 
        gameState = { canvas: 'canvas'
            , width: 500
            , height: 500
            , ctx: {fillText: function(){}}
            , rightPressed: false
            , leftPressed: false
            , downPressed: false
            , upPressed: false
            , itemUsed: false
            , changeItem: false
            , elements: elements
            , wrap: 'wrap'
            , pc: elements[0]
            , characters: [elements[1], elements[2]]
            , step: .05
            , sinceItem: 5
            , backgroundUrl: 'backgroundUrl'
            , npcCondition: false
            , emenyCondition: false
            , endCondition: false
            , victory: false
        };
        
        gameState.elements[2].spokenTo = false;
    });

    /*
    |--------------------------------------------------------------------------
    | Key Handler Tests
    |--------------------------------------------------------------------------
    */

    it('should set correct direction for key presses', function(){
        // key presses
        var event = {keyCode: 68};
        keyDownHandler(event, gameState);
        expect(gameState.rightPressed).toBeTruthy();
        event.keyCode = 83;
        keyDownHandler(event, gameState);
        expect(gameState.downPressed).toBeTruthy();
        event.keyCode = 87;
        keyDownHandler(event, gameState);
        expect(gameState.upPressed).toBeTruthy();
        event.keyCode = 65;
        keyDownHandler(event, gameState);
        expect(gameState.leftPressed).toBeTruthy();

        // key unpresses
        event.keyCode = 68;
        keyUpHandler(event, gameState);
        expect(gameState.rightPressed).toBeFalsy();
        event.keyCode = 83;
        keyUpHandler(event, gameState);
        expect(gameState.downPressed).toBeFalsy();
        event.keyCode = 87;
        keyUpHandler(event, gameState);
        expect(gameState.upPressed).toBeFalsy();
        event.keyCode = 65;
        keyUpHandler(event, gameState);
        expect(gameState.leftPressed).toBeFalsy();
    });

    /*
    |--------------------------------------------------------------------------
    | Collision Detection Tests
    |--------------------------------------------------------------------------
    */

    it('should return true if there is a collision', function(){
        expect(detectCollision(gameState.elements[0].position,
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();

        gameState.elements[2].position = new Vector(2,2);
        expect(detectCollision(gameState.elements[0].position,
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();

        gameState.elements[2].position = new Vector(1,2);
        expect(detectCollision(gameState.elements[0].position,
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();

        gameState.elements[2].position = new Vector(2,1);
        expect(detectCollision(gameState.elements[0].position,
            gameState.elements[2].position,gameState.elements[0],gameState.elements[2])).toBeTruthy();
    });

    it('should return false if there isnt a collision', function(){
        expect(detectCollision(gameState.elements[0].position,
            gameState.elements[1].position,gameState.elements[0],gameState.elements[1])).toBeFalsy();
        gameState.elements[1].position = new Vector(6,0);
        expect(detectCollision(gameState.elements[0].position,
            gameState.elements[1].position,gameState.elements[0],gameState.elements[1])).toBeFalsy();
        gameState.elements[1].position = new Vector(0,6);
        expect(detectCollision(gameState.elements[0].position,
            gameState.elements[1].position,gameState.elements[0],gameState.elements[1])).toBeFalsy();

    });

    /*
    |--------------------------------------------------------------------------
    | Element Interaction (onCollision) Tests (iteration 2)
    |--------------------------------------------------------------------------
    */

    it('should make player call pickUpItem when colliding with item', function(){
        gameState.elements[0].pickUpItem = jasmine.createSpy('pickUpItem');
        onCollision(gameState, 3);
        expect(gameState.elements[0].pickUpItem).toHaveBeenCalled();

    });

    it('should decrease enemies health when attacked', function(){
        var before = gameState.elements[1].health;
        console.log(gameState.pc);
        var damage = gameState.pc.equippedItem.effect.amount;
        gameState.elements[0].position = new Vector(6,6);
        handleItemUse(gameState);
        gameState
        expect(gameState.elements[1].health).toEqual(before-damage);
    });

    it('should call display message if collision with npc', function(){
        onCollision(gameState, 2);
        expect(gameState.elements[2].spokenTo).toBeTruthy();
    });

    /*
    |--------------------------------------------------------------------------
    | Win Condition Tests (iteration 2)
    |--------------------------------------------------------------------------
    */

    it('should set npc condition to true if all npcs have displayed message', function(){
        gameState.characters[1].spokenTo= true;
        expect(testNPCCondition(gameState.characters)).toBeTruthy();
    });

    it('should set enemy condition to true if all enemies are dead', function(){
        gameState.elements[1].setStatus(false);
        expect(testEnemyCondition(gameState)).toBeTruthy();
    });

    it('should set distance condition to true if you reach end of level', function(){
        gameState.pc.position = new Vector(499,30);
        expect(testEndCondition(gameState)).toBeTruthy();
    });

    it('should end game when all conditions met', function(){
        gameState.npcCondition=true;
        gameState.endCondition=true;
        gameState.enemyCondition=true;
        testWinConditions(gameState);
        expect(gameState.victory).toBeTruthy();
    });


});
