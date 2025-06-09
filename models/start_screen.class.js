class StartScreen {
    constructor() {
        this.background = new DrawableObject();
        this.background.x = 0;
        this.background.y = 0;
        this.background.width = 720;
        this.background.height = 480;
        this.background.loadImage('img/9_intro_outro_screens/start/startscreen_1.png');

        this.buttons = [
            { x: 260, y: 220, width: 200, height: 50, text: 'Spiel starten' },
            { x: 260, y: 290, width: 200, height: 40, text: 'Hilfe' },
            { x: 260, y: 340, width: 200, height: 40, text: 'Zurück' }
        ];
    }

    draw(ctx, showHelp) {
        this.background.draw(ctx);

        this.buttons.slice(0, 2).forEach(btn => drawButton(ctx, btn));

        if (showHelp) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(50, 50, 500, 300);
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.fillText('Hier steht später deine Hilfe...', 100, 150);
            drawButton(ctx, this.buttons[2]);
        }
    }
}