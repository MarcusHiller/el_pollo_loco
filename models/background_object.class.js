/**
 * Represents a background layer in the game world.
 * Inherits movement logic from MovableObject.
 */
class BackgroundObject extends MovableObject {
    
    /**
     * Creates a new background object with image and position.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background.
     * @param {number} width - Width of the object.
     * @param {number} height - Height of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
    

    /**
     * Loads an image and sets it as this.img.
     * @param {string} path - Image file path.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}