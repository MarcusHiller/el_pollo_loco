class WorldInteraction {

    constructor(world) {
        this.world = world;
    }


    checkCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                this.handleEnemyCollison(enemy);
            }
        })
    };


    handleEnemyCollison(enemy) {
        if (this.world.character.isHurt) return;
        let overlapX = Math.min(this.world.character.x + this.world.character.width, enemy.x + enemy.width) - Math.max(this.world.character.x, enemy.x);
        let overlapY = Math.min(this.world.character.y + this.world.character.height, enemy.y + enemy.height) - Math.max(this.world.character.y, enemy.y);
        if ((overlapX < overlapY || this.world.character.speedY >= 0) && enemy.energy > 0) {
            this.world.character.injuryProcess();
        } else if ((overlapX > overlapY && !this.world.character.isAboveGround()) && enemy.energy > 0) {
            this.world.character.injuryProcess();
        } else if (enemy.name === 'endboss' && enemy.energy > 0) {
            this.world.character.injuryProcess();
        } else if (overlapX > overlapY && this.world.character.speedY < 0) {
            enemy.hitEnemy(enemy);
        }
    }


    checkThrowObjects() {
        if (this.world.keyboard.d && this.world.character.canThrow) {
            if (this.world.character.bottle > 0 && !this.world.character.isThrowDelayActive()) {
                this.objectIsThrown();
            }
        } else if (!this.world.keyboard.d) {
            this.world.character.canThrow = true;
        }
    }


    objectIsThrown() {
        let { x, y, direction } = this.calculateThrowVector();
        let bottle = new ThrowableObject(x, y, direction);
        this.world.throwableObjects.push(bottle);
        this.world.character.bottle--;
        this.world.character.setThrowTime();
        this.world.character.canThrow = false;
    }


    calculateThrowVector() {
        return {
            x: this.world.character.x + this.world.character.offset.right,
            y: this.world.character.y + this.world.character.offset.top,
            direction: this.world.character.otherDirection
        }
    }


    checkCollisionsThrowableObjects() {
        this.world.level.enemies.forEach((enemy) => {
            let collidngBottle = this.world.throwableObjects.find(bottle => bottle.isColliding(enemy));
            if (collidngBottle) {
                this.handleBottleCollisions(enemy, collidngBottle);
            }
        });
    }


    handleBottleCollisions(enemy, collidngBottle) {
        if (enemy.name === 'endboss' && enemy.energy > 0) {
            enemy.injuryProcess();
        } else if (enemy => enemy instanceof SmallChicken) {
            enemy.hitEnemy(enemy);
        }
        else if (enemy => enemy instanceof Chicken) {
            enemy.hitEnemy(enemy);
        }
        collidngBottle.bottleBreaks();
    }


    checkCollisionBottle() {
        this.world.level.bottle.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                if (!bottle.collected) {
                    this.world.character.bottle++;
                    bottle.collected = true;
                    bottle.findCollectedObjects();
                }
            }
        })
    }
}