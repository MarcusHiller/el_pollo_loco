class ScreenManager {
    constructor() {
        this.startScreen = new StartScreen();
        this.wonScreen = new EndScreen([
            'img/5_background/layers/air.png',
            'img/5_background/layers/3_third_layer/2.png',
            'img/5_background/layers/2_second_layer/2.png',
            'img/5_background/layers/1_first_layer/2.png',
            'img/You won, you lost/You won A.png'
        ]);

        this.lostScreen = new EndScreen([
            'img/5_background/layers/air.png',
            'img/5_background/layers/3_third_layer/2.png',
            'img/5_background/layers/2_second_layer/2.png',
            'img/5_background/layers/1_first_layer/2.png',
            'img/You won, you lost/Game Over.png'
        ]);
    }

    draw(ctx, gameState, showHelp) {
        if (gameState === 'start') {
            this.startScreen.draw(ctx, showHelp);
        } else if (gameState === 'end-won') {
            this.wonScreen.draw(ctx);
        } else if (gameState === 'end-lose') {
            this.lostScreen.draw(ctx);
        }
    }

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

