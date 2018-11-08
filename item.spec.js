var Item = require('./item.js');

describe('Item', function(){
    let testItem;
    beforeEach(function(){
        testItem = new Item(true, true);
    });
    it('should construct an item', function(){
        expect(testItem.getCollected()).toBeTruthy();
        expect(testItem.getEffect()).toBeTruthy();

    });
    it('should set and get effect', function(){
    	testItem.setEffect(true);
    	expect(testItem.getEffect()).toBeTruthy();
    });
    it('should set and get collected', function(){
    	testItem.setCollected(true);
    	expect(testItem.getCollected()).toBeTruthy();
    });

});