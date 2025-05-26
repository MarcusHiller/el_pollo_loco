class Character extends MovableObject {

    IMAGES = pepe;
    hero = 'pepe'
    width = 100;
    height = 250;
    x = 10;
    y = 175;
    speed = 6;
    speedY = 0;
    energy = 100;
    acceleration = 1;
    damagePoints = 20;
    damageTime = 1;
    bottle = 10;
    timeLastThrow;
    throwDelay = 0.3;
    canThrow = true;
    world;
    offset = {
        top: 100,
        left: 30,
        right: 25,
        bottom: 12
    }

    constructor() {
        super().loadImage('img/2_character_pepe/3_jump/J-31.png');
        this.loadImages(this.IMAGES.IMAGES_WALKING);
        this.loadImages(this.IMAGES.IMAGES_JUMPING);
        this.loadImages(this.IMAGES.IMAGES_HURT);
        this.loadImages(this.IMAGES.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
        this.setThrowTime();
    }

    animate() {
        setInterval(() => {
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


            this.world.camera_x = -this.x + 20;
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES.IMAGES_DEAD);

            } else if (this.ishurt()) {
                this.playAnimation(this.IMAGES.IMAGES_HURT);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.playAnimation(this.IMAGES.IMAGES_WALKING);
                }
            }
        }, 70);
    }


    idleShort() {
        console.log("sleep short");
    }


    idleLong() {
        console.log("sleep long");
    }


    isDead() {
        return this.energy == 0;
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