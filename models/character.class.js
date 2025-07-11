class Character extends MovableObject {

    IMAGES = pepe;
    name = 'pepe'
    width = 100;
    height = 250;
    x = 10;
    y = 175;
    speed = 6;
    speedY = 0;
    jump = false;
    falls = false;
    energy = 100;
    pepeDead = false;
    acceleration = 1;
    damagePoints = 20;
    damageTime = 1;
    bottle = 0;
    coin = 0;
    timeLastThrow;
    throwDelay = 0.8;
    canThrow = true;
    lastAction;
    world;
    offset = {
        top: 100,
        left: 30,
        right: 25,
        bottom: 12
    };

    constructor() {
        super().loadImage('img/2_character_pepe/3_jump/J-31.png');
        this.loadImages(this.IMAGES.IMAGES_WALKING);
        this.loadImages(this.IMAGES.IMAGES_JUMPING);
        this.loadImages(this.IMAGES.IMAGES_HURT);
        this.loadImages(this.IMAGES.IMAGES_DEAD);
        this.loadImages(this.IMAGES.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES.IMAGES_IDLE_LONG);
        this.animateKeyOptions();
        this.characterInteraction();
        this.setTimeLastAction();
        this.applyGravity();
        this.setThrowTime();
    }

    animateKeyOptions() {
        this.keyMovements = setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.moveJump();
            }

            if (this.world.keyboard.d && this.idle()) {
                this.setTimeLastAction();
            }

            this.world.camera_x = -this.x + 20;
        }, 1000 / 60);
    }


    characterInteraction() {
        this.characterAnimation = setInterval(() => {
            if (this.isDead()) {
                clearInterval(this.characterAnimation);
                this.pepeDead = true;
                this.playAnimationOnce(this.IMAGES.IMAGES_DEAD, 130);
            } else if (this.ishurt()) {
                this.playAnimation(this.IMAGES.IMAGES_HURT);
                this.setTimeLastAction();
            } else if (this.isAboveGround()) {
                if (this.speedY >= 0 && !this.jump) {
                    this.playAnimationOnce(this.IMAGES.IMAGES_JUMPINGGG, 30);
                    this.falls = false;
                    this.jump = true;
                } else if (this.speedY < 0 && !this.falls) {
                    this.playAnimationOnce(this.IMAGES.IMAGES_FALLS, 150);
                    this.jump = false;
                    this.falls = true;
                    this.setTimeLastAction();
                }
            } else if (this.world.keyboard.right || this.world.keyboard.left) {
                this.playAnimation(this.IMAGES.IMAGES_WALKING);
                this.setTimeLastAction();
            } else if (!this.idle()) {
                this.loadImage('img/2_character_pepe/3_jump/J-31.png');
            }
        }, 70);
    }


    idleShort() {
        let timepassed = new Date().getTime() - this.lastAction;
        timepassed = timepassed / 1000;
        return timepassed > 5 && timepassed <= 10;
    }


    idleLong() {
        let timepassed = new Date().getTime() - this.lastAction;
        timepassed = timepassed / 1000;
        return timepassed > 10
    }


    idle() {
        if (this.idleShort()) {
            this.playAnimation(this.IMAGES.IMAGES_IDLE_SHORT);
            return true;
        } else if (this.idleLong()) {
            this.playAnimation(this.IMAGES.IMAGES_IDLE_LONG);
            return true;
        }
        return false;
    }


    setTimeLastAction() {
        this.lastAction = new Date().getTime();
    }


    setThrowTime() {
        this.timeLastThrow = new Date().getTime();
    }


    isThrowDelayActive() {
        let timepassed = new Date().getTime() - this.timeLastThrow;
        timepassed = timepassed / 1000;
        return timepassed < this.throwDelay;
    }
}