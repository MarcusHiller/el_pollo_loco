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
            new Button ({ x: 60, y: 10, width: 35, height: 35, text: 'Restart', action: 'Restart', imagePath :'img/icons/rotate-right-solid-hell-gray.svg'}),
            new Button ({ x: 10, y: 10, width: 35, height: 35, text: 'End', action: 'End', imagePath :'img/icons/arrow-right-to-bracket-solid-hell-gray.svg'}),
             new Button ({ x: 275, y: 20, width: 50, height: 65, text: 'Full', action: 'Fullscreen', imagePath :'img/icons/expand-solid-hell-gray.svg'})
        ];
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
        this.buttons.forEach(btn => btn.draw(ctx));
    }
}