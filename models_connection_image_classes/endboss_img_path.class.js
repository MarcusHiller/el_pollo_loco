/**
 * Container class for endboss animation image paths by behavior.
 */
class EndbossImg {

    /**
     * Image paths for walking animation.
     * 
     * @type {string[]}
     */
    IMAGES_WALKING;


    /**
     * Image paths for alert animation (pre-attack).
     * 
     * @type {string[]}
     */
    IMAGES_ALERT;


    /**
     * Image paths for attack animation.
     * 
     * @type {string[]}
     */
    IMAGES_ATTACK;


    /**
     * Image paths for hurt animation.
     * 
     * @type {string[]}
     */
    IMAGES_HURT;


    /**
     * Image paths for death animation.
     * 
     * @type {string[]}
     */
    IMAGES_DEAD;

    
    /**
     * Creates a new EndbossImg instance containing all animation states.
     * 
     * @param {string[]} walking - Image paths for walking animation.
     * @param {string[]} alert - Image paths for alert animation.
     * @param {string[]} attack - Image paths for attack animation.
     * @param {string[]} hurt - Image paths for hurt animation.
     * @param {string[]} daed - Image paths for dead animation.
     */
    constructor (walking, alert, attack, hurt, dead,) {
        this.IMAGES_WALKING = walking;
        this.IMAGES_ALERT = alert;
        this.IMAGES_ATTACK = attack;
        this.IMAGES_HURT = hurt;
        this.IMAGES_DEAD = dead;
    }
}