/**
 * Class representing a game level including all objects and boundaries.
 */
class Level {

    /** @type {MovableObject[]} */
    enemies;


    /** @type {Cloud[]} */
    clouds;


    /** @type {BackgroundObject[]} */
    background;


    /** @type {Bottle[]} */
    bottle;


    /** @type {Coin[]} */
    coin;


    /** @type {number} Maximum x-position for the level scroll */
    level_end_x = 2880;


    /**
     * Creates a new level with all needed entities.
     * 
     * @param {MovableObject[]} enemies - Array of enemy objects.
     * @param {Cloud[]} clouds - Array of cloud objects.
     * @param {BackgroundObject[]} background - Background layers.
     * @param {Bottle[]} bottle - Bottle objects in the level.
     * @param {Coin[]} coin - Coin objects in the level.
     */
    constructor(enemies, clouds, background, bottle, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.bottle = bottle;
        this.coin = coin;
    }
}