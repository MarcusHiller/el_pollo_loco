/**
 * Container class for character animation image paths grouped by behavior.
 */
class CharakterImg {

    /**
     * Image paths for walking animation frames.
     * @type {string[]}
     */
    IMAGES_WALKING;


    /**
     * Image paths for jumping animation frames.
     * @type {string[]}
     */
    IMAGES_JUMPING;


    /**
     * Image paths for hurt animation frames.
     * @type {string[]}
     */
    IMAGES_HURT;


    /**
     * Image paths for death animation frames.
     * @type {string[]}
     */
    IMAGES_DEAD;


    /**
     * Image paths for short idle animation frames.
     * @type {string[]}
     */
    IMAGES_IDLE_SHORT;


    /**
     * Image paths for long idle animation frames.
     * 
     * @type {string[]}
     */
    IMAGES_IDLE_LONG;


    /**
     * Image paths for falling animation frames.
     * 
     * @type {string[]}
     */
    IMAGES_FALLS;
    

    /**
     * Creates a new CharakterImg instance containing all relevant animation image paths.
     * 
     * @param {string[]} walking - Paths for walking animation images.
     * @param {string[]} hurt - Paths for hurt animation images.
     * @param {string[]} IMAGES_DEAD - Paths for death animation images.
     * @param {string[]} idleShort - Paths for short idle animation images.
     * @param {string[]} idleLong - Paths for long idle animation images.
     * @param {string[]} jumping - Paths for jumping animation images.
     * @param {string[]} falls - Paths for falling animation images.
     */
    constructor (walking, hurt, IMAGES_DEAD, idleShort, idleLong, jumping, falls) {
        this.IMAGES_WALKING = walking;
        this.IMAGES_JUMPING = jumping;
        this.IMAGES_HURT = hurt;
        this.IMAGES_DEAD = IMAGES_DEAD;
        this.IMAGES_IDLE_SHORT = idleShort;
        this.IMAGES_IDLE_LONG = idleLong;
        this.IMAGES_FALLS = falls;
    }
}