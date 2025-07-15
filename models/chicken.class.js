/**
 * Represents a normal walking enemy chicken.
 * Inherits movement and animation logic from MovableObject.
 */
class Chicken extends MovableObject {

    /** @type {Object} Image paths for different chicken */
    IMAGES = chickenAssets;


    /** @type {string} Name identifier */
    name = 'normal_chicken'


    /**
     * Collision offset for fine-tuning the hitbox.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };
    

    /**
     * Initializes a Chicken instance with random position and speed.
     * @param {string} imagePath - Path to the chicken image.
     * @param {number} width - Width of the object.
     * @param {number} height - Height of the object.
     * @param {number} x - Random position of the object.
     * @param {number} y - Y position of the object.
     * @param {number} speed - Speed of the object.
     * @param {number} energy - Health status of the property.
     * @param {number} damagePoints - Susceptibility of the object to erosion.
     * @param {number} damageTime - Time until object is deleted.
     * 
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.width = 75;
        this.height = 75;
        this.x = 250 + (Math.random() * 1500);
        this.y = 355;
        this.speed = 0.15 + Math.random() * 0.4;
        this.energy = 100;
        this.damagePoints = 100;
        this.damageTime = 1.2;
        this.loadImages(this.IMAGES.NORMAL_CHICKEN_WALKING);
        this.animateChicken(this.IMAGES.NORMAL_CHICKEN_WALKING, 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
}