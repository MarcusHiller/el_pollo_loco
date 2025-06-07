class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBars = [new Statusbar('HEALTH', 5, 5, statusbarImages), new Statusbar('ENDBOSS', 0, 5, statusbarImages)];
    throwableObjects = [new ThrowableObject()];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

        this.run();
        this.deleteDeadEnemies();
    }


    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.throwableObjects.forEach(bottle => bottle.world = this);
        this.statusBars.forEach(bar => bar.world = this);
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottle);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.statusBars);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

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
            this.deleteDeadEnemies();
            this.cleanUpBottles();
            this.checkCollisionsThrowableObjects();
        }, 40);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isHurt) return;
                let overlapX = Math.min(this.character.x + this.character.width, enemy.x + enemy.width) - Math.max(this.character.x, enemy.x);
                let overlapY = Math.min(this.character.y + this.character.height, enemy.y + enemy.height) - Math.max(this.character.y, enemy.y);
                if ((overlapX < overlapY || this.character.speedY >= 0) && enemy.energy > 0) {
                    this.character.injuryProcess();
                } else if ((overlapX > overlapY && !this.character.isAboveGround()) && enemy.energy > 0) {
                    this.character.injuryProcess();
                } else if (enemy.name === 'endboss' && enemy.energy > 0) {
                    this.character.injuryProcess();
                } else if ((overlapX > overlapY || this.character.speedY < 0) && enemy.energy > 0) {
                    enemy.hitEnemy(enemy);
                }
            }
        })
    };


    checkCollisionsThrowableObjects() {
        this.level.enemies.forEach((enemy) => {
            let collidngBottle = this.throwableObjects.find(bottle => bottle.isColliding(enemy));
            if (collidngBottle) {
                console.log(enemy);
                if (enemy.name === 'endboss' && enemy.energy > 0) {
                    enemy.injuryProcess();
                }
                collidngBottle.bottleBreaks();
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.d && this.character.canThrow) {
            if (this.character.bottle > 0 && !this.character.isThrowDelayActive()) {
                let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right, this.character.y + this.character.offset.top);
                this.throwableObjects.push(bottle);
                this.character.bottle--;
                this.character.setThrowTime();
                this.character.canThrow = false;
            }
        } else if (!this.keyboard.d) {
            this.character.canThrow = true;
        }
    }


    cleanUpBottles() {
        this.throwableObjects = this.throwableObjects.filter(b => !b.markForRemoval);
    }


    deleteDeadEnemies() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            if (this.level.enemies[i].energy == 0) {
                if (!this.level.enemies[i].ishurt() && this.level.enemies[i].name === 'normal_chicken') {
                    this.level.enemies.splice(i, 1);
                }
            }
        }
    }


    getStatusbarByType(type) {
        return this.statusBars.find(bar => bar.type === type);
    }


    drawEndbossBar() {
        if (this.shouldShowEndbossBar()) {
            this.ctx.translate(-this.camera_x, 0);
            this.statusBarEndboss.x = canvas.width - this.statusBarEndboss.width - 10;
            this.addToMap(this.statusBarEndboss);
            this.ctx.translate(this.camera_x, 0);
        }
    }


    shouldShowEndbossBar() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        let distanceToBoss = endboss.x - this.character.x;
        return distanceToBoss < 600;
    }
}