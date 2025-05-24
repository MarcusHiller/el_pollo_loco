class Chicken extends MovableObject {

    width = 75;
    height = 75;
    y = 355;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }
    IMAGES_WALKING = [
        '/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    
    constructor() {
        super().loadImage('/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 250 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
        
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);   
        }, 150);
    }


    eat() {
        console.log("eat");

    }
}