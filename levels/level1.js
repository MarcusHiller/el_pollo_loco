/**
 * Creates and returns the level configuration for level 1.
 *
 * @function
 * @returns {Level} A new Level instance populated with enemies, clouds, backgrounds, bottles, and coins.
 * @param {Enemy[]} enemies - All enemies in the level.
 * @param {Cloud[]} clouds - Cloud objects for parallax background.
 * @param {BackgroundObject[]} backgroundObjects - Background layers of the level.
 * @param {Bottle[]} bottles - Collectable bottles in the level.
 * @param {Coin[]} coins - Collectable coins in the level.
 * 
 */
function createLevel1() {

    return new Level(
        [
            new Chicken(250),
            new Chicken(250),
            new Chicken(900),
            new Chicken(1200),
            new Chicken(1800),
            new Chicken(2200),
            new Chicken(2500),
            new SmallChicken(250),
            new SmallChicken(250),
            new SmallChicken(800),
            new SmallChicken(1500),
            new SmallChicken(1800),
            new SmallChicken(2200),
            new SmallChicken(2500),
            new Endboss()
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 0),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 0),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 0),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 0),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 600),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 600),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 1500),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 1500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 2000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 2000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 2400),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 2400),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 3000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 3000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 3500),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 3500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 4000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 4000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 15, 0.15, 4500),
            new Cloud('img/5_background/layers/4_clouds/2.png', 20, 0.25, 4500),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        ],
        [
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1500, 340),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1500, 110),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1500, 340),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1500, 70),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 2000, 80),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 2000, 100),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 2000, 330),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 2200, 80),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 2200, 100),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 2200, 330),
        ],
        [
            new Coin('img/8_coin/coin_1.png', 110, 120),
            new Coin('img/8_coin/coin_1.png', 150, 100),
            new Coin('img/8_coin/coin_1.png', 190, 80),
            new Coin('img/8_coin/coin_1.png', 230, 60),
            new Coin('img/8_coin/coin_1.png', 270, 80),
            new Coin('img/8_coin/coin_1.png', 310, 100),
            new Coin('img/8_coin/coin_1.png', 350, 120),
            new Coin('img/8_coin/coin_1.png', 1000, 180),
            new Coin('img/8_coin/coin_1.png', 1200, 180),
            new Coin('img/8_coin/coin_1.png', 1400, 180),
            new Coin('img/8_coin/coin_1.png', 1600, 140),
            new Coin('img/8_coin/coin_1.png', 1900, 120),
            new Coin('img/8_coin/coin_1.png', 2000, 150),
        ]
    );
}