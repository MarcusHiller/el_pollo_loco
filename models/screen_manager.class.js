/**
 * Manages and renders different UI screens (start, win, lose) based on the current game state.
 */
class ScreenManager {

    /**
     * Initializes the start screen, win screen, and lose screen.
     * Each screen has its own background layers and image.
     */
    constructor() {
        this.startScreen = new StartScreen();


        /**
         * Screen shown when the player wins the game.
         * 
         * @type {EndScreen}
         */
        this.wonScreen = new EndScreen([
            'img/5_background/layers/air.png',
            'img/5_background/layers/3_third_layer/2.png',
            'img/5_background/layers/2_second_layer/2.png',
            'img/5_background/layers/1_first_layer/2.png',
            'img/You won, you lost/You won A.png'
        ]);


        /**
         * Screen shown when the player loses the game.
         * @type {EndScreen}
         */
        this.lostScreen = new EndScreen([
            'img/5_background/layers/air.png',
            'img/5_background/layers/3_third_layer/2.png',
            'img/5_background/layers/2_second_layer/2.png',
            'img/5_background/layers/1_first_layer/2.png',
            'img/You won, you lost/Game Over.png'
        ]);
    }


    
    /**
     * Draws the appropriate screen depending on the current game state.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {string} gameState - The current state of the game ('start', 'end-won', 'end-lose').
     * @param {boolean} showHelp - Whether the help screen should be shown on the start screen.
     */
    draw(ctx, gameState, showHelp) {
        if (gameState === 'start') {
            this.startScreen.draw(ctx, showHelp);
        } else if (gameState === 'end-won') {
            this.wonScreen.draw(ctx);
        } else if (gameState === 'end-lose') {
            this.lostScreen.draw(ctx);
        }
    }


    /**
     * Returns the set of buttons currently active based on the game state.
     * 
     * @param {string} gameState - The current state of the game ('start', 'end-won', 'end-lose').
     * @param {boolean} showHelp - If true, only the help button is returned on the start screen.
     * @returns {Object[]} Array of active button objects for the given state.
     */
    getButtons(gameState, showHelp) {
        if (gameState === 'start') {
            return showHelp ? this.startScreen.buttons.slice(this.startScreen.buttons.length -1) : this.startScreen.buttons.slice(0, this.startScreen.buttons.length -1);
        } else if (gameState === 'end-won') {
            return this.wonScreen.buttons;
        } else if (gameState === 'end-lose') {
            return this.lostScreen.buttons;
        }
        return [];
    }
}