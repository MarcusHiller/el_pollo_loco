class SmallChicken extends MovableObject {

    IMAGES = chicken;
    name = "small_chicken"
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };
    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.width = 65;
        this.height = 65; 
        this.x = 250 + (Math.random() * 1500);
        this.y = 355;
        this.speed = 0.15 + Math.random() * 0.4;
        this.energy = 100;
        this.damagePoints = 100;
        this.damageTime = 1.2;
        this.loadImages(this.IMAGES.SMALL_CHICKEN_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES.SMALL_CHICKEN_WALKING);
            } else if (this.energy == 0) {
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            }
        }, 150);
    }
}