class Chicken extends MovableObject {

    width = 75;
    height = 75;
    y = 355;
    energy = 100;
    damagePoints = 100;
    damageTime = 1.2;
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

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
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
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.energy == 0) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            }
               
        }, 150);
    }


    eat() {
        console.log("eat");

    }


    hitEnemy(enemy) {
        enemy.energy = enemy.energy - enemy.damagePoints;
        if (enemy.energy <= 0) {
            enemy.energy = 0;
            this.setHurt();
        }
    }

}