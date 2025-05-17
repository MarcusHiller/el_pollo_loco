class Character extends MovableObject {

    IMAGES_WALKING = [
        '/img/2_character_pepe/2_walk/W-21.png',
        '/img/2_character_pepe/2_walk/W-22.png',
        '/img/2_character_pepe/2_walk/W-23.png',
        '/img/2_character_pepe/2_walk/W-24.png',
        '/img/2_character_pepe/2_walk/W-25.png',
        '/img/2_character_pepe/2_walk/W-26.png',
    ];
    width = 150;
    height = 350;
    x = 20;
    y = 10;
    speed = 4;
    speedY = 0;
    acceleration = 1;
    world;

    constructor() {
        super().loadImage('/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.right  && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.left && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 20;
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.right || this.world.keyboard.left) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 70);


    }
    junp() {
        console.log("jump");

    }

    idleShort() {
        console.log("sleep short");
    }

    idleLong() {
        console.log("sleep long");
    }

    idleHurt() {
        console.log("Schaden");
    }

    dead() {
        console.log("Gestorben");

    }
}