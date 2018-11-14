var Enemy = require('../static/enemy.js');
const Vector = require('../static/utility.js');

describe('Enemy', function() {
    let testEnemy;
    beforeEach(function(){
        testEnemy = new Enemy(new Vector(1,1), 20, 0, 0, 5, new Vector(10,10), new Vector(10,10));
    });

    //test constructor

    it('should create a new enemy with create enemy with loc (1,1), maxhealth 20 health 0, status 0, damage 5', function() {
        expect(testEnemy.getDamage()).toEqual(5);
        expect(testEnemy.getLocation()).toEqual(new Vector(1,1));
        expect(testEnemy.getMaxHealth()).toEqual(20);
        expect(testEnemy.getHealth()).toEqual(0);
        expect(testEnemy.getStatus()).toEqual(0);
    });

    //test setDamage
    it('should set the enemys damage level', function() {
        testEnemy.setDamage(5);
        expect(testEnemy.getDamage()).toEqual(5);
    });

    //test getDamage
    it('should return the enemys damage level', function() {
        expect(testEnemy.getDamage()).toEqual(5);
        testEnemy.setDamage(4);
        expect(testEnemy.getDamage()).toEqual(4);
    });

});