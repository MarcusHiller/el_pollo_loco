class StartScreen {
    constructor() {
        this.background = new DrawableObject();
        this.background.x = 0;
        this.background.y = 0;
        this.background.width = 720;
        this.background.height = 480;
        this.background.loadImage('img/9_intro_outro_screens/start/startscreen_1.png');

        this.buttons = [
            new Button ({ x: 310, y: 190, width: 100, height: 100, text: 'Play', imagePath :'img/icons/play-solid-hell-gray.svg'}),
            new Button ({ x: 650, y: 20, width: 45, height: 45, text: 'Info', imagePath :'img/icons/gear-solid-hell-gray.svg'}),
            new Button ({ x: 335, y: 400, width: 50, height: 65, text: 'Back', imagePath :'img/icons/xmark-solid-hell-gray.svg'})
        ];
    }

    draw(ctx, showHelp) {
        this.background.draw(ctx);

        this.buttons.slice(0, 2).forEach(btn => btn.draw(ctx, btn));

        if (showHelp) {
            ctx.fillStyle = 'rgba(242, 159, 81, 0.95)';
            ctx.fillRect(110, 90, 500, 300);
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.fillText('Hier steht später deine Hilfe...', 100, 150);
            this.buttons[2].draw(ctx);
        }
    }
}