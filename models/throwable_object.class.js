class ThrowableObject extends MovableObject {

    width = 60;
    height = 70;
    bottleBroken = false;
    markForRemoval = false;
    world;
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
    }

    /* throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += 15;
                this.playAnimation(this.IMAGES_BOTTLE);
            } else {
                if (this.playAnimationOnce(this.IMAGES_SPLASH)) {
                    console.log("Bottle Damage");

                    return;
                }
                //this.playAnimationOnce(this.IMAGES_SPLACH);
            }

        }, 60);
    } */


    throw() {
        this.speedY = 18;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.isAboveGround()) {
                this.x += 18;
                this.playAnimation(this.IMAGES_BOTTLE);
            } else if (!this.bottleBroken) {
                this.bottleBreaks();
            }
        }, 60);
    }


    bottleBreaks() {
            clearInterval(this.throwInterval);
            this.bottleBroken = true;
            this.playAnimationOnce(this.IMAGES_SPLASH);
            this.markerForDelete();
    }


    markerForDelete() {
        setTimeout(() => {
            this.markForRemoval = true;
        }, 440);
    }

}