class EndScreen {
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
            { x: 260, y: 220, width: 200, height: 50, text: 'Neustarten' },
            { x: 260, y: 300, width: 200, height: 40, text: 'Beenden' }
        ];
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
        this.buttons.forEach(btn => drawButton(ctx, btn));
    }
}