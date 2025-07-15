/**
 * Base class for all drawable objects in the game.
 * Manages image loading, rendering, and optional debug hitboxes.
 */
class DrawableObject {

    /** @type {HTMLImageElement} The currently displayed image */
    img;


    /** @type {Object<string, HTMLImageElement>} Cache of preloaded images by path */
    imageCache = {};


    /** @type {number} Horizontal position on canvas */
    x;


    /** @type {number} Vertical position on canvas */
    y;


    /** @type {number} Object height */
    height;


    /** @type {number} Object width */
    width;


    /** @type {number} Current animation frame index */
    currentImage = 0;


    /** @type {boolean} Whether object is collected (used for coins/bottles) */
    collected;


    /** @type {string} Identifier for object type (e.g. "coin", "bottle") */
    object;


    /**
     * Loads a single image and assigns it to the `img` property.
     * @param {string} path - Path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads an array of image paths and stores them in `imageCache`.
     * @param {string[]} array - Array of image paths.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the current image on the canvas at the object's position.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draws a green border around the object (used for debugging hitboxes).
     * Only applies to Character, Chicken, or Endboss instances.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

        }
    }

    
    /**
     * Draws a red border inside the object, considering the offset hitbox.
     * Applies to Character, Chicken, Endboss, and SmallChicken instances.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrameInside(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }


    /**
     * Updates the corresponding status bar when an object is collected.
     * Works for instances of Coin or Bottle.
     */
    findCollectedObjects() {
        if (this instanceof Coin) {
            let coinBar = world.getStatusbarByType('COINS');
            coinBar?.setPercentage(this.world.character.coin * 5);
        } else if (this instanceof Bottle) {
            let bottleBar = world.getStatusbarByType('BOTTLES');
            bottleBar?.setPercentage(this.world.character.bottle * 10);
        }
    }
}