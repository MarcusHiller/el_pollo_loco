/**
 * Represents the main player character "pepe" in the game.
 * Handles movement, animations, interaction, and status tracking.
 * Inherits behavior from MovableObject.
 */
class Character extends MovableObject {

    /**
     * Object containing all character image sets for animation.
     * @type {Object} 
     */
    IMAGES = pepeAssets;


    /** @type {string} Character name identifier */
    name = 'pepe'


    /** @type {number} Character width */
    width = 100;


    /** @type {number} Character height */
    height = 250;


    /** @type {number} Horizontal position */
    x = 10;


    /** @type {number} Vertical position */
    y = 175;


    /** @type {number} Horizontal speed */
    speed = 6;


    /** @type {number} Vertical speed (for jumping/falling) */
    speedY = 0;


    /** @type {boolean} Whether the character is currently jumping */
    jump = false;


    /** @type {boolean} Whether the character is currently falling */
    falls = false;


    /** @type {number} Current energy (health) of the character */
    energy = 100;


    /** @type {boolean} Whether the character is dead */
    pepeDead = false;


    /** @type {number} Gravity acceleration */
    acceleration = 1;


    /** @type {number} Damage the character can inflict or take */
    damagePoints = 20;


    /** @type {number} Time in seconds the character stays in hurt state */
    damageTime = 1;


    /** @type {number} Number of collected bottles */
    bottle = 0;


    /** @type {number} Number of collected coins */
    coin = 0;


    /** @type {number} Timestamp of last throw action */
    timeLastThrow;


    /** @type {number} Minimum seconds between throws */
    throwDelay = 0.8;


    /** @type {boolean} Whether the character is currently allowed to throw */
    canThrow = true;


    /** @type {number} Timestamp of last player action (for idle detection) */
    lastAction;


    /** @type {Object} Reference to the world instance */
    world;


    /**
     * Collision offset values to fine-tune the hitbox
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 100,
        left: 30,
        right: 25,
        bottom: 12
    };


    /**
     * Initializes the character, loads all images and sets up animations.
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/3_jump/J-31.png');
        this.loadImages(this.IMAGES.IMAGES_WALKING);
        this.loadImages(this.IMAGES.IMAGES_JUMPING);
        this.loadImages(this.IMAGES.IMAGES_HURT);
        this.loadImages(this.IMAGES.IMAGES_DEAD);
        this.loadImages(this.IMAGES.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES.IMAGES_FALLS);
        this.animateKeyOptions();
        this.characterInteraction();
        this.setTimeLastAction();
        this.applyGravity();
        this.setThrowTime();
    }


    /**
     * Starts interval to listen to key input and trigger movement or throw actions.
     */
    animateKeyOptions() {
        this.keyMovements = setInterval(() => {
            if (this.canMoveRight())
                this.walkRight();
            if (this.canMoveLeft())
                this.walkLeft();
            if (this.world.keyboard.space && !this.isAboveGround())
                this.moveJump();
            if (this.world.keyboard.d && this.isIdle())
                this.setTimeLastAction();
            this.world.camera_x = -this.x + 20;
        }, 1000 / 60);
    }


    /**
     * Starts animation loop for character state updates (hurt, jump, walk, idle, etc.).
     */
    characterInteraction() {
        this.characterAnimation = setInterval(() => {
            if (this.isDead()) {
                this.characterDies();
            } else if (this.isHurt()) {
                this.hurtSequence();
            } else if (this.isAboveGround()) {
                this.theJumpSequence();
            } else if (this.directionOfMovement()) {
                this.walking();
            } else if (!this.isIdle()) {
                this.loadImage('img/2_character_pepe/3_jump/J-31.png');
            }
        }, 70);
    }


    /**
     * Executes the death sequence, stops animation and plays death animation once.
     */
    characterDies() {
        clearInterval(this.characterAnimation);
        this.pepeDead = true;
        this.playAnimationOnce(this.IMAGES.IMAGES_DEAD, 130);
    }


    /**
     * Plays hurt animation and updates last action timestamp.
     */
    hurtSequence() {
        this.playAnimation(this.IMAGES.IMAGES_HURT);
        this.setTimeLastAction();
    }


    /**
     * Checks if any left or right movement key is pressed.
     * @returns {boolean} True if character should walk.
     */
    directionOfMovement() {
        return this.world.keyboard.right || this.world.keyboard.left;
    }


    /**
     * Plays walking animation and updates last action time.
     */
    walking() {
        this.playAnimation(this.IMAGES.IMAGES_WALKING);
        this.setTimeLastAction();
    }


    /**
     * Determines if the character is allowed to move right.
     * @returns {boolean} True if moving right is within level bounds.
     */
    canMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.level_end_x;
    }


    /**
     * Determines if the character is allowed to move left.
     * @returns {boolean} True if moving left is within level bounds.
     */
    canMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }


    /**
     * Moves character to the right and sets direction flag.
     */
    walkRight() {
        this.moveRight();
        this.otherDirection = false;
    }


    /**
     * Moves character to the left and sets direction flag.
     */
    walkLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }


    /**
     * Checks if the character is moving upward (start of jump).
     * @returns {boolean} True if rising.
     */
    itRises() {
        return this.speedY >= 0 && !this.jump
    }


    /**
     * Checks if the character is falling downward.
     * @returns {boolean} True if falling.
     */
    itFalls() {
        return this.speedY < 0 && !this.falls
    }


    /**
     * Handles jumping animation logic based on vertical movement.
     */
    theJumpSequence() {
        if (this.itRises()) {
            this.characterJumpsUp();
        } else if (this.itFalls()) {
            this.characterFallsDown();
        }
    }


    /**
     * Triggers jump-up animation, sets jump state.
     */
    characterJumpsUp() {
        this.playAnimationOnce(this.IMAGES.IMAGES_JUMPING, 30);
        this.falls = false;
        this.jump = true;
    }


    /**
     * Triggers falling animation, sets fall state and updates last action time.
     */
    characterFallsDown() {
        this.playAnimationOnce(this.IMAGES.IMAGES_FALLS, 150);
        this.jump = false;
        this.falls = true;
        this.setTimeLastAction();
    }


    /**
     * Checks if character has been idle for 5–10 seconds.
     * @returns {boolean} True if in short idle range.
     */
    idleShort() {
        let timepassed = new Date().getTime() - this.lastAction;
        timepassed = timepassed / 1000;
        return timepassed > 5 && timepassed <= 10;
    }


    /**
     * Checks if character has been idle for more than 10 seconds.
     * @returns {boolean} True if in long idle range.
     */
    idleLong() {
        let timepassed = new Date().getTime() - this.lastAction;
        timepassed = timepassed / 1000;
        return timepassed > 10
    }


    /**
     * Plays idle animation based on last action timing.
     * @returns {boolean} True if idle animation was triggered.
     */
    isIdle() {
        if (this.idleShort()) {
            this.playAnimation(this.IMAGES.IMAGES_IDLE_SHORT);
            return true;
        } else if (this.idleLong()) {
            this.playAnimation(this.IMAGES.IMAGES_IDLE_LONG);
            return true;
        }
        return false;
    }


    /**
     * Updates timestamp of last meaningful action (movement, throw, etc.).
     */
    setTimeLastAction() {
        this.lastAction = new Date().getTime();
    }


    /**
     * Sets the timestamp of the last throw action.
     */
    setThrowTime() {
        this.timeLastThrow = new Date().getTime();
    }


    /**
     * Checks whether the throw cooldown is still active.
     * @returns {boolean} True if throw is on cooldown.
     */
    isThrowDelayActive() {
        let timepassed = new Date().getTime() - this.timeLastThrow;
        timepassed = timepassed / 1000;
        return timepassed < this.throwDelay;
    }
}