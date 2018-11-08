var Character = require('./enemy.js');

describe('Enemy', function() {
    let testEnemy;

    //test default constructor

    describe('Enemy', function() {
        it('should create a new enemy with create enemy with loc (0,0), maxhealth 10 health 10, status 1, damage 1', function() {
            testEnemy = new Enemy();
            expect(testEnemy.getDamage()).toEqual(1);
            expect(testEnemy.getLocation()).toEqual(vector(0,0));
            expect(testEnemy.getMaxHealth()).toEqual(10);
            expect(testEnemy.getHealth()).toEqual(10);
            expect(testEnemy.getStatus()).toEqual(1);
        });
    });

    //test full constructor
describe('Enemy', function('loc','max','hea','stat','dmg') {
        it('should create a new enemy with create enemy with loc (1,1), maxhealth 20 health 0, status 0, damage 5', function() {
            testEnemy = new Enemy(new vector(1,1), 20, 0, 0, 5);
            expect(testEnemy.getDamage()).toEqual(5);
            expect(testEnemy.getLocation()).toEqual(vector(1,1));
            expect(testEnemy.getMaxHealth()).toEqual(20);
            expect(testEnemy.getHealth()).toEqual(0);
            expect(testEnemy.getStatus()).toEqual(0);
        });
    });

    //test setDamage

    describe('setDamage', function(amount) {
        testEnemy = new Enemy();
        it('should set the enemy's damage level and return 1', function() {
            expect(testEnemy.setDamage(5)).toEqual(1);
            expect(testEnemy.getDamage()).toEqual(5);
        });
        it('should not set the enemy's damage to 2.5 and return 0', function() {
            expect(testEnemy.setDamage(2.5)).toEqual(0);
            expect(testEnemy.getDamage()).toEqual(5);
        });
    });

    //test getDamage
    describe('getDamage', function() {
        testEnemy = new Enemy();
        it('should return the enemy's damage level', function() {
            expect(testEnemy.getDamage()).toEqual(1);
            testEnemy.setDamage(5);
            expect(testEnemy.getDamage()).toEqual(5);
        });
    });


});

