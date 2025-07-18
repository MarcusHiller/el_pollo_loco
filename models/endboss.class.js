/**
 * Represents the final enemy (endboss) in the game.
 * Inherits movement, energy, and animation behavior from MovableObject.
 */
class Endboss extends MovableObject {

    /**
     * Object containing all endboss image sets for animation.
     * @type {Object} 
     */
    IMAGES = endbossAssets;


    /** @type {number} Width of the endboss in pixels */
    width = 450;


    /** @type {number} Height of the endboss in pixels */
    height = 450;


    /** @type {number} Vertical position of the endboss */
    y = 10;


    /** @type {string} Identifier for the character type */
    name = 'endboss';


    /** @type {number} Current energy of the endboss */
    energy = 100;


    /** @type {number} Damage inflicted by the endboss */
    damagePoints = 25;


    /** @type {number} Duration (in seconds) for the hurt status */
    damageTime = 1;


    /** @type {boolean} Flag to ensure death animation only plays once */
    deadAnimationPlayed = false;


    /**
     * Collision offsets to fine-tune hitbox
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 200,
        left: 120,
        right: 95,
        bottom: 120
    }


    /**
     * Creates a new endboss instance, loads all animations,
     * sets initial position and starts animation cycle.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES.IMAGES_WALKING);
        this.loadImages(this.IMAGES.IMAGES_ALERT);
        this.loadImages(this.IMAGES.IMAGES_ATTACK);
        this.loadImages(this.IMAGES.IMAGES_HURT);
        this.loadImages(this.IMAGES.IMAGES_DEAD);
        this.x = 2600;
        this.speed = 15;
        this.animate();
    }


    /**
     * Handles animation switching depending on player distance,
     * hurt status and energy levels.
     * Runs repeatedly via setInterval.
     */
    animate() {
        this.endbossAnimate = setInterval(() => {
            if (!this.world.distanceCharacterAndBoss()) {
                this.playAnimation(this.IMAGES.IMAGES_ALERT);
            } else if (!this.isHurt() && this.isDead() && !this.deadAnimationPlayed) {
                this.endbossDie();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES.IMAGES_HURT);
            } else if (this.energy <= 75 && this.energy > 50) {
                this.playAnimation(this.IMAGES.IMAGES_ATTACK);
            } else if (!this.isHurt()) {
                this.walkAnimation();
            }
        }, 110);
    }


    /**
     * Plays the death animation and stops the main animation loop.
     */
    endbossDie() {
        this.deadAnimationPlayed = true;
        clearInterval(this.endbossAnimate);
        this.playAnimationOnce(this.IMAGES.IMAGES_DEAD, 50);
        this.loadImage(this.IMAGES.IMAGES_DEAD[2]);
    }


    /**
     * Handles walking animation and movement to the left.
     */
    walkAnimation() {
        this.playAnimation(this.IMAGES.IMAGES_WALKING);
        this.moveLeft();
    }
}