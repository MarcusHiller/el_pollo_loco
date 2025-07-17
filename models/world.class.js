/**
 * Represents the entire game world including rendering, logic, and object coordination.
 */
class World {

    /** @type {number} Stores the ID of the current animation frame request (used to cancel drawing). */
    animationFrameID;


    /** @type {boolean} Indicates whether the game is currently paused. */
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


    /**
     * Binds all relevant game objects (character, enemies, bottles, etc.) to the current world instance.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.throwableObjects.forEach(bottle => bottle.world = this);
        this.fixedObjects.statusBar.forEach(bar => bar.world = this);
        this.fixedObjects.button.forEach(bar => bar.world = this);
        this.level.coin.forEach(coin => coin.world = this);
        this.level.bottle.forEach(bottle => bottle.world = this);
    }


    /**
     * Draws the entire game frame by combining level background, objects, character, UI elements, etc.
     * Uses `requestAnimationFrame` for smooth animation.
     */
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


    /**
     * Adds static level elements (background, clouds, collectibles) to the canvas.
     */
    addLevelObjectsToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coin);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Adds gameplay objects (enemies, character, throwable items) to the canvas.
     */
    addGameplayObjectsToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Stops the drawing animation loop using `cancelAnimationFrame`.
     */
    stopDrawing() {
        if (this.animationFrameID) {
            cancelAnimationFrame(this.animationFrameID);
        }
    }


    /**
     * Stops the interval responsible for game logic updates.
     */
    clearRunIntervall() {
        clearInterval(this.gameInterval);
    }


    /**
     * Adds a single movable object to the canvas, handling direction-based flipping and collision frames.
     * 
     * @param {MovableObject} movableObject - The object to draw.
     */
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


    /**
     * Adds a list of movable objects to the canvas.
     * 
     * @param {MovableObject[]} movableObject - Array of objects to draw.
     */
    addObjectsToMap(movableObject) {
        movableObject.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * Flips an image horizontally to simulate movement in the opposite direction.
     * 
     * @param {MovableObject} movableObject - The object whose image is to be flipped.
     */
    flipImg(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    /**
     * Reverses the image flip applied by `flipImg`.
     * @param {MovableObject} movableObject - The object whose image is to be restored.
     */
    flipImgBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }


    /**
     * Starts the game logic update loop with collision and interaction checks.
     */
    run() {
        this.gameInterval = setInterval(() => {
            if (gameState === 'end') return;
            this.checkInteraktions();
            this.cleanInteraktions();
        }, 40);
    }


    /**
     * Performs all collision and interaction checks (enemies, items, game over).
     */
    checkInteraktions() {
        this.interactions.checkCollisions();
        this.interactions.checkThrowObjects();
        this.interactions.checkCollisionsThrowableObjects();
        this.interactions.checkCollisionBottle();
        this.interactions.checkCollisionCoin();
        this.interactions.checkGameOver();
    }


    /**
     * Cleans up unused objects, removes collected items and updates UI.
     */
    cleanInteraktions() {
        this.deleteDeadEnemies();
        this.cleanUpBottlesThrownBottles();
        this.cleanUpBottlesCollectedBottles();
        this.cleanUpCollectedCoin();
        this.updateBottleStatusbar();
    }


    /**
     * Removes bottles that were thrown and are marked for deletion.
     */
    cleanUpBottlesThrownBottles() {
        this.throwableObjects = this.throwableObjects.filter(b => !b.markForRemoval);
    }


    /**
     * Removes collected bottles from the game world.
     */
    cleanUpBottlesCollectedBottles() {
        this.level.bottle = this.level.bottle.filter(b => !b.collected);
    }


    /**
     * Removes collected coins from the game world.
     */
    cleanUpCollectedCoin() {
        this.level.coin = this.level.coin.filter(c => !c.collected);
    }


    /**
     * Deletes defeated enemies that are no longer playing death animation.
     */
    deleteDeadEnemies() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            if (this.level.enemies[i].energy == 0) {
                if (!this.level.enemies[i].isHurt() && (this.level.enemies[i].name === 'normal_chicken' || this.level.enemies[i].name === 'small_chicken')) {
                    this.level.enemies.splice(i, 1);
                }
            }
        }
    }


    /**
     * Returns a status bar object by its type identifier.
     * 
     * @param {string} type - The type of status bar ('HEALTH', 'BOTTLES', etc.).
     * @returns {Statusbar | undefined}
     */
    getStatusbarByType(type) {
        return this.fixedObjects.statusBar.find(bar => bar.type === type);
    }


    /**
     * Draws the Endboss health bar if the character is close enough.
     */
    drawEndbossBar() {
        if (this.distanceCharacterAndBoss()) {
            this.ctx.translate(-this.camera_x, 0);
            this.statusBarEndboss.x = canvas.width - this.statusBarEndboss.width - 10;
            this.addToMap(this.statusBarEndboss);
            this.ctx.translate(this.camera_x, 0);
        }
    }


    /**
     * Checks if the character is within a certain range of the Endboss.
     * 
     * @returns {boolean} True if the Endboss is nearby.
     */
    distanceCharacterAndBoss() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        let distanceToBoss = endboss.x - this.character.x;
        return distanceToBoss < 600;
    }


    /**
     * Updates the bottle status bar based on current bottle count.
     */
    updateBottleStatusbar() {
        let amountBottles = this.character.bottle
        let bottleBar = this.getStatusbarByType('BOTTLES');
        bottleBar?.setPercentage(amountBottles * 10);
    }


    /**
     * Returns an array of all control buttons.
     * 
     * @returns {Button[]}
     */
    getButtons() {
        return this.fixedObjects.button || [];
    }


    /**
     * Toggles between pause and play state.
     */
    toggleBreak() {
        this.isBreak ? this.gamePlay() : this.gameStop();
    }


    /**
     * Stops the game: pauses rendering, disables interaction loops, and freezes state.
     */
    gameStop() {
        this.clearRunIntervall();
        this.interactions.stopCharacterIntervall();
        this.interactions.stopEnemieIntervall();
        this.interactions.stopCloudsIntervall();
        cancelAnimationFrame(this.animationFrameID);
        this.setStatusBreak();
        this.uiController.stopBackgroundMusic();
        this.endGame = () => { };
    }


    /**
     * Resumes the game from paused state, restarts rendering and interaction loops.
     */
    gamePlay() {
        this.interactions.startCharacterIntervall();
        this.interactions.startEnemieIntervall();
        this.interactions.startCloudsIntervall();
        this.draw();
        this.setStatusPlay();
        uiController.playBackgroundMusic();
    }


    /**
     * Sets game status to "paused" and updates the pause button icon accordingly.
     */
    setStatusBreak() {
        this.isBreak = true;
        this.updatePauseButtonImage('play');
    }


    /**
     * Sets game status to "running" and updates the pause button icon accordingly.
     */
    setStatusPlay() {
        this.isBreak = false;
        this.updatePauseButtonImage('pause');
    }


    /**
     * Toggles sound on/off via the UI controller and updates the icon.
     */
    toggleSound() {
        this.uiController.toggleSound(this.fixedObjects.button);
    }


    /**
     * Updates the icon for the pause/play button based on game state.
     * 
     * @param {string} state - 'play' or 'pause'
     */
    updatePauseButtonImage(state) {
        let btn = this.fixedObjects.button.find(b => b.action === 'Break' || b.action === 'Play');
        btn.imagePath = state === 'play' ? 'img/icons/play-solid-hell-gray.svg' : 'img/icons/pause-solid-hell-gray.svg';
        btn.loadImage(btn.imagePath);
    }
}