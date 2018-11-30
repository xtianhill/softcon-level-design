(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.engine = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Character Class
|------------------------------------------------------------------------------
|
| This file contains the Character prototype (the javascript equivalent of a
| class). Character is the super of Player, NPC, and Enemy. It contains data
| about character status (e.g. health, speed), as well as methods for moving
| and interacting with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Element = require('./element.js');
const Vector = require('./utility.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/

function Character(loc, max, hea, stat, hbox, url, size, spd, mvspd, grav){
    // console.log("speed", (spd instanceof Vector));
    // console.log("mvspeed", (typeof mvspd === "number"));
    // console.log("stat", (typeof stat === "boolean"));
    // console.log("grav", (typeof grav === "number"));
    // console.log("health", (typeof hea ==="number"));
    // console.log("max",  (typeof max === "number"));
    if((spd instanceof Vector) && (typeof mvspd === "number") &&
       (typeof grav === "number")&&  (typeof stat === "boolean") &&
       (typeof max === "number") && (typeof hea ==="number")){
        Element.call(this, loc, url, size, hbox);
        this.maxHealth = max; //maximum health
	      this.health=hea; //int health
	      this.status =stat; //true for alive, false for dead
        this.speed = spd; //for moving
        this.moveSpeed = mvspd; //tells how fast it moves
        this.gravity = grav;
    }
     else return {};
}

Character.prototype = Object.create(Element.prototype);

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/

// Getter for position
Character.prototype.getPosition = function(){
	return this.position;
}

// Setter for position
Character.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

// Getter for maxHealth
Character.prototype.getMaxHealth = function(){
    return this.maxHealth;
}

// Setter for maxHealth
Character.prototype.setMaxHealth = function(amount){
    if(typeof amount === "number"){
        this.maxHealth = amount;
    }
}

// Getter for health
Character.prototype.getHealth = function(){
    return this.health;
}

// Setter for health
Character.prototype.setHealth = function(amount){
    if(typeof amount === "number"){
        this.health= amount;
    }
}

// Getter for status
Character.prototype.getStatus = function(){
    return this.status;
}

// Setter for status
Character.prototype.setStatus = function(s){
    if(typeof s === 'boolean'){
        this.status = s;
    }
}

// Getter for speed
Character.prototype.getSpeed = function(){
    return this.speed;
}

// Setter for speed
Character.prototype.setSpeed = function(spd){
    if(spd instanceof Vector){
        this.speed =spd;
    }
}

// Getter for movementSpeed
Character.prototype.getMovementSpeed = function() {
    return this.moveSpeed;
}

// Setter for movementSpeed
Character.prototype.setMovementSpeed = function(ms){
    if(typeof ms === "number"){
        this.moveSpeed = ms;
    }
}

// Getter for gravity
Character.prototype.getGravity = function () {
    return this.gravity;
}

// Setter for gravity
Character.prototype.setGravity = function(g) {
    if(typeof g === "number"){
        this.gravity = g;
    }
}

/*
|------------------------------------------------------------------------------
| Movement-related functions for the Character prototype, wherein much of
| the physics calculations are performed.
|------------------------------------------------------------------------------
*/

// Calculates the hypothetical next x position of a Character given a direction
// in which the character is trying to move.
Character.prototype.newXPos = function(step, dir) {
  this.speed.x = 0
  if (dir == "right") this.speed.x = this.moveSpeed;
  if (dir == "left")  this.speed.x -= this.moveSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next x position of a Character is legal, and if so,
// updates its position.
Character.prototype.moveX = function(newPos, obstacle) {
    if (this.status) {
        if (obstacle != null) {
            if (obstacle.getSolid() == 0) {
                this.position = newPos;
            }
        }
        else {
            this.position = newPos;
        }
    }
}

// Calculates the hypothetical next y position of a character based on gravity
Character.prototype.newYPos = function(step) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * 2 * step);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next y position of a Character is legal, and if so,
// updates its position; if it hits the ground stops its motion; if it is on
// ground and jumps, updates its speed to allow the jump on the next game loop.
Character.prototype.moveY = function(newPos, obstacle, up) {
    var jumpSpeed = 70;
    if (this.status) {
        if (obstacle != null) {
            if (obstacle.solid) {
                newPos.x = this.position.x
                if (up && this.speed.y > 0) {
                    this.speed.y = -jumpSpeed;
                } else
                    this.speed.y = 0;
            }
        } else
            this.position = newPos;
    }
};

Character.prototype.decHealth = function(damage){
    this.health -= damage;
    if(this.health <= 0){
        this.status = false;
    }
}

Character.prototype.addHealth = function(amount){
    this.health += amount;
    if(this.health > this.maxHealth){
        this.health = this.maxHealth;
    }
}

module.exports = Character;

},{"./element.js":4,"./utility.js":12}],2:[function(require,module,exports){
/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

/*
|------------------------------------------------------------------------------
| Database
|------------------------------------------------------------------------------
|
| This file contains the Database utility functions.
|
|------------------------------------------------------------------------------
*/


const HTTP_OK = "200";
const HTTP_CREATED = "201";
const HTTP_BADREQUEST = "400";
const HTTP_NOTFOUND = "404";
const HTTP_CONFLICT = "409";

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";
// const AWS_URL = "http://127.0.0.1:5000/";
const SUCCESS_MSG = "BACKEND RUNNING";

//store a grid, which is a JSON, in the database
function storeGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
        throw new Error("invalid JSON given");
    }
    var success;
    try {
        success = $.ajax({
            type: "POST",
            url: AWS_URL + "api/v1/add-grid/",
            data: JSON.stringify(gridJSON),
            contentType: "application/json",
            dataType: "text",
            success: function(data) {
                console.log("Success: stored [" + data + "] in database.");
                alert("Success: grid successfully stored.");
            },
            failure: function(errMsg) {
                console.log("failure: couldn't store grid");
                alert("Error: operation could not be performed.");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                if (status == HTTP_CONFLICT) {
                    console.log("Error: HTTP CONFLICT (" + HTTP_CONFLICT + ")");
                    alert("That title is taken; please choose another name.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

// checks if the database is running
async function isRunning() {
    var success;
    try {
        success = await $.ajax({
            type: "GET",
            dataType: "text",
            url: AWS_URL + "api/v1/backend-up/", 
            success: function(data) {
                alert("Backend is running");
                console.log("success: backend is running");
            },
            failure: function(errMsg) {
                console.log("failure: backend cannot be reached");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("error: " + textStatus);
            }
        });
    } catch(err) {
        console.log(err);
        return false;
    }
    return success==SUCCESS_MSG;
}

async function deleteGrid(title) {
    if(title.length <= 0 || title == null) {
        throw new Error("invalid title given");
    }
    var success;
    try {
        success = await $.ajax({
            type: "GET",
            async: true,
            url: AWS_URL + "api/v1/delete-grid/" + title,
            success: function(data) {
                alert("Success: grid successfully deleted.");
                console.log("success: deleted grid in DB via success callback");
            },
            failure: function(errMsg) {
                alert("Sorry, something went wrong. The grid was not deleted.");
                console.log("failure: didn't delete item");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                if (status == HTTP_NOTFOUND) {
                    alert("Error: the grid was not found.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

//update a grid that is already in the database
async function updateGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
        throw new Error("invalid JSON given");
    }
    try {
        var success = await $.ajax({
            type: "POST",
            url: AWS_URL + "api/v1/update-grid/",
            data: JSON.stringify(gridJSON),
            contentType: "application/json",
            dataType: "text",
            success: function(data) {
                console.log("success: updated the following grid in DB: " + data);
                console.log(data);
            },
            failure: function(errMsg) {
                console.log("failure: couldn't store grid");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if (status == HTTP_NOTFOUND) {
                    console.log("Error: HTTP NOTFOUND (" + HTTP_NOTFOUND + ")");
                    alert("Error: the grid was not found.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

//retrieve a grid from the database using its title
async function getByTitle(title) {
    if(title.length == 0) {
        throw new Error("invalid title given");
    }
    var grid;
    try {
        grid = await $.ajax({
            type: "GET",
            url: AWS_URL + "api/v1/search-grid/" + title,
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                console.log("success: found item with title " + title + " in DB");
            },
            failure: function(errMsg) {
                console.log("failure: didn't find item in DB");
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if (status == HTTP_NOTFOUND) {
                    console.log("Error: HTTP NOTFOUND (" + HTTP_NOTFOUND + ")");
                    alert("Error: the grid was not found.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
    } catch(error) {
        console.log(error);
    }
    if(grid == null) {
        throw new Error("didn't retrieve grid with title [" + title + "]");
    }
    return grid;
}

//return all the titles of the levels stored in the database
async function getAllTitles() {
    var titles;
    try {
        titles = await $.ajax({
            type: "GET",
            url: AWS_URL + "api/v1/query-all-titles/",
            contentType: "application/json",
            // dataType: "json",
            success: function(data) {
                console.log("success! found the following titles:");
                console.log(data);
                // titles = data;
            },
            failure: function(errMsg) {
                console.log("failure: couldn't retrieve titles")
                // titles = null;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The titles could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
    } catch(err) {
        console.log(err);
    }
    if(titles == null) {
        throw new Error("didn't retrieve titles");
    }
    return titles;
}


//function to check if a JSON is valid to store in the database
function validJSON(myJSON) {
    myJSON = JSON.parse(myJSON);
    if(myJSON.type == 'string') {
        myJSON = JSON.parse(myJSON);
    }
    try {
        var myTitle = myJSON["title"]
        var myData = myJSON["data"]
        if(myTitle.length == 0 || myData.length == 0) {
            return false;
        }
        if(typeof myData != 'string') {
            return false;
        }
    }
    catch(err) {
        console.log(err)
        return false;
    }
    return true;
}

module.exports.storeGrid = storeGrid;
module.exports.getByTitle = getByTitle;
module.exports.getAllTitles = getAllTitles;
module.exports.validJSON = validJSON;
module.exports.updateGrid = updateGrid;
module.exports.isRunning = isRunning;
module.exports.deleteGrid = deleteGrid;
},{}],3:[function(require,module,exports){
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
    t = typeof title;
    t2 = typeof amount;
    //if (t === "string" && t2 === "number" && (title == 'heal' || title == 'damage')){
    this.effect = title;
    this.isActive = false;
    this.amount = amount;
//   }
//   else{
//     return {};
//   }
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
Effect.prototype.setEffect = function(eft){
    t = typeof eft;
    if (t == "object") {
        this.effect = eft.effect;
        this.isActive = eft.isActive;
        this.amount = eft.amount;
    }
    else {
        return null;
    }
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

// Getter for amount
Effect.prototype.getAmount = function(){
    return this.amount;
}

// Setter for amount
Effect.prototype.setAmount = function(num){
    t = typeof num;
    if (t === "number"){
        this.amount = num;
    }
    else{
        return null;
    }
}

module.exports = Effect;

},{}],4:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Element Class
|------------------------------------------------------------------------------
|
| This file contains the Element prototype (the javascript equivalent of a
| class). Element has getters and setters for its position, sprite, size, and hitbox.
|
|------------------------------------------------------------------------------
*/

const Vector = require('./utility.js');

/*note: pos, scl, hitbox are vectors with x and y values */

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Element(pos, url, sz, hbox){
	if(((pos instanceof Vector) && (typeof url === 'string')) && ((sz instanceof Vector) && (hbox instanceof Vector))){
		this.position = pos; 
		this.sprite = url; //url to image file
		this.size = sz; //scale to resize image dimensions
		this.hitbox = hbox;
	} else {
		return {};
	}
}

/*
|------------------------------------------------------------------------------
| Getter and setter functions (functions are the javascript version of
| class methods).
|------------------------------------------------------------------------------
*/
//Getter for position
Element.prototype.getPosition = function(){
	return this.position;
}

//Setter for position
Element.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

//Getter for sprite
Element.prototype.getSprite = function(){
	return this.sprite;
}

//Setter for sprite
Element.prototype.setSprite = function(url){
	if(typeof url === 'string'){
		this.sprite = url;
	}
}

//Getter for size
Element.prototype.getSize = function(){
	return this.size;
}

//Setter for size
Element.prototype.setSize = function(scl){
	if (scl instanceof Vector){
		this.size = scl;
	}
}

//Getter for Hitbox
Element.prototype.getHitbox = function(){
	return this.hitbox;
}

//Setter for Hitbox
Element.prototype.setHitbox = function(hbx){
	if(hbx instanceof Vector){
		this.hitbox = hbx;
	}
}

module.exports = Element;
},{"./utility.js":12}],5:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Enemy Class
|------------------------------------------------------------------------------
|
| This file contains the Enemy prototype (the javascript equivalent of a
| class). Enemy is a subclass of the superclass Character. This contains
| data about an Enemy's status, as well as methods for moving and interacting
| with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Character = require('./character.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav, dir, range, startLoc){
    t = typeof dmg;
    t2 = typeof range;
    //if (t === "number" && t2 === "number" && (dir === "right" || dir === "left" || dir === "still")) {
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
        console.log("please dear god");
        this.damage = dmg;
        this.direction = dir;
        this.range = range;
        this.startPos = startLoc;
   // }
    // else {
    //     return {}
    // }
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
    Character.call(this, vector(0,0), 10, 10, 1, new vector(50,50), null, new vector(50,50));
    this.damage = 1;
    this.direction = "left";
    this.shouldFall = 1;
}

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
    return this.damage;
}

//set int damage
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
        t = typeof amount;
        if (t === "number"){
            this.damage = amount;
        }
        else{
            return null;
        }
}

//Getter for range
Enemy.prototype.getRange = function(){
    return this.range;
}

//Setter for range
Enemy.prototype.setRange = function(rng){
    t = typeof rng;
    if (t === "number"){
        this.range = rng;
    }
    else{
        return null;
    }
}

//Getter for direction
Enemy.prototype.getDirection = function(){
    return this.direction;
}

//Changes direction
Enemy.prototype.changeDirection = function(){
    if(this.direction === "right"){
        this.direction = "left";
    } else if(this.direction === "left"){
        this.direction = "right";
    }
}

//Setter for direction
Enemy.prototype.setDirection = function(dir){
    //set damage to amount
        t = typeof dir;
        if (t === "string" && (dir == "right" || dir == "left" || dir == "still")){
            this.direction = dir;
        }
        else{
            return null;
        }
}

module.exports = Enemy;

},{"./character.js":1}],6:[function(require,module,exports){
/* basic engine prototype */
const JSONtoElements = require('./parsing.js');
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');
const database = require('./database.js');

var gameState;

// searches the database by the title given and returns the data to be parsed
async function getData(title){
    var data;
    try{
        data = await database.getByTitle(title);
        return data;
    } catch (error){
        data = "error";
        return data;
    }
}

var title = document.getElementById("levelTitle").innerHTML;
console.log(title);
getData(title).then((data) => {

/*
|------------------------------------------------------------------------------
| Initialize gameState, canvas, and other variables from JSON
|------------------------------------------------------------------------------
*/
    function initialize(){
        var step = 0.05; // controls frequency of physics calculations
        var sinceItem = 0;
        var canvas = document.getElementById("c");
        var ctx = canvas.getContext("2d");
        document.addEventListener('keydown', function(e) {keyDownHandler(e, gameState)}, false);
        document.addEventListener('keyup', function(e) {keyUpHandler(e, gameState)}, false);
        var rightPressed = false;
        var leftPressed = false;
        var downPressed = false;
        var upPressed = false;
        var itemUsed = false;
        var changeItem = false;

        /*
         * Christian's log
         */
        console.log("data: " + data);

        // comment this line if you want to load from database
        // data = '{"objects":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"type":"Element","name":"Player","top":350,"left":100,"url":"https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png","scale":1},{"type":"Element","name":"Item","top":100,"left":400,"url":"https://66.media.tumblr.com/f7acf066084d424d5da0c09795fe8483/tumblr_inline_piy8y9FbkJ1ruhpn7_540.png","scale":1},{"type":"Element","name":"Item","top":200,"left":500,"url":"https://66.media.tumblr.com/4a8e88c9194d00c4e2e14d62f2a9dc76/tumblr_pi5t840NIu1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Enemy","top":350,"left":300,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"NPC","top":250,"left":500,"url":"https://66.media.tumblr.com/18b1dcddb1e6de2d56f2bbc16e368af5/tumblr_pi5sz2UwpH1u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Enemy","top":350,"left":650,"url":"https://66.media.tumblr.com/884ee0b1b0e3e6433476646be9448c54/tumblr_pi5tjpe7T81u9vozfo1_250.png","scale":1},{"type":"Element","name":"Environment","top":400,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":350,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":300,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":400,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":750,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":0,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":50,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":100,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":150,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":200,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":250,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":300,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"Element","name":"Environment","top":450,"left":350,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":400,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":450,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":500,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":550,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":650,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":600,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"Element","name":"Environment","top":450,"left":700,"url":"https://66.media.tumblr.com/80be0a8193d1c538f062f9999f9bff51/tumblr_pi5rtm1dbr1u9vozfo1_400.jpg","scale":1},{"type":"button"},{"type":"button"}],"background":"","backgroundImage":"https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png","backgroundImageOpacity":1,"backgroundImageStretch":true}';

        // translate data from database into list of elements
        var parsedJSON = JSONtoElements(data);
        var elements = parsedJSON.elements;
        var characters = [];
        var backgroundUrl = parsedJSON.backgroundUrl;
        var winConditions =  ["enemy", "npc"];
        var width = canvas.width;
        var height = canvas.height;
        var wrap = document.getElementById("wrap");

        console.log("elements", elements);
        // set win conditions to false if they were chosen by designer
        var victory = false;
        var npcCondition = true;
        var endCondition = true;
        var enemyCondition = true;
        var ul = document.getElementById("rules");
        ul.innerHTML = "";
        console.log(ul);
        for(i=0; i<winConditions.length; i++){
            var listItem = document.createElement("li");
            if(winConditions[i] === "npc"){
                npcCondition = false;
                listItem.append(document.createTextNode("Talk to every NPC!"));
                ul.appendChild(listItem);
            }
            if(winConditions[i] === "enemy"){
                enemyCondition = false;
                listItem.append(document.createTextNode("Kill every enemy!"));
                ul.appendChild(listItem);
            }
            if(winConditions[i] === "end"){
                endCondition = false;
                listItem.append(document.createTextNode("Reach the end of the level!"));
                ul.appendChild(listItem);
            }
        }

        // identify the pc
        var pc;
        for(i=0; i<elements.length; i++){
            if(elements[i] instanceof Player){
                pc = elements[i];
                elements.splice(i,1);
            }
        }

        // identify the characters
        for(i=0; i<elements.length; i++){
            if(elements[i] instanceof Character){
                characters.push(elements[i]);
            }
        }

        // set the font style for in game messages
        ctx.font = '10px "Press Start 2P"';
        ctx.fillStyle = "#ffffff";

        // set the initial game state
        gameState = { canvas: canvas
            , width: width
            , height: height
            , ctx: ctx
            , rightPressed: rightPressed
            , leftPressed: leftPressed
            , downPressed: downPressed
            , upPressed: upPressed
            , itemUsed: itemUsed
            , changeItem: changeItem
            , elements: elements
            , wrap: wrap
            , pc: pc
            , characters: characters
            , step: step
            , sinceItem: sinceItem
            , backgroundUrl: backgroundUrl
            , npcCondition: npcCondition
            , emenyCondition: enemyCondition
            , endCondition: endCondition
            , victory: victory
        };

        showInventory(gameState);
    }

    /*
    |------------------------------------------------------------------------------
    | Update internal gamestate: physics and item interactions
    |------------------------------------------------------------------------------
    */

    function update(gameState) {

        // find hypothetical new right/left position as long as within the level's
        // limits and no wall is in the way
        newXPos = null;
        if(!gameState.victory){
            if (gameState.rightPressed) {
                gameState.pc.dir = "right";
                newXPos = gameState.pc.newXPos(gameState.step, "right");
                if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
                    || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
                    newXPos = null;
            }
            else if (gameState.leftPressed) {
                gameState.pc.dir = "left";
                newXPos = gameState.pc.newXPos(gameState.step, "left");
                if (newXPos.x + (0.5 * gameState.pc.size.x) - (0.5 * gameState.pc.hitbox.x) < 0
                    || newXPos.x + (0.5 * gameState.pc.size.x) + (0.5 * gameState.pc.hitbox.x) > gameState.width)
                    newXPos = null;
            }

            // find collisions based on hypothetical new x-position, move if legal
            xObstacle = null;
            if (newXPos != null) {
                for (i = 0; i < gameState.elements.length; i++) {
                    if (detectCollision(newXPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                        if (gameState.elements[i] instanceof Environment)
                            xObstacle = gameState.elements[i];
                        onCollision(gameState, i);
                    }
                }
                gameState.pc.moveX(newXPos, xObstacle);
            }

            // find hypothetical new up/down position as long as within the level's
            // limits and no platform is in the way
            newYPos = gameState.pc.newYPos(gameState.step);
            if (newYPos.y + (0.5 * gameState.pc.size.y) - (0.5 * gameState.pc.hitbox.y) < 0)
                newYPos = null;
            else if (newYPos.y + (0.5 * gameState.pc.size.y) + (0.5 * gameState.pc.hitbox.y) > gameState.height)
                gameState.pc.status = false;

            // find collisions based on hypothetical new y-position, jump or fall if legal
            yObstacle = null;
            if (newYPos != null) {
                for (i = 0; i < gameState.elements.length; i++) {
                    if (detectCollision(newYPos, gameState.elements[i].position, gameState.pc, gameState.elements[i])) {
                        if (gameState.elements[i] instanceof Environment)
                            yObstacle = gameState.elements[i];
                        onCollision(gameState, i);
                    }
                }
            if (gameState.upPressed) {
                if (gameState.pc.position.y - 1 > 0) {
                    gameState.pc.moveY(newYPos, yObstacle, true);
                }
            } else {
                gameState.pc.moveY(newYPos, yObstacle, false);
            }
        }
        }

        // physics for npcs and enemies: both can fall, enemies may walk back and forth
        for (i = 0; i < gameState.elements.length; i++) {
            if (gameState.elements[i] instanceof Item && gameState.elements[i].hovering == true) {
                gameState.elements[i].hover(gameState.step);
            }
            else if (gameState.elements[i] instanceof NPC || gameState.elements[i] instanceof Enemy) {
                newYPos = gameState.elements[i].newYPos(gameState.step);
                yObstacle = null;
                for (j = 0; j < gameState.elements.length; j++) {
                    if (i != j && detectCollision(newYPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j])) {
                        yObstacle = gameState.elements[j];
                    }
                }
                gameState.elements[i].moveY(newYPos, yObstacle, false);
                if(!gameState.elements[i].status){
                    gameState.elements.splice(i,1);
                    break;
                }
            }
            if (gameState.elements[i] instanceof Enemy) {
                newXPos = gameState.elements[i].newXPos(gameState.step, gameState.elements[i].direction);
                for (j = 0; j < gameState.elements.length; j++) {
                    xObstacle = null;
                    if (i != j && detectCollision(newXPos, gameState.elements[j].position, gameState.elements[i], gameState.elements[j]))
                        if (gameState.elements[j] instanceof Environment) {
                            xObstacle = gameState.elements[j];
                            gameState.elements[i].changeDirection();
                            break;
                        }
                    if (gameState.elements[i].startPos.x - newXPos.x > gameState.elements[i].range
                        || newXPos.x - gameState.elements[i].startPos.x > gameState.elements[i].range) {
                        gameState.elements[i].changeDirection();
                        break;
                    }
                    gameState.elements[i].moveX(newXPos, null);
                }
            }

        }

        // update position of items
        if(gameState.pc.equippedItem != null){
            gameState.pc.equippedItem.updatePosition(gameState.pc);
        }

        // if item used
        if(gameState.itemUsed && !gameState.victory){
            handleItemUse(gameState);
            gameState.sinceItem = 0;
            gameState.itemUsed = false;
        }

        // change item selected
        if(gameState.changeItem && gameState.pc.status && !gameState.victory){
                changeItem(gameState);
                gameState.changeItem = false;
        }

        // counter to make tile effects only happen every few seconds
        gameState.pc.sinceTile += 1;
        gameState.sinceItem += 1;

        // test if the level is won
        testWinConditions(gameState);
    }

    /*
    |------------------------------------------------------------------------------
    | Draw new frame
    |------------------------------------------------------------------------------
    */

    function draw(gameState) {
        // clear canvas
        gameState.ctx.clearRect(0, 0, gameState.width, gameState.height);

        // center camera on player and redraw background
        scrollPlayerIntoView();

        // draw non-player elements
        for (i = 0; i < gameState.elements.length; i++) {
            var curElement = gameState.elements[i];

            // if curElement is an NPC with a message
            if (curElement.shouldDisplay) {
                gameState.ctx.font = '10px "Press Start 2P"';
                gameState.ctx.fillStyle = "#ffffff";
                gameState.ctx.fillText(curElement.getMessage(),
                    curElement.position.x,
                    curElement.position.y - 10);
                curElement.shouldDisplay = false;
            }

            // draw the element
            if (curElement instanceof Enemy && curElement.getDirection() == "right") {
                gameState.ctx.save();
                gameState.ctx.scale(-1, 1);
                gameState.ctx.drawImage(curElement.img, -curElement.position.x, curElement.position.y,
                    -curElement.size.x, curElement.size.y);
                gameState.ctx.restore();
            }
            else {
                gameState.ctx.drawImage(curElement.img, curElement.position.x, curElement.position.y,
                    curElement.size.x, curElement.size.y);
            }

            // draw health bars for NPCs and Enemies
            if ((curElement instanceof Enemy || curElement instanceof NPC) && curElement.status) {
                gameState.ctx.fillStyle = "#206020";
                gameState.ctx.fillRect(curElement.position.x, curElement.position.y - 8,
                    curElement.size.x, 4);
                gameState.ctx.fillStyle = "#009900";
                var percentFull = curElement.health / curElement.maxHealth;
                gameState.ctx.fillRect(curElement.position.x, curElement.position.y - 8,
                    percentFull * curElement.size.x, 4);
            }
        }

        // draw pc + equipped item if the game isnt over

        if (gameState.pc.status && !gameState.victory) {


            if (gameState.pc.dir == "left") {
                gameState.ctx.save();
                gameState.ctx.scale(-1, 1);
                gameState.ctx.drawImage(gameState.pc.img, -gameState.pc.position.x, gameState.pc.position.y,
                    -gameState.pc.size.x, gameState.pc.size.y);
                gameState.ctx.restore();
            }
            else {
                gameState.ctx.drawImage(gameState.pc.img, gameState.pc.position.x, gameState.pc.position.y,
                    gameState.pc.size.x, gameState.pc.size.y);
            }

            if (gameState.pc.dir == "left") {
                gameState.ctx.save();
                gameState.ctx.scale(-1, 1);
                if (gameState.pc.equippedItem != null) {
                    var item = gameState.pc.equippedItem;
                    if (gameState.sinceItem < 10) {
                        gameState.ctx.drawImage(item.img, -item.position.x + 5, item.position.y,
                            -item.size.x, item.size.y);
                    }
                    else {
                        gameState.ctx.drawImage(item.img, -item.position.x, item.position.y,
                            -item.size.x, item.size.y);
                    }
                }
                gameState.ctx.restore();
            }
            else {
                if (gameState.pc.equippedItem != null) {
                    var item = gameState.pc.equippedItem;
                    if (gameState.sinceItem < 10) {
                        gameState.ctx.drawImage(item.img, item.position.x + 5, item.position.y,
                            item.size.x, item.size.y);
                    }
                    else {
                        gameState.ctx.drawImage(item.img, item.position.x, item.position.y,
                            item.size.x, item.size.y);
                    }
                }
            }
        }


    // on player death visuals
    if(!gameState.pc.status){
        onPlayerDeath(gameState);
    }

    // on player victory visuals
    if(gameState.victory){
        onVictory(gameState);
    }
}

    /*
    |------------------------------------------------------------------------------
    | Helper Functions
    |------------------------------------------------------------------------------
    */

    // detect collisions between two hypothetical positions of two elements
    function detectCollision(pos1, pos2, element1, element2) {
        box1 = element1.hitbox;
        size1 = element1.size;
        box2 = element2.hitbox;
        size2 = element2.size;
        if(pos1 == null || pos2 == null || box1 == null || box2 == null)
            return false;
        left1 = pos1.x + (0.5 * size1.x) - (0.5 * box1.x);
        right1 = pos1.x + (0.5 * size1.x) + (0.5 * box1.x);
        top1 = pos1.y + (0.5 * size1.y) - (0.5 * box1.y);
        bottom1 = pos1.y + (0.5 * size1.y) + (0.5 * box1.y);
        left2 = pos2.x + (0.5 * size2.x) - (0.5 * box2.x);
        right2 = pos2.x + (0.5 * size2.x) + (0.5 * box2.x);
        top2 = pos2.y + (0.5 * size2.y) - (0.5 * box2.y);
        bottom2 = pos2.y + (0.5 * size2.y) + (0.5 * box2.y);

        if (right1 > left2 && //right edge of self, left edge of other
            left1 < right2 && //left edge of self, right edge of other
            bottom1 > top2 && //bottom edge of self, top edge of other
            top1 < bottom2)   //top edge of self, bottom edge of other
            return true;
        return false;
    }

    // react to collisions with various types of elements
    function onCollision(gameState, i) {
            //if npc, show message
                if(gameState.elements[i] instanceof NPC){
                   //elements[i].displayMessage();
                   gameState.ctx.fillText(gameState.elements[i].getMessage(), 0, 0);
                   gameState.elements[i].shouldDisplay = true;
                   gameState.elements[i].spokenTo = true;
                }

                //if enemy, either damage w/item or lose health
                if(gameState.elements[i] instanceof Enemy){
                    gameState.pc.decHealth(gameState.elements[i].getDamage());
                }

                //if item, pick up and remove from elements, display in inventory
                 if(gameState.elements[i] instanceof Item){
                    gameState.pc.pickUpItem(gameState.elements[i]);
                    gameState.elements.splice(i,1);
                    showInventory(gameState);
                 }

                 //if enviroment with effect, affect pc
                 if(gameState.elements[i] instanceof Environment){
                    if(gameState.pc.sinceTile > 50 && gameState.elements[i].getEffect()){
                        if(gameState.elements[i].getEffect().getEffect() == "damage")
                            gameState.pc.decHealth(gameState.elements[i].getEffect().getAmount());
                        else if(gameState.elements[i].getEffect().getEffect() == "heal")
                            gameState.pc.addHealth(gameState.elements[i].getEffect().getAmount());
                        gameState.pc.sinceTile = 0;
                      }
                 }
        }

    // detect key presses
    function keyDownHandler(event, gameState) {
        if(event.keyCode == 81){
            if(gameState.pc.equippedItem != null) {
                gameState.itemUsed = true;
            }
        }

        if(event.keyCode == 69){ // nice
            gameState.changeItem = true;
        }

        if(event.keyCode == 68) {
            gameState.rightPressed = true;
        }
        if(event.keyCode == 65) {
            gameState.leftPressed = true;
        }
        if(event.keyCode == 83) {
            gameState.downPressed = true;
        }
        if(event.keyCode == 87) {
            gameState.upPressed = true;
        }
    }

    // detect keys not being pressed
    function keyUpHandler(event, gameState) {
        if(event.keyCode == 68) {
            gameState.rightPressed = false;
        }
        if(event.keyCode == 65) {
            gameState.leftPressed = false;
        }
        if(event.keyCode == 83) {
            gameState.downPressed = false;
        }
        else if(event.keyCode == 87) {
            gameState.upPressed = false;
        }
    }

    // create all the images given urls
    function imgInit(gameState){
        for(i = 0; i<gameState.elements.length; i++){
            gameState.elements[i].img = new Image;
            gameState.elements[i].img.src = gameState.elements[i].sprite;
        }
        var tmp = gameState.backgroundUrl;
        gameState.backgroundUrl = new Image;
        gameState.backgroundUrl.src = tmp;

        gameState.pc.img = new Image;
        gameState.pc.img.src = gameState.pc.sprite;
    }

// scroll camera view to keep player at the center; redraw background
function scrollPlayerIntoView() {
  var bgWidth = gameState.backgroundUrl.width; // width of background image
  var bgHeight = gameState.backgroundUrl.height; // height of background image
  var displayWidth = gameState.wrap.clientWidth; // width of viewport
  var displayHeight = gameState.wrap.clientHeight; // height of viewport
  var levelWidth = gameState.width; // width of level
  var margin = displayWidth / 2.5; // window in which player movement won't scroll display

  var left = gameState.wrap.scrollLeft; // current scroll location: left boundary
  var right = left + displayWidth; // current scroll location: right boundary
  var center = gameState.pc.position.plus(gameState.pc.size.times(0.5)); // center of player

  scrollVal1 = center.x - margin; // new left boundary: scroll back
  scrollVal2 = center.x + margin - displayWidth; // new left boundary: scroll forward
  scrollVal3 = levelWidth - displayWidth; // new left boundary: at end of level

  // player is too far to left of screen; but not at start of level: scroll back
  if (center.x < left + margin && scrollVal1 > 0)
    gameState.wrap.scrollLeft = scrollVal1;

  // player is too far to right of screen; but not at end of level: scroll forward
  else if (center.x > right - margin && scrollVal2 < levelWidth - displayWidth)
      gameState.wrap.scrollLeft = scrollVal2;

  // player is too far to right of screen; and at end of level: don't scroll past end of viewport
  else if (center.x > right - margin && scrollVal2 < levelWidth)
      gameState.wrap.scrollLeft = scrollVal3;

  // else player's location is within the allowed window: don't change scroll

  // code to scale background image when window is resized
  var hRatio = displayWidth  / bgWidth;
  var vRatio =  displayHeight / bgHeight;
  var ratio  = Math.max ( hRatio, vRatio );
  var centerShift_x = ( displayWidth - bgWidth*ratio ) / 2;
  var centerShift_y = ( displayHeight - bgHeight*ratio ) / 2;

  // clear background; redraw background at new scroll with scaling
  gameState.ctx.clearRect(0, 0, displayWidth, displayHeight);
  gameState.ctx.drawImage(gameState.backgroundUrl, 0, 0, bgWidth, bgHeight,
                          gameState.wrap.scrollLeft+centerShift_x,centerShift_y,
                          bgWidth*ratio, bgHeight*ratio);

  // draw player's health bar in top left corner
  gameState.ctx.fillStyle = "#206020";
  gameState.ctx.fillRect(gameState.wrap.scrollLeft+8, 8, 300, 10);
  gameState.ctx.fillStyle = "#009900";
  var percentFull = gameState.pc.health / gameState.pc.maxHealth;
  if(!gameState.pc.status) { percentFull=0; }
  gameState.ctx.fillRect(gameState.wrap.scrollLeft+8, 8, percentFull*300, 10);
  gameState.ctx.fillStyle = "#ffffff";
  gameState.ctx.font = '10px "Press Start 2P"';
  gameState.ctx.fillText(Math.round(100*percentFull) + "/100", gameState.wrap.scrollLeft+316, 18);

}

// display player's inventory in html; only called when new item picked up or item switched
function showInventory(gameState){
    var box = document.getElementById('inventory_box');
    var ul = document.getElementById('inventory');
    ul.innerHTML = "";
    var inventory = gameState.pc.inventory;
    if(inventory.length == 0)
        box.style.visibility = "hidden";
    else
        box.style.visibility = "visible";
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var listItem = document.createElement("li");

        var _img = document.createElement('img');
        _img.src = item.sprite;
        _img.style = "width:60px;height:60px;";
        listItem.appendChild(_img);

        ul.appendChild(listItem);
    }
}

  // display player's inventory in html; only called when new item picked up
  function showInventory(gameState){
      var box = document.getElementById('inventory_box');
      var ul = document.getElementById('inventory');
      ul.innerHTML = "";
      var inventory = gameState.pc.inventory;
      if(inventory.length == 0)
          box.style.visibility = "hidden";
      else
          box.style.visibility = "visible";
      for (var i = 0; i < inventory.length; i++) {
          var item = inventory[i];

          var listItem = document.createElement("li");

          var _img = document.createElement('img');
          _img.src = item.sprite;
          _img.style = "width:60px;height:60px;";
          listItem.appendChild(_img);

          ul.appendChild(listItem);
      }
  }

    // define visuals and state-changes when player dies
    function onPlayerDeath(gameState){
        //var empty = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        gameState.ctx.font = '10px "Press Start 2P"';
        gameState.ctx.fillStyle = "#ffffff";
        gameState.ctx.fillText("GAME OVER DUDE", gameState.pc.position.x, gameState.pc.position.y - 10);
        gameState.changeItem = false;
    }

    // visuals for when player has won
    function onVictory(gameState){
        gameState.ctx.fillStyle = "rgba(0,0,0,.5)";
        gameState.ctx.fillRect(gameState.wrap.scrollLeft, 0,
            gameState.wrap.clientWidth, gameState.wrap.clientHeight);
        gameState.ctx.fillStyle = "#ffffff";
        gameState.ctx.font = '30px "Press Start 2P"';
        gameState.ctx.fillText("VICTORY IS YOURS",
            gameState.wrap.scrollLeft + .25* gameState.wrap.clientWidth,
            gameState.wrap.clientHeight/2);
    }

    function reset(){
        initialize();
        imgInit(gameState);
        gameState.wrap.scrollLeft = 0;
    }

    function testNPCCondition(characters){
        for(i=0; i<characters.length; i++){
            if((characters[i] instanceof NPC) && !characters[i].spokenTo){
                return false;
            }
        }
        return true;
    }

    function testEnemyCondition(characters){
        for(i=0; i<characters.length; i++){
            if(characters[i] instanceof Enemy && characters[i].status){
                return false;
            }
        }
        return true;
    }

    function testEndCondition(gameState){
        if(gameState.pc.position.x+gameState.pc.hitbox.x >= gameState.width - 15){
            return true;
        }
        return false;
    }

    function testWinConditions(gameState){
        if(!gameState.npcCondition){
            gameState.npcCondition = testNPCCondition(gameState.characters);
        }
        if(!gameState.enemyCondition){
            gameState.enemyCondition = testEnemyCondition(gameState.characters);
        }
        if(!gameState.endCondition){
            gameState.endCondition = testEndCondition(gameState);
        }
        if(gameState.npcCondition && gameState.enemyCondition && gameState.endCondition){
            gameState.victory = true;
        }
    }

    function handleItemUse (gameState){
        for(var i=0; i<gameState.characters.length; i++){
            if(gameState.characters[i].status){
                if(detectCollision(gameState.characters[i].position, gameState.pc.equippedItem.position,
                    gameState.characters[i], gameState.pc.equippedItem)){
                        gameState.pc.useItem(gameState.characters[i]);
                        return;
                }
            }
        }
        gameState.pc.useItem(gameState.pc);
    }

    function changeItem(gameState){
        if(gameState.pc.equippedItem!=null){
            if(gameState.pc.inventory.length > 1){
                gameState.pc.inventory.push(gameState.pc.equippedItem);
                gameState.pc.inventory.shift();
            }
            gameState.pc.setEquippedItem(gameState.pc.inventory[0]);
            gameState.pc.equippedItem.updatePosition(gameState.pc);
        }
        showInventory(gameState);
    }

    /*
    |------------------------------------------------------------------------------
    | Run Game Loop
    |------------------------------------------------------------------------------
    */

    reset();

    function loop() {
        // game loop

        update(gameState);
        draw(gameState);
        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);

    module.exports.showInventory = showInventory;
    module.exports.reset = reset;

});
module.exports.getData = getData;

},{"./character.js":1,"./database.js":2,"./element.js":4,"./enemy.js":5,"./environment.js":7,"./item.js":8,"./npc.js":9,"./parsing.js":10,"./player.js":11,"./utility.js":12}],7:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Environment Class
|------------------------------------------------------------------------------
|
| This file contains the Environment prototype (the javascript equivalent of a
| class). 
|
|------------------------------------------------------------------------------
*/


/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');
const Effect = require('./effect.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Environment(solid, pos, url, scale, hbox, eff){
    // console.log("solid", solid == true);
    // console.log("solid", solid == false);
   //if (solid == true || solid == false) {
        console.log("did env work");
      Element.call(this, pos, url, scale, hbox);
      this.solid = solid;
      this.effect = eff;
  //}
//   else{
//       return {};
//     }
};

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= 1;
    this.effect = new Effect("heal", 2);;
};

//Getter for solid
Environment.prototype.getSolid = function(){
    return this.solid;
};

//Setter for solid
Environment.prototype.setSolid = function(bool){
  if (bool == 1 || bool == 0){
      this.solid = bool;
  }
};

//Setter for effect
Environment.prototype.setEffect= function(eft){
    if(eft instanceof Effect)
        {this.effect = eft;}
};

//Getter for effect
Environment.prototype.getEffect=function(){
    return this.effect;
};

module.exports = Environment;

},{"./effect.js":3,"./element.js":4}],8:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Item Class
|------------------------------------------------------------------------------
|
| This file contains the Item prototype (the javascript equivalent of a
| class). It contains data about item status, position, and effect.
|
|------------------------------------------------------------------------------
*/

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');
const Vector = require('./utility.js');
const Effect = require('./effect.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const NPC = require('./npc.js');


/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Item(pos, url, sz, hbox, col, eff, bpos, hov, ts){
    Element.call(this, pos, url, sz, hbox);
    if ((typeof col === 'boolean') && (eff instanceof Effect)) {
        this.collected = col;
        this.effect = eff;
        this.basePos = bpos;
        this.hovering = hov;
        this.wobble = Math.random() * Math.PI * 2;
        this.targets=[];
        console.log(ts.length);
        console.log("test", (ts[0] === "Player"));
        // for(i=0;i<targets.length;i++){
        //     console.log("hello");
        //     if(targets[i] === "Player"){
        //         this.targets.push(Player);
        //     }
        //     if(targets[i] === "Enemy"){
        //         this.targets.push(Enemy);
        //     }
        //     if(targets[i] === "NPC"){
        //         this.targets.push(NPC);
        //     }
        // }
        if(this.targets.length == 0){
            this.targets.push(Player);
        }
        
    } else {
        return {};
    }
}

Item.prototype.Item = function(){
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
}

//Getter for effect
Item.prototype.getEffect = function(){
    return this.effect;
}

//Setter for effect
Item.prototype.setEffect = function(eft){
    if (eft instanceof Effect) {
        this.effect = eft;
    }
}

//Getter for whether the item has been collected
Item.prototype.getCollected = function(){
    return this.collected;
}

//Setter for whether the item has been collected
Item.prototype.setCollected = function(b){
    this.collected = b;
}

//Make item hover
Item.prototype.hover = function(step) {
    if (typeof step == 'number') {
        wobbleSpeed = 2;
        // wobbleDist = 1.5;
        this.wobble += step * wobbleSpeed;
        // var wobblePos = Math.sin(this.wobble) * wobbleDist;
        // this.position = this.basePos.plus(new Vector(0, wobblePos));
    } else {
        return null;
    }
}

//Update the item's position
Item.prototype.updatePosition = function(pc) {
    if(pc.dir == "right"){
        this.position.x = pc.position.x + pc.hitbox.x * .75;
        this.position.y = pc.position.y; //- pc.hitbox.y;
      }
      else{
        this.position.x = pc.position.x - pc.hitbox.x * .75;
        this.position.y = pc.position.y; //- pc.hitbox.y;
      }
}
module.exports = Item;

},{"./effect.js":3,"./element.js":4,"./enemy.js":5,"./npc.js":9,"./player.js":11,"./utility.js":12}],9:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| NPC Class
|------------------------------------------------------------------------------
|
| This file contains the NPC prototype (the javascript equivalent of a
| class). NPC is a subclass of the Character superclass. It has 
| information about the NPC's message.
|
|------------------------------------------------------------------------------
*/

const Character = require('./character.js');
const Vector = require('./utility.js').vector;

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function NPC(loc, max, hea, stat, msg, hbox, url, size, speed, mvspd, grav){
    
    if(typeof msg === "string"){
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
        this.message = msg;
        this.spokenTo = false;
    }
    else return {};
}

NPC.prototype = Object.create(Character.prototype); 
NPC.prototype.constructor = NPC;
//Getter for message
NPC.prototype.getMessage = function(){
    return this.message;
    
}

//Setter for message
NPC.prototype.setMessage = function(msg){
    //disallow non-string message
    if(typeof msg == "string"){
        this.message = msg;
        return;
    }   
    else 
        return null;
}



module.exports = NPC;

},{"./character.js":1,"./utility.js":12}],10:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Parser
|------------------------------------------------------------------------------
|
| This file contains the Parser, the JSONtoElements function, which
| creates a new element based on data from a given JSON.
|
|------------------------------------------------------------------------------
*/

const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Effect = require('./effect.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');

var defaultUrl = "https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png";
function JSONtoElements(data){
    if(data == '{}'){
        return {"elements": [],
                "backgroundUrl": '' }; 
    }
    console.log("data in paring", data);
    var dataobj= JSON.parse(data);
    console.log(dataobj);
    
    i=0;
    var elementarray= [];
    var backgroundurl= dataobj.background; //dataobj.backgroundImage";
        for (i=0; i<dataobj.objects.length; i++){
            var temp= dataobj.objects[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    console.log(temp);
                    var eff = new Effect(temp.effect, 1); // new Effect("damage", 1);
                    console.log("did effect work", eff);
                    var solid = temp.solid;
                    console.log("solid!", solid);
                    element = new Environment(solid,pos,url,sz,hitbox,eff);
                    console.log(element);
                }
                else if (temp.name == "Item"){
                    console.log("item", dataobj.objects[i]);
                    var col = false;
                    var eff = new Effect("damage", 1);
                    var hov =true;
                    var targets = dataobj.objects[i].targets;
                    element = new Item(pos, url, sz, hitbox, col, eff, pos, hov, targets);
                    console.log('from parsing');
                }
                else if (temp.name == "Player"){
                    console.log("player",dataobj.objects[i]);
                    var max = 10;//dataobj.objects[i].maxhealth;
                    var stat = true;
                    var itm= null;
                    var inv= [];
                    var hitbox = new Vector(50,50);
                    if(url === defaultUrl)
                        hitbox = new Vector(19,50);
                    var spd = new Vector(0,0);
                    var mvspd = 30;//dataobj.objects[i].speed;
                    var grav =  50;//dataobj.objects[i].gravity;
                    var dir = "right";
                    element = new Player(pos, max, max, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav, dir);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 7;
                    var stat = true; 
                    var msg =  dataobj.objects[i].msg;
                    var spd = new Vector(0,0);
                    var mvspd = 30;
                    var grav = 50;
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "Enemy"){
                    var max = 10;
                    var hea= 10;
                    var stat = true;
                    var dmg =  1;//dataobj.objects[i].damage;
                    var spd = new Vector(0,0);
                    var mvspd = 15;
                    var grav = 60;
                    var dir = "left";
                    var range = 35;
                    var startLoc = pos;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz, spd, mvspd, grav, dir, range, startLoc);
                }
                elementarray.push(element);
            }
        }
        
        return {"elements": elementarray,
                "backgroundUrl": "https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png"
             }
    }
module.exports = JSONtoElements;

},{"./character.js":1,"./effect.js":3,"./element.js":4,"./enemy.js":5,"./environment.js":7,"./item.js":8,"./npc.js":9,"./player.js":11,"./utility.js":12}],11:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Player Class
|------------------------------------------------------------------------------
|
| This file contains the Player prototype (the javascript equivalent of a
| class). Player is a subclass of the superclass Character. It contains
| data about player status and whether the player has an item.
|
|------------------------------------------------------------------------------
*/
/*Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');
const Vector = require('./utility.js');

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed, mvspd, grav, dir){
    if((Array.isArray(inv))){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.equippedItem = itm;
    this.inventory = inv;
    this.sinceTile = 50;
    this.direction = dir;
    
    } else
        return {};
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


//Getter for inventory
Player.prototype.getInventory= function(){
    return this.inventory;
}

//Setter for inventory
Player.prototype.setInventory = function(arr){
    if(Array.isArray(arr)){
        items= true;
        for(i=0; i<arr.length; i++){
            if(!(arr[i] instanceof Item))
                items=false;
        }
        if(items){
        this.inventory = arr;
        }
    }
}

//Getter for an owned item
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//Setter for owned item; return 1 if successful, return 0 for non-item input
Player.prototype.setEquippedItem = function(itm){
    // set owned item to itm
    // set item.collected to be true
    if(itm instanceof Item){
        // this.inventory.push(this.equippedItem);
        this.equippedItem = itm;
        itm.collected = true;
    }
}

//Use owned item
Player.prototype.useItem = function(target){
    /* if there is a target, do the effect (heal or damage)*/
    if(this.status){
        if(this.isTarget(target)){
            if(this.equippedItem.getEffect().effect == "heal" && target.status){
                target.addHealth(this.equippedItem.getEffect().getAmount());
            }
            else if (this.equippedItem.getEffect().effect == "damage" && target.status){
                target.decHealth(this.equippedItem.getEffect().getAmount());
            }
        }
    }

}

//Pick up an item
Player.prototype.pickUpItem = function(item){
    this.setEquippedItem(item);
    this.inventory.unshift(item);
}

Player.prototype.isTarget = function (target){
    for(i=0;i<this.equippedItem.targets.length;i++){
        if(this.equippedItem.targets[i].name == target.constructor.name){
            return true;
        }
    }
    return false;
}

module.exports = Player;

},{"./character.js":1,"./item.js":8,"./utility.js":12}],12:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Vector Class
|------------------------------------------------------------------------------
|
| This file contains the Vector prototype (the javascript equivalent of a
| class).
|
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Constructor
|------------------------------------------------------------------------------
*/
function Vector(x,y){
	if (typeof(x) != 'number' || typeof(y) != 'number'){
		return {};
	}
	else{
		this.x=x;
		this.y=y;
	}
}

//Add to the vector
Vector.prototype.plus = function(vec) {
	if (typeof(vec.x) != 'number' || typeof(vec.y) != 'number'){
		return {};
	}
	else{
		return new Vector (this.x + vec.x, this.y + vec.y);
	}
}

//Multiply the vector times a number or a vector
Vector.prototype.times = function(num) {
	if(typeof(num) == 'number')
	    return new Vector (this.x * num, this.y * num);
	else if(num instanceof Vector)
	    return new Vector (this.x * num.x, this.y * num.y);
}

module.exports = Vector;

},{}]},{},[6])(6)
});
