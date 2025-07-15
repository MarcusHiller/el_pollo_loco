/**
 * Represents a background cloud object that moves slowly across the screen.
 * Inherits from MovableObject.
 */
class Cloud extends MovableObject {
    
    /**
     * Creates a new Cloud object with random X offset.
     * @param {string} imagePath - Path to the cloud image.
     * @param {number} y - Vertical position.
     * @param {number} speed - Horizontal movement speed.
     * @param {number} offset - Horizontal start offset (randomized).
     */
    constructor(imagePath, y, speed, offset) {
        super();
        this.loadImage(imagePath);
        this.x = offset + (Math.random() * 1500);
        this.y = y;
        this.height = 200;
        this.width = 450;
        this.speed = speed;
        this.animate();
    }


    /**
     * Starts interval to continuously move the cloud to the left.
     */
    animate() {
        this.cloudAnimate = setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
    }
}