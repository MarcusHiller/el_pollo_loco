class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    throwableObjects = [new ThrowableObject()];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(this.draw.bind(this));
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImg(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);
        movableObject.drawFrameInside(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImgBack(movableObject);
        }
    }

    addObjectsToMap(movableObject) {
        movableObject.forEach(object => {
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


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 40);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isHurt) return;
                let overlapX = Math.min(this.character.x + this.character.width, enemy.x + enemy.width) - Math.max(this.character.x, enemy.x);
                let overlapY = Math.min(this.character.y + this.character.height, enemy.y + enemy.height) - Math.max(this.character.y, enemy.y);
                if (overlapX < overlapY || this.character.speedY >= 0) {
                    this.character.injuryProcess();
                    //this.character.hurt();
                    this.statusBar.setPercentage(this.character.energy);
                } else if (overlapX > overlapY && !this.character.isAboveGround()) {
                    this.character.injuryProcess();
                    //this.character.hurt();
                    this.statusBar.setPercentage(this.character.energy);
                }
                else if (overlapX > overlapY || this.character.speedY < 0) {
                    enemy.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                    setTimeout(() => {
                        console.log(this.level.enemies);
                        this.level.enemies.splice(index, 1);
                    }, 500);
                }
            }
        })
    };


    checkThrowObjects() {
        if (this.keyboard.d) {
            let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right, this.character.y + this.character.offset.top);
            this.throwableObjects.push(bottle);
        }
    }
}