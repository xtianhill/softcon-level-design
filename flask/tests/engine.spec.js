/*
|------------------------------------------------------------------------------
| Tests for Engine
|------------------------------------------------------------------------------
|
| This file contains tests for the Engine.
|
|------------------------------------------------------------------------------
*/


const rewire = require('rewire'),
    engine = rewire('../static/engine.js');

describe('Engine Tests', function(){

    let elements, winConditions;

    beforeEach(function(){
        var data = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Environment","top":350,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Player","top":150,"left":100,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1},{"type":"button"},{"type":"Element","name":"Enemy","top":150,"left":550,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"NPC","top":300,"left":200,"url":"https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Item","top":150,"left":500,"url":"https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png","scale":1},{"type":"button"},{"type":"button"},{"type":"button"},{"type":"button"}],"background":"","backgroundImage":"https://d2ujflorbtfzji.cloudfront.net/package-screenshot/4b7e815a-669f-4023-ac73-6c7691fe9a9f_scaled.jpg","backgroundImageOpacity":1,"backgroundImageStretch":true}';
        var parsedJSON = JSONtoElements(data);
        elements = parsedJSON.elements;

    });

    // GAME STATE TESTS

    // on collision tests
    it('should make player call pickUpItem when colliding with item', function(){
        
    });

    it('should decrease enemies health when attacked', function(){

    });

    it('should call display message if collision with npc', function(){

    });

    // show inventory tests
    it('should generate list of items to be displayed in html', function(){

    });

    // test draw function
    it('should call drawImage for each element in the list with its position as parameters', function(){

    });

    // test image init
    it('should create img objects for each element and set source to sprite', function(){

    });

    // test key handlers
    it('should set correct direction for key presses', function(){
        var event = {keyCode: 68};
        var private_keyHandlerDown = engine.__get__('keyHandlerDown');
        var private_rightPressed = engine.__get__('rightPressed');
        var private_leftPressed = engine.__get__('leftPressed');
        var private_downPressed = engine.__get__('downPressed');
        var private_upPressed = engine.__get__('upPressed');
        engine.private_keyHandlerDown(event);
        expect(private_rightPressed).toEqual('true');
    });

    // test detectCollisions
    it('should return true if there is an x collision', function(){

    });

    it('should return true if there is an y collision', function(){

    });

    // test win conditions
    it('should set npc condition to true if all npcs have displayed message', function(){

    });

    it('should set enemy condition to true if all enemies are dead', function(){

    });

    it('should set item condition to true if all items picked up', function(){

    });

    it('should set distance condition to true if you reach end of level', function(){

    });

    it('should end game when all conditions met', function(){

    });





});