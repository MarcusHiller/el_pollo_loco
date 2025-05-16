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
    
    constructor() {
        super().loadImage('/img/2_character_pepe/2_walk/W-21.png');
        this.x = 10;
        this.loadImages(this.IMAGES_WALKING);
        

    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[index];
            this.img = this.imageCache[path];
            this.currentImage++;
            
        }, 150);


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