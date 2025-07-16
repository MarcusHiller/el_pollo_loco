/**
 * Container class for chicken animation image paths.
 */
class ChickenImg {

    /**
     * Image paths for normal chicken walking animation.
     * 
     * @type {string[]}
     */
    NORMAL_CHICKEN_WALKING;


    /**
     * Image paths for small chicken walking animation.
     * 
     * @type {string[]}
     */
    SMALL_CHICKEN_WALKING;
    

    /**
     * Creates a new ChickenImg instance with walking animations for both chicken types.
     * 
     * @param {string[]} normalChicken - Image paths for normal chicken walking.
     * @param {string[]} smallChicken - Image paths for small chicken walking.
     */
    constructor (normalChicken, smallChicken) {
        this.NORMAL_CHICKEN_WALKING = normalChicken;
        this.SMALL_CHICKEN_WALKING = smallChicken;
    }
}