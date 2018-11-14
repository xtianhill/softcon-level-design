var Enemy = require('./enemy.js');
const Vector = require('./utility.js');

describe('Enemy', function() {
    let testEnemy;

    beforeEach(function(){
        testEnemy = new Enemy();
    });
    //test default constructor

    it('should create a new enemy with create enemy with loc (0,0), maxhealth 10 health 10, status 1, damage 1', function() {
        expect(testEnemy.getDamage()).toEqual(1);
        expect(testEnemy.getLocation()).toEqual(new Vector(0,0));
        expect(testEnemy.getMaxHealth()).toEqual(10);
        expect(testEnemy.getHealth()).toEqual(10);
        expect(testEnemy.getStatus()).toEqual(1);
    });

    //test full constructor

    it('should create a new enemy with create enemy with loc (1,1), maxhealth 20 health 0, status 0, damage 5', function() {
        testEnemy = new Enemy(new Vector(1,1), 20, 0, 0, 5);
        expect(testEnemy.getDamage()).toEqual(5);
        expect(testEnemy.getLocation()).toEqual(new Vector(1,1));
        expect(testEnemy.getMaxHealth()).toEqual(20);
        expect(testEnemy.getHealth()).toEqual(0);
        expect(testEnemy.getStatus()).toEqual(0);
    });

    //test setDamage
    it('should set the enemys damage level and return 1', function() {
        expect(testEnemy.setDamage(5)).toEqual(1);
        expect(testEnemy.getDamage()).toEqual(5);
    });
    it('should not set the enemys damage to 2.5 and return 0', function() {
        expect(testEnemy.setDamage(2.5)).toEqual(0);
        expect(testEnemy.getDamage()).toEqual(5);
    });

    //test getDamage
    it('should return the enemys damage level', function() {
        expect(testEnemy.getDamage()).toEqual(1);
        testEnemy.setDamage(5);
        expect(testEnemy.getDamage()).toEqual(5);
    });

});