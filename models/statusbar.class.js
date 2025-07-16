/**
 * Represents a status bar (health, boss, coins, bottles) displayed on the screen.
 * Inherits from DrawableObject.
 */
class Statusbar extends DrawableObject{

    /**
     * Current percentage value (e.g. 100 = full).
     * @type {number}
     */
    percentage = 100;


    /**
     * The type of status bar (e.g. 'HEALTH', 'ENDBOSS', 'COINS', 'BOTTLES').
     * @type {string}
     */
    type;


    /**
     * An array of image paths representing the visual states for each percentage level.
     * Expected to have 6 images (0% to 100%).
     * @type {string[]}
     */
    imageSources;


    /**
     * Creates a new Statusbar instance.
     * @param {string} type - The type of the status bar.
     * @param {number} x - The horizontal position.
     * @param {number} y - The vertical position.
     * @param {Object.<string, string[]>} imageSources - An object mapping types to image arrays.
     */
    constructor(type, x, y, imageSources) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 50;
        this.imageSources = imageSources['IMAGES_' + type];
        this.loadImages(this.imageSources);
        this.setStartPercentForObjects();
    }
    

    /**
     * Sets the percentage value of the status bar and updates the displayed image.
     * 
     * @param {number} percentage - The percentage to set (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex(percentage);
        this.loadImage(this.imageSources[index]);
    }


    /**
     * Resolves the correct image index from the percentage.
     * 
     * @param {number} percentage - The current percentage.
     * @returns {number} - Index of the image to use.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 20) return 1;
        return 0;
    }

    
    /**
     * Draws the status bar to the canvas.
     * For 'ENDBOSS', it dynamically positions the bar at top right.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.type === 'ENDBOSS') {
            if (!this.world?.distanceCharacterAndBoss?.()) return;
            this.x = ctx.canvas.width - this.width - 10;
            this.y = 5;
        }
        super.draw(ctx);
    }


    /**
     * Sets the initial percentage based on the type of the status bar.
     * Health and Endboss start at 100%, others at 0%.
     */
    setStartPercentForObjects() {
        if (this.type === 'HEALTH') {
            this.setPercentage(100);
        }
        if (this.type === 'ENDBOSS') {
            this.setPercentage(100);
        }
        if (this.type === 'COINS') {
            this.setPercentage(0);
        }
        if (this.type === 'BOTTLES') {
            this.setPercentage(0);
        }
    }
}