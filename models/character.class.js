class Character extends MovableObject {
    width = 200;
    height = 350;
    y = 85;
    IMAGES_WALKING = [
        '/img/2_character_pepe/2_walk/W-21.png',
        '/img/2_character_pepe/2_walk/W-22.png',
        '/img/2_character_pepe/2_walk/W-23.png',
        '/img/2_character_pepe/2_walk/W-24.png',
        '/img/2_character_pepe/2_walk/W-25.png',
        '/img/2_character_pepe/2_walk/W-26.png',
    ];
    world;

    constructor() {
        super().loadImage('/img/2_character_pepe/2_walk/W-21.png');
        this.x = 20;
        this.speed = 5;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();

    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.right) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.left) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.right || this.world.keyboard.left) {
                let index = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[index];
                this.img = this.imageCache[path];
                this.currentImage++;
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