/**
 * Represents a throwable object (e.g. a salsa bottle) in the game.
 * Inherits movement and gravity from MovableObject.
 */
class ThrowableObject extends MovableObject {

    /** @type {number} Width of the bottle in pixels. */
    width = 60;


    /** @type {number} Height of the bottle in pixels. */
    height = 70;


    /** @type {boolean} Indicates whether the bottle has already broken. */
    bottleBroken = false;


    /** @type {boolean} Marks this object for removal after animation. */
    markForRemoval = false;


    /** @type {World} Reference to the game world (set externally). */
    world;


    /** @type {string[]} Image paths used for the rotation animation while flying. */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    /** @type {string[]} Image paths used for the splash animation when breaking. */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    /**
     * Creates a new throwable object and starts the throw animation.
     * 
     * @param {number} x - Initial x position.
     * @param {number} y - Initial y position.
     * @param {boolean} direction - Direction of throw. `true` for left, `false` for right.
     */
    constructor(x, y, direction) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
        this.otherDirection = direction;
    }


    /**
     * Starts the throw movement and animation. Handles movement and collision.
     */
    throw() {
        this.speedY = 18;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.isAboveGround() && !this.otherDirection) {
                this.x += 18;
                this.playAnimation(this.IMAGES_BOTTLE);
            } else if (this.isAboveGround() && this.otherDirection) {
                this.x -= 18;
                this.playAnimation(this.IMAGES_BOTTLE);
            } else if (!this.bottleBroken) {
                this.bottleBreaks();
            }
        }, 60);
    }


    /**
     * Handles the bottle break logic and starts splash animation.
     */
    bottleBreaks() {
            clearInterval(this.throwInterval);
            this.bottleBroken = true;
            this.playAnimationOnce(this.IMAGES_SPLASH, 40);
            this.markerForDelete();
    }


    /**
     * Marks the object for removal after a short delay to allow splash animation to finish.
     */
    markerForDelete() {
        setTimeout(() => {
            this.markForRemoval = true;
        }, 440);
    }
}