class World {

    animationFrameID;
    isBreak;

    constructor(canvas, keyboard, uiController) {
        this.interactions = new WorldInteraction(this);
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.uiController = uiController;
        this.character = new Character();
        this.level = createLevel1();
        this.fixedObjects = stationaryObjects();
        this.throwableObjects = [];
        this.camera_x = 0;
        this.draw();
        this.setWorld();
        this.run();
        this.deleteDeadEnemies();
    }


    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.throwableObjects.forEach(bottle => bottle.world = this);
        this.fixedObjects.statusBar.forEach(bar => bar.world = this);
        this.fixedObjects.button.forEach(bar => bar.world = this);
        this.level.coin.forEach(coin => coin.world = this);
        this.level.bottle.forEach(bottle => bottle.world = this);
    }


    draw() {
        if (typeof gameState !== 'undefined' && gameState === 'end') {
            return;
        }
        this.ctx.save();
        this.ctx.scale(canvas.width / 720, canvas.height / 480);
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.addLevelObjectsToMap();
        this.addObjectsToMap(this.fixedObjects.statusBar);
        this.addObjectsToMap(this.fixedObjects.button);
        this.addGameplayObjectsToMap();
        this.animationFrameID = requestAnimationFrame(this.draw.bind(this));
        this.ctx.restore();
    }


    addLevelObjectsToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coin);
        this.ctx.translate(-this.camera_x, 0);
    }


    addGameplayObjectsToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    stopDrawing() {
        if (this.animationFrameID) {
            cancelAnimationFrame(this.animationFrameID);
        }
    }


    clearRunIntervall() {
        clearInterval(this.gameInterval);
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
        this.gameInterval = setInterval(() => {
            if (gameState === 'end') return;
            this.checkInteraktions();
            this.cleanInteraktions();
        }, 40);
    }


    checkInteraktions() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkCollisionsThrowableObjects();
        this.checkCollisionBottle();
        this.checkCollisionCoin();
        this.checkGameOver();
    }


    cleanInteraktions() {
        this.deleteDeadEnemies();
        this.cleanUpBottlesThrownBottles();
        this.cleanUpBottlesCollectedBottles();
        this.cleanUpCollectedCoin();
        this.updateBotlleStatusbar();
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.handleEnemyCollison(enemy);
            }
        })
    };


    handleEnemyCollison(enemy) {
        if (this.character.isHurt) return;
        let overlapX = Math.min(this.character.x + this.character.width, enemy.x + enemy.width) - Math.max(this.character.x, enemy.x);
        let overlapY = Math.min(this.character.y + this.character.height, enemy.y + enemy.height) - Math.max(this.character.y, enemy.y);
        if ((overlapX < overlapY || this.character.speedY >= 0) && enemy.energy > 0) {
            this.character.injuryProcess();
        } else if ((overlapX > overlapY && !this.character.isAboveGround()) && enemy.energy > 0) {
            this.character.injuryProcess();
        } else if (enemy.name === 'endboss' && enemy.energy > 0) {
            this.character.injuryProcess();
        } else if (overlapX > overlapY && this.character.speedY < 0) {
            enemy.hitEnemy(enemy);
        }
    }


    checkCollisionsThrowableObjects() {
        this.level.enemies.forEach((enemy) => {
            let collidngBottle = this.throwableObjects.find(bottle => bottle.isColliding(enemy));
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


    checkThrowObjects() {
        if (this.keyboard.d && this.character.canThrow) {
            if (this.character.bottle > 0 && !this.character.isThrowDelayActive()) {
                let bottle = new ThrowableObject(this.character.x + this.character.offset.right, this.character.y + this.character.offset.top, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.character.bottle--;
                this.character.setThrowTime();
                this.character.canThrow = false;
            }
        } else if (!this.keyboard.d) {
            this.character.canThrow = true;
        }
    }


    cleanUpBottlesThrownBottles() {
        this.throwableObjects = this.throwableObjects.filter(b => !b.markForRemoval);
    }


    checkCollisionBottle() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (!bottle.collected) {
                    this.character.bottle++;
                    bottle.collected = true;
                    bottle.findCollectedObjects();
                }
            }
        })
    }


    cleanUpBottlesCollectedBottles() {
        this.level.bottle = this.level.bottle.filter(b => !b.collected);
    }


    checkCollisionCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (!coin.collected) {
                    this.character.coin++;
                    coin.collected = true;
                    coin.findCollectedObjects();
                }
            }
        })
    }


    cleanUpCollectedCoin() {
        this.level.coin = this.level.coin.filter(c => !c.collected);
    }


    deleteDeadEnemies() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            if (this.level.enemies[i].energy == 0) {
                if (!this.level.enemies[i].ishurt() && (this.level.enemies[i].name === 'normal_chicken' || this.level.enemies[i].name === 'small_chicken')) {
                    this.level.enemies.splice(i, 1);
                }
            }
        }
    }


    getStatusbarByType(type) {
        return this.fixedObjects.statusBar.find(bar => bar.type === type);
    }


    drawEndbossBar() {
        if (this.distanceCharacterAndBoss()) {
            this.ctx.translate(-this.camera_x, 0);
            this.statusBarEndboss.x = canvas.width - this.statusBarEndboss.width - 10;
            this.addToMap(this.statusBarEndboss);
            this.ctx.translate(this.camera_x, 0);
        }
    }


    distanceCharacterAndBoss() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        let distanceToBoss = endboss.x - this.character.x;
        return distanceToBoss < 600;
    }


    updateBotlleStatusbar() {
        let amountBottles = this.character.bottle
        let bottleBar = this.getStatusbarByType('BOTTLES');
        bottleBar?.setPercentage(amountBottles * 10);
    }


    checkGameOver() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (this.character.energy <= 0) {
            setTimeout(() => {
                this.stopDrawing();
                this.endGame(false);
            }, 1000);
        } else if (endboss.energy <= 0) {
            setTimeout(() => {
                this.stopDrawing();
                this.endGame(true);
            }, 3100);
        }
    }


    getButtons() {
        return this.fixedObjects.button || [];
    }


    toggleBreak() {
        this.isBreak ? this.gamePlay() : this.gameStop();
    }


    gameStop() {
        this.clearRunIntervall();
        this.stopCharacterIntervall();
        this.stopEnemieIntervall();
        this.stopCloudsIntervall();
        cancelAnimationFrame(this.animationFrameID);
        this.setStatusBreak();
        this.uiController.stopBackgroundMusic();
        this.endGame = () => { };
    }


    gamePlay() {
        this.startCharacterIntervall();
        this.startEnemieIntervall();
        this.startCloudsIntervall();
        this.draw();
        this.setStatusPlay();
        uiController.playBackgroundMusic();
    }


    setStatusBreak() {
        this.isBreak = true;
        this.updatePauseButtonImage('play');
    }


    setStatusPlay() {
        this.isBreak = false;
        this.updatePauseButtonImage('pause');
    }


    stopCharacterIntervall() {
        clearInterval(this.character.keyMovements);
        clearInterval(this.character.characterAnimation);
        this.clearRunIntervall();
    }


    stopEnemieIntervall() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                clearInterval(enemy.chickenIntervallX);
                clearInterval(enemy.chickenWalk);
            } else if (enemy instanceof Endboss) {
                clearInterval(enemy.endbossAnimate);
            }
        });
    }


    stopCloudsIntervall() {
        this.level.clouds.forEach(cloud => {
            clearInterval(cloud.cloudAnimate);
        });
    }


    startCharacterIntervall() {
        this.character.animateKeyOptions();
        this.character.characterInteraction();
        this.character.setTimeLastAction();
        this.run();
    }


    startEnemieIntervall() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                enemy.animateChicken(enemy.IMAGES.NORMAL_CHICKEN_WALKING, 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            }
            if (enemy instanceof SmallChicken) {
                enemy.animateChicken(enemy.IMAGES.SMALL_CHICKEN_WALKING, 'img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            }
            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });
    }


    startCloudsIntervall() {
        this.level.clouds.forEach(cloud => {
            clearInterval(cloud.animate());
        });
    }


    toggleSound() {
        this.uiController.toggleSound(this.fixedObjects.button);
    }


    updatePauseButtonImage(state) {
        let btn = this.fixedObjects.button.find(b => b.action === 'Break' || b.action === 'Play');
        btn.imagePath = state === 'play' ? 'img/icons/play-solid-hell-gray.svg' : 'img/icons/pause-solid-hell-gray.svg';
        btn.loadImage(btn.imagePath);
    }
}