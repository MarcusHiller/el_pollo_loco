class Endboss extends MovableObject {

    IMAGES = endboss;
    width = 450;
    height = 450;
    y = 10;
    name = 'endboss';
    energy = 100;
    damagePoints = 25;
    damageTime = 1;
    deadAnimationPlayed = false;
    offset = {
        top: 200,
        left: 150,
        right: 85,
        bottom: 120
    }

    constructor() {
        super().loadImage(this.IMAGES.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES.IMAGES_WALKING);
        this.loadImages(this.IMAGES.IMAGES_ALERT);
        this.loadImages(this.IMAGES.IMAGES_ATTACK);
        this.loadImages(this.IMAGES.IMAGES_HURT);
        this.loadImages(this.IMAGES.IMAGES_DEAD);
        this.x = 2400;
        this.speed = 15;
        this.animate();
    }


    animate() {
        this.endbossAnimate = setInterval(() => {
            if (!this.world.distanceCharacterAndBoss()) {
                this.playAnimation(this.IMAGES.IMAGES_ALERT);
            } else if (!this.isHurt() && this.isDead() && !this.deadAnimationPlayed) {
                this.endbossDie();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES.IMAGES_HURT);
            } else if (this.energy <= 75 && this.energy > 50) {
                this.playAnimation(this.IMAGES.IMAGES_ATTACK);
            } else if (!this.hurt) {
                this.walkAnimation();
            }
        }, 110);
    }


    endbossDie() {
        this.deadAnimationPlayed = true;
        clearInterval(this.endbossAnimate);
        this.playAnimationOnce(this.IMAGES.IMAGES_DEAD, 50);
        this.loadImage(this.IMAGES.IMAGES_DEAD[2]);
    }


    walkAnimation() {
        this.playAnimation(this.IMAGES.IMAGES_WALKING);
        this.moveLeft();
    }
}


