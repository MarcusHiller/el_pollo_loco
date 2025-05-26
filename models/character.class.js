class Character extends MovableObject {

    /* IMAGES_WALKING = [
        '/img/2_character_pepe/2_walk/W-21.png',
        '/img/2_character_pepe/2_walk/W-22.png',
        '/img/2_character_pepe/2_walk/W-23.png',
        '/img/2_character_pepe/2_walk/W-24.png',
        '/img/2_character_pepe/2_walk/W-25.png',
        '/img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',

    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]; */
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
    world;
    
    offset = {
        top: 100,
        left: 30,
        right: 25,
        bottom: 12
    }

    constructor() {
        super().loadImage('img/2_character_pepe/3_jump/J-31.png');
        /* this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD); */
        this.loadImages(this.IMAGES.IMAGES_WALKING);
        this.loadImages(this.IMAGES.IMAGES_JUMPING);
        this.loadImages(this.IMAGES.IMAGES_HURT);
        this.loadImages(this.IMAGES.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
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
                console.log(this.energy);

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


}