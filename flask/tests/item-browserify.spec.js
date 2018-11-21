(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.item = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Vector = require('./utility.js');

/*Element prototype */
/*note: pos, scl, hitbox are vectors with x and y values */

function Element(pos, url, sz, hbox){
	if(((pos instanceof Vector) && (typeof url === 'string')) && ((sz instanceof Vector) && (hbox instanceof Vector))){
		this.position = pos; 
		this.sprite = url; //url to image file
		this.scale = sz; //scale to resize image dimensions
		this.hitbox = hbox;
	} else {
		return {};
	}
}

Element.prototype.getPosition = function(){
	return this.position;
}

Element.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

Element.prototype.getSprite = function(){
	return this.sprite;
}

Element.prototype.setSprite = function(url){
	if(typeof url === 'string'){
		this.sprite = url;
	}
}

Element.prototype.getSize = function(){
	return this.scale;
}

Element.prototype.setSize = function(scl){
	if (scl instanceof Vector){
		this.scale = scl;
	}
}

Element.prototype.getHitbox = function(){
	return this.hitbox;
}

Element.prototype.setHitbox = function(hbx){
	if(hbx instanceof Vector){
		this.hitbox = hbx;
	}
}

module.exports = Element;
},{"./utility.js":3}],2:[function(require,module,exports){
/* Item Prototype */

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');

function Item(pos, url, sz, hbox, col, eff){
    Element.call(this, pos, url, sz, hbox);
    this.collected = col;
    this.effect = eff;
}

Item.prototype.Item = function(){  
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
};

Item.prototype.setEffect= function(eft){
    this.effect = eft;
};

Item.prototype.getEffect=function(){
    return this.effect;
};

Item.prototype.getCollected= function(){
    return this.collected;
};

Item.prototype.setCollected= function(b){
    this.collected = b;
};

module.exports = Item;
},{"./element.js":1}],3:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

module.exports = Vector;
},{}],4:[function(require,module,exports){
var Item = require('../static/item.js');

describe('Item', function(){
    let testItem;
    beforeEach(function(){
        testItem = new Item('pos', 'url', 'sz', 'hbox', true, true);
    });
    it('should construct an item', function(){
        expect(testItem.getCollected()).toBeTruthy();
        expect(testItem.getEffect()).toBeTruthy();

    });
    it('should set and get effect', function(){
    	testItem.setEffect(false);
    	expect(testItem.getEffect()).toBeFalsy();
    });
    it('should set and get collected', function(){
    	testItem.setCollected(false);
    	expect(testItem.getCollected()).toBeFalsy();
    });

});
},{"../static/item.js":2}]},{},[4])(4)
});
