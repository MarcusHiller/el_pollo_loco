/**
 * Represents a clickable button element, which can be drawn with an image or fallback design.
 * Inherits rendering capabilities from DrawableObject.
 */
class Button extends DrawableObject {

    /**
     * Creates a new Button instance.
     * @param {Object} config - Button configuration object.
     * @param {number} config.x - Horizontal position of the button.
     * @param {number} config.y - Vertical position of the button.
     * @param {number} config.width - Width of the button.
     * @param {number} config.height - Height of the button.
     * @param {string} [config.text=''] - Optional text to display on fallback button.
     * @param {string} [config.action=''] - Identifier or type of the button action.
     * @param {string} [config.imagePath=''] - Optional path to the button image.
     * @param {Function|null} [config.onClick=null] - Optional click handler function.
     */
    constructor({ x, y, width, height, text = '', action = '', imagePath = '', onClick = null }) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.action = action;
        this.onClick = onClick;
        this.isPictureAvailable(imagePath);
    }


    /**
     * Loads an image if the given path is not empty.
     * @param {string} imagePath - Image path to check and load.
     */
    isPictureAvailable(imagePath) {
        if (imagePath) {
            this.loadImage(imagePath);
        }
    }


    /**
     * Draws the button to the canvas, either with image or fallback rendering.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    draw() {
        if (this.img) {
            this.imgButton();
        } else {
            replacementButton();
        }
    }

    
    /**
     * Draws the image-based button and a red border.
     */
    imgButton() {
        super.draw(ctx);
    }


    /**
     * Draws a fallback button using plain canvas styling and text.
     */
    replacementButton() {
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + 28);
    }


    /**
     * Determines if a given mouse position lies within the button boundaries.
     * @param {number} mouseX - X-coordinate of the mouse.
     * @param {number} mouseY - Y-coordinate of the mouse.
     * @returns {boolean} True if the mouse position is inside the button.
     */
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.height;
    }
}