var Enemy = require('./enemy.js');
const vector = require('./utility.js').vector;

describe('Enemy', function() {
    let testEnemy;

    beforeEach(function(){
        testEnemy = new Enemy(new vector(1,1), 20, 0, 0, 5, new vector(50,50), null, new vector(50,50));
    });
    //test constructor

    it('should create a new enemy with create enemy with loc (0,0), maxhealth 10 health 10, status 1, damage1, 50x50 hb, null url, 50x50 scale', function() {
        expect(testEnemy.getDamage()).toEqual(5);
        expect(testEnemy.getPosition()).toEqual(new vector(1,1));
        expect(testEnemy.getMaxHealth()).toEqual(20);
        expect(testEnemy.getHealth()).toEqual(0);
        expect(testEnemy.getStatus()).toEqual(0);
        expect(testEnemy.getHitbox()).toEqual(new vector(50,50));
        expect(testEnemy.getSprite()).toBeNull();
        expect(testEnemy.getScale()).toEqual(new vector(50,50));
    });



    //test setDamage
    it('should set the enemys damage level and return 1', function() {
        testEnemy.setDamage(2);
        expect(testEnemy.getDamage()).toEqual(2);
    });
  

    //test getDamage
    it('should return the enemys damage level', function() {
        expect(testEnemy.getDamage()).toEqual(5);
        testEnemy.setDamage(1);
        expect(testEnemy.getDamage()).toEqual(1);
    });

});

