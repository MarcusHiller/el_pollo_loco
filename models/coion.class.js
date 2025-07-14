/**
 * Represents a collectible coin object in the game.
 * Inherits rendering functionality from DrawableObject.
 */
class Coin extends DrawableObject {
     
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
     * Creates a new coin at a specific position.
     * @param {string} imagePath - Path to the coin image.
     * @param {number} x - Horizontal offset.
     * @param {number} y - Vertical position.
     * @param {number} height - Height of the object.
     * @param {number} width - Width of the object.
     * @param {boolean} collected - Boolean statement as to whether the coin was collected.
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = 200 + x;
        this.y = y;
        this.height = 110;
        this.width = 110;
        this.collected = false;
    }
}