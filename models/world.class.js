class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(this.draw.bind(this));
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImg(movableObject);
        }
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
        if (movableObject.otherDirection) {
            this.flipImgBack(movableObject);
        }
    }

    addObjectsToMap(arrayObjects) {
        arrayObjects.forEach(object => {
            this.addToMap(object);
        });
    }


    flipImg(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImgBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}