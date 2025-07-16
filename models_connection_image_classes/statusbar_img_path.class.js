/**
 * Container class for image paths used in status bars (health, endboss, coins, bottles).
 */
class StatusbarImages {

    /**
     * Array of image paths representing different health bar levels.
     * @type {string[]}
     */
    IMAGES_HEALTH;


    /**
     * Array of image paths representing different endboss health levels.
     * @type {string[]}
     */
    IMAGES_ENDBOSS;


    /**
     * Array of image paths representing different coin collection levels.
     * @type {string[]}
     */
    IMAGES_COINS;


    /**
     * Array of image paths representing different bottle collection levels.
     * @type {string[]}
     */
    IMAGES_BOTTLES;


    /**
     * Creates a new StatusbarImages instance.
     * @param {string[]} health - Image paths for the health bar.
     * @param {string[]} endboss - Image paths for the endboss health bar.
     * @param {string[]} coins - Image paths for the coin status bar.
     * @param {string[]} bottles - Image paths for the bottle status bar.
     */
    constructor(health, endboss, coins, bottles) {
        this.IMAGES_HEALTH = health;
        this.IMAGES_ENDBOSS = endboss;
        this.IMAGES_COINS = coins;
        this.IMAGES_BOTTLES = bottles;
    }
}