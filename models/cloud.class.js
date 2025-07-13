class Cloud extends MovableObject {
    
    constructor(imagePath, y, speed, offset) {
        super().loadImage(imagePath);
        this.x = offset + (Math.random() * 1500);
        this.y = y;
        this.height = 200;
        this.width = 450;
        this.speed = speed;
        this.animate();
    }

    animate() {
        this.cloudAnimate = setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
    }
}