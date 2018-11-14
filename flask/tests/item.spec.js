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