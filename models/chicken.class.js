class Chicken extends MovableObject {

    IMAGES = chicken;
    name = "normal_chicken"
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };
    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.width = 75;
        this.height = 75;
        this.x = 250 + Math.random() * 2000;
        this.y = 355;
        this.speed = 0.15 + Math.random() * 0.4;
        this.energy = 100;
        this.damagePoints = 100;
        this.damageTime = 1.2;
        this.loadImages(this.IMAGES.NORMAL_CHICKEN_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES.NORMAL_CHICKEN_WALKING);
            } else if (this.energy == 0) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            }
        }, 150);
    }
}