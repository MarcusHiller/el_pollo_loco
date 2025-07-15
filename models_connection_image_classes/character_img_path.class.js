class CharakterImg {

    IMAGES_WALKING;
    IMAGES_JUMPING;
    IMAGES_HURT;
    IMAGES_DEAD;
    IMAGES_IDLE_SHORT;
    IMAGES_IDLE_LONG;
    IMAGES_FALLS;
    
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