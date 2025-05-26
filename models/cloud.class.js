class Cloud extends MovableObject {
    
    
    constructor(imagePath, y, speed) {
        super().loadImage(imagePath);
        this.x = Math.random() * 800;
        this.y = y;
        this.height = 200;
        this.width = 450;
        this.speed = speed;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
    }
}