class Endboss extends MovableObject {

    IMAGES = endboss;
    width = 450;
    height = 450;
    y = 10;
    name = 'endboss';
    energy = 100;
    damagePoints = 25;
    damageTime = 1.75;
    deadAnimationPlayed = false;
    offset = {
        top: 180,
        left: 110,
        right: 65,
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
        this.speed = 13;
        this.animate();
    }


    animate() {
        this.endbossAnimate = setInterval(() => {
            if (!this.world.distanceCharacterAndBoss()) {
                this.playAnimation(this.IMAGES.IMAGES_ALERT);
            } else if (!this.ishurt() && this.isDead() && !this.deadAnimationPlayed) {
                this.deadAnimationPlayed = true; 
                clearInterval(this.endbossAnimate);
                this.playAnimationOnce(this.IMAGES.IMAGES_DEAD, 50);
                this.loadImage(this.IMAGES.IMAGES_DEAD[2]);  
            } else if(this.ishurt()) {
                this.playAnimation(this.IMAGES.IMAGES_HURT);
            } else if (this.energy <= 75 && this.energy >50) {
                this.playAnimation(this.IMAGES.IMAGES_ATTACK);
            } else if(!this.hurt) {
                this.playAnimation(this.IMAGES.IMAGES_WALKING);
                this.moveLeft();
            }
        }, 110);
    }
} 


