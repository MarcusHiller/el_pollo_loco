/**
 * Represents any object that can move and be affected by gravity.
 * Extends DrawableObject with movement, collision, and damage logic.
 */
class MovableObject extends DrawableObject {

    /** @type {number} Horizontal movement speed */
    speed;


    /** @type {boolean} Indicates movement direction (true = left) */
    otherDirection = false;


    /** @type {number} Vertical speed (used for jumping or falling) */
    speedY = 0;


    /** @type {number} Downward acceleration due to gravity */
    acceleration = 1;


    /** @type {number} Current energy/life of the object */
    energy;


    /** @type {number} Damage taken per hit */
    damagePoints;


    /** @type {number} Duration (in seconds) the object is hurt after hit */
    damageTime;


    /** @type {number} Timestamp of the last hit (in ms) */
    lastHit = 0;


    /** @type {World} Reference to the game world */
    world;


    /**
     * Collision offsets to fine-tune hitboxes.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /** Constructs a movable object */
    constructor() {
        super();
    };


    /**
     * Checks whether this object is colliding with another movable object.
     * @param {MovableObject} movableObject - Object to check collision against.
     * @returns {boolean} True if objects overlap.
     */
    isColliding(movableObject) {
        return this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top;
    }


    /**
     * Plays a looping animation from a given image array.
     * @param {string[]} images - Paths to the animation frames.
     */
    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Plays a one-time animation sequence.
     * @param {string[]} images - Paths to the animation frames.
     * @param {number} count - Frame delay in ms.
     */
    playAnimationOnce(images, count) {
        this.currentImage = 0;
        this.animationInterval = setInterval(() => {
            if (this.currentImage < images.length) {
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(this.animationInterval);
            }
        }, count);
    }


    /**
     * Applies gravity by reducing vertical speed over time.
     * Runs in an interval.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks whether the object is in the air.
     * @returns {boolean} True if above ground level.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else {
            return this.y < 175;
        }
    }


    /** Moves the object to the left */
    moveLeft() {
        this.x -= this.speed;
    }


    /** Moves the object to the right */
    moveRight() {
        this.x += this.speed;
    }


    /** Initiates a jump by setting vertical speed */
    moveJump() {
        this.speedY = 18;
    }


    /**
     * Checks whether the object is still in a hurt state.
     * @returns {boolean} True if within hurt time window.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < this.damageTime;
    }


    /**
     * Checks whether the object has no remaining energy.
     * @returns {boolean} True if energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }


    /** Marks the object as recently hurt (sets timestamp) */
    setHurt() {
        this.lastHit = new Date().getTime();
    }


    /**
     * Handles logic for hitting one enemy object.
     * @param {MovableObject} enemy - The enemy to damage.
     */
    hitEnemy(enemy) {
        enemy.energy = enemy.energy - enemy.damagePoints;
        if (enemy.energy <= 0) {
            enemy.energy = 0;
            this.speed = 0;
            this.setHurt();
        }
    }


    /**
     * Reduces this object's energy by its damage value.
     * Sets energy to 0 if it drops below.
     */
    drawOffEnergy() {
        if (this.energy > 0) {
            this.energy -= this.damagePoints;
        }
        if (this.energy <= 0) {
            this.energy = 0; 
        }
    }


    /**
     * Executes full injury process: checks hurt state, applies damage,
     * and updates health bar UI.
     */
    injuryProcess() {
        if (!this.isHurt()) {
            this.setHurt();
            this.drawOffEnergy();
            this.findCharacterObjekt();
        }
    }

    
    /**
     * Updates the appropriate health bar based on the object name (e.g. pepe, endboss).
     */
    findCharacterObjekt() {
        if (this.name === 'pepe') {
            let healthBar = world.getStatusbarByType('HEALTH');
            healthBar?.setPercentage(this.energy);
        } else if (this.name === 'endboss') {
            let bossBar = world.getStatusbarByType('ENDBOSS');
            bossBar?.setPercentage(this.energy);
        }
    }


    /**
     * Starts movement and animation for a chicken-type enemy.
     * @param {string[]} walkImages - Animation frames while walking.
     * @param {string} deadImage - Image path when dead.
     */
    animateChicken(walkImages, deadImage) {
        this.chickenIntervallX = setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
        this.chickenWalk = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(walkImages);
            } else if (this.energy == 0) {
                this.loadImage(deadImage);
            }
        }, 150);
    }
}