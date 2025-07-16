/**
 * Manages the start screen with background image and interactive buttons.
 */
class StartScreen {
    
    /**
     * Creates the StartScreen instance with background and UI buttons.
     */
    constructor() {
        this.background = new DrawableObject();
        this.background.x = 0;
        this.background.y = 0;
        this.background.width = 720;
        this.background.height = 480;
        this.background.loadImage('img/9_intro_outro_screens/start/startscreen_1.png');
        this.buttons = [
            new Button({ x: 310, y: 190, width: 100, height: 100, text: 'Play', action: 'Play', imagePath: 'img/icons/play-solid-hell-gray.svg' }),
            new Button({ x: 665, y: 20, width: 35, height: 35, text: 'Info', action: 'Info', imagePath: 'img/icons/info-solid-hell-gray.svg' }),
            new Button({ x: 615, y: 20, width: 35, height: 35, text: 'Full', action: 'Screen', imagePath: 'img/icons/expand-solid-hell-gray.svg' }),
            new Button({ x: 335, y: 400, width: 50, height: 65, text: 'Back', action: 'Back', imagePath: 'img/icons/xmark-solid-hell-gray.svg' }),
        ];
    }


    /**
     * Draws the start screen elements onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas drawing context.
     * @param {boolean} showHelp - Flag to determine if help box should be shown.
     */
    draw(ctx, showHelp) {
        this.background.draw(ctx);
        this.buttons.slice(0, this.buttons.length - 1).forEach(btn => btn.draw(ctx, btn));
        if (showHelp) {
            this.helpBox();
        }
    }


    /**
     * Draws the help box overlay with control instructions.
     */
    helpBox() {
        ctx.fillStyle = 'rgba(242, 159, 81, 0.95)';
        ctx.fillRect(110, 90, 500, 300);
        ctx.fillStyle = '#fff';
        ctx.font = '28px DynaPuff';
        let lines = this.infoBox().split('\n');
        let y = 170;
        for (let line of lines) {
            ctx.fillText(line.trim(), 150, y);
            y += 50;
        }
        this.buttons[this.buttons.length - 1].draw(ctx);
    }


    /**
     * Returns a string with keyboard controls shown in the help box.
     * @returns {string} Instructions as multiline string.
     */
    infoBox() {
        return `left-key  - move left
                right-key - move right
                space-key - jump
                D-key - throw bottle`;
    }
}