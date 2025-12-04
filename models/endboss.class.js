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
    damagePoints = 20;


    /** @type {number} Duration (in seconds) for the hurt status */
    damageTime = 1;


    /**
    * The duration of the player's injury protection period in seconds.
    * During this time, the player cannot take additional damage.
    * @type {number}
    */
    injuryProtection = 1.5;


    /** @type {boolean} Flag to ensure death animation only plays once */
    deadAnimationPlayed = false;


    /** @type {number} Minimum distance required between the player and the enemy. */
    enemyGap = 600;


    /** @type {number} Timestamp marking the last moment the enemy changed direction. */
    directionTimePoint = 0;


    /** @type {number} Interval in milliseconds before the enemy can change direction again. */
    directionTime = 500;


    /**
     * Collision offsets to fine-tune hitbox
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 100,
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
            let charBossGap = this.world.distanceCharacterAndBoss();
            if (charBossGap > this.enemyGap) {
                this.playAnimation(this.IMAGES.IMAGES_ALERT);
            } else if (!this.isHurt() && this.isDead() && !this.deadAnimationPlayed) {
                this.endbossDie();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES.IMAGES_HURT);
            } else if (!this.isHurt()) {
                this.playAnimation(this.IMAGES.IMAGES_WALKING);
                this.walkDirection(charBossGap);
            }
        }, 110);
    }


    /**
    * Controls the walking direction of the enemy based on the distance to the boss.
    *
    * @param {number} charBossGap - The current distance between the character and the boss.
    */
    walkDirection(charBossGap) {
        if (charBossGap >= -150) {
            this.moveLeft();
            this.otherDirection = false;
            this.setDirection();
        } else if (this.directionTimer()) {
            this.moveRight();
            this.otherDirection = true;
        }
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


    /**
    * Checks whether the character is currently under injury protection.
    * 
    * @function protection
    * @returns {boolean} `true` if the protection period is active, otherwise `false`.
    */
    protection() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < this.injuryProtection;
    }


    /**
    * Sets the current timestamp as the last moment the enemy changed direction.
    */
    setDirection() {
        this.directionTimePoint = new Date().getTime();
    }


    /**
    * Checks whether enough time has passed to allow another direction change.
    *
    * @returns {boolean} True if the allowed time interval has passed, otherwise false.
    */
    directionTimer() {
        let pastTime = new Date().getTime() - this.directionTimePoint;
        return pastTime > this.directionTime;
    }
}