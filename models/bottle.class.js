/**
 * Represents a collectible bottle object in the game.
 * Inherits rendering functionality from DrawableObject.
 */
class Bottle extends DrawableObject {

    /**
     * Collision offset for fine-tuning the hitbox.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        };
    
        
    /**
     * Creates a new bottle at a randomized horizontal position.
     * @param {string} imagePath - Path to the bottle image.
     * @param {number} x - Max range for random horizontal offset.
     * @param {number} y - Vertical position.
     * @param {number} height - Height of the object.
     * @param {number} width - Width of the object.
     * @param {boolean} collected - Boolean statement as to whether the bottle was collected.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = 300 + Math.random() * x;
        this.y = y;
        this.height = 90;
        this.width = 90;
        this.collected = false;
    }
}