class World {

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png'),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png'),
        
    ];
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
        new Cloud(),
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        requestAnimationFrame(this.draw.bind(this));
    }

    addToMap(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }

    addObjectsToMap(arrayObjects) {
        arrayObjects.forEach(object => {
            this.addToMap(object);
        });
    }
}