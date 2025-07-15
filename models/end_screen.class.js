/**
 * Class representing the final screen (e.g. game over or win).
 * Draws a background and UI buttons for actions like restart or exit.
 */
class EndScreen {
    
    /**
     * Initializes the end screen with background layers and control buttons.
     * 
     * @param {string[]} imagePaths - Array of image paths for background layers.
     */
    constructor(imagePaths) {
        this.layers = imagePaths.map(path => {
            let obj = new DrawableObject();
            obj.x = 0;
            obj.y = 0;
            obj.width = 720;
            obj.height = 480;
            obj.loadImage(path);
            return obj;
        });
        this.buttons = [
            new Button({ x: 60, y: 10, width: 35, height: 35, text: 'Restart', action: 'Restart', imagePath: 'img/icons/rotate-right-solid-hell-gray.svg' }),
            new Button({ x: 10, y: 10, width: 35, height: 35, text: 'End', action: 'End', imagePath: 'img/icons/arrow-right-to-bracket-solid-hell-gray.svg' }),
            new Button({ x: 675, y: 10, width: 35, height: 35, text: 'Full', action: 'Screen', imagePath: 'img/icons/expand-solid-hell-gray.svg' }),
        ];
    }


    /**
     * Renders all background layers and buttons on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
        this.buttons.forEach(btn => btn.draw(ctx));
    }
}