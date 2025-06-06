class CharakterImg {

    IMAGES_WALKING;
    IMAGES_JUMPING;
    IMAGES_HURT;
    IMAGES_DEAD;
    IMAGES_IDLE_SHORT;
    IMAGES_IDLE_LONG;
    
    constructor (walking, jumping, hurt, IMAGES_DEAD, idleShort, idleLong) {
        this.IMAGES_WALKING = walking;
        this.IMAGES_JUMPING = jumping;
        this.IMAGES_HURT = hurt;
        this.IMAGES_DEAD = IMAGES_DEAD;
        this.IMAGES_IDLE_SHORT = idleShort;
        this.IMAGES_IDLE_LONG = idleLong;
    }
}