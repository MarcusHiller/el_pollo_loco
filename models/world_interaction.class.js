/**
 * Handles all interactions and collisions between the character, enemies,
 * collectibles and throwable objects within the game world.
 */
class WorldInteraction {

    /**
     * Creates a new WorldInteraction instance.
     * @param {World} world - The game world instance containing all game objects.
     */
    constructor(world) {

        /** @type {World} */
        this.world = world;
    }


    /**
     * Checks for collisions between the character and any enemies.
     * Calls collision handler if a collision is detected.
     */
    checkCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                this.handleEnemyCollison(enemy);
            }
        });
    }


    /**
     * Handles logic when character collides with an enemy.
     * Decides whether the character takes damage or the enemy is hit.
     * 
     * @param {Enemy} enemy - The enemy object the character collided with.
     */
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


    /**
     * Checks if the player pressed the throw key and has bottles to throw.
     * Initiates the throw if conditions are met.
     */
    checkThrowObjects() {
        if (this.world.keyboard.d && this.world.character.canThrow) {
            if (this.world.character.bottle > 0 && !this.world.character.isThrowDelayActive()) {
                this.objectIsThrown();
            }
        } else if (!this.world.keyboard.d) {
            this.world.character.canThrow = true;
        }
    }


    /**
     * Instantiates a new ThrowableObject and adds it to the world.
     * Updates character bottle count and sets throw cooldown.
     */
    objectIsThrown() {
        const { x, y, direction } = this.calculateThrowVector();
        const bottle = new ThrowableObject(x, y, direction);
        this.world.throwableObjects.push(bottle);
        this.world.character.bottle--;
        this.world.character.setThrowTime();
        this.world.character.canThrow = false;
    }


    /**
     * Calculates the starting vector (x, y, direction) for a thrown object based on character position.
     * @returns {{x: number, y: number, direction: boolean}} - Throw position and direction.
     */
    calculateThrowVector() {
        return {
            x: this.world.character.x + this.world.character.offset.right,
            y: this.world.character.y + this.world.character.offset.top,
            direction: this.world.character.otherDirection
        };
    }


    /**
     * Checks if any thrown bottles collide with enemies and handles those collisions.
     */
    checkCollisionsThrowableObjects() {
        this.world.level.enemies.forEach((enemy) => {
            const collidngBottle = this.world.throwableObjects.find(bottle => bottle.isColliding(enemy));
            if (collidngBottle) {
                this.handleBottleCollisions(enemy, collidngBottle);
            }
        });
    }


    /**
     * Handles collision between a thrown bottle and an enemy.
     * Damages the enemy and breaks the bottle.
     * 
     * @param {Enemy} enemy - The enemy hit by the bottle.
     * @param {ThrowableObject} collidngBottle - The thrown bottle that collided.
     */
    handleBottleCollisions(enemy, collidngBottle) {
        if (enemy.name === 'endboss' && enemy.energy > 0) {
            enemy.injuryProcess();
        } else if (enemy instanceof SmallChicken) {
            enemy.hitEnemy(enemy);
        } else if (enemy instanceof Chicken) {
            enemy.hitEnemy(enemy);
        }
        collidngBottle.bottleBreaks();
    }


    /**
     * Checks for collision between the character and bottle collectibles.
     * Increases character's bottle count and marks the bottle as collected.
     */
    checkCollisionBottle() {
        this.world.level.bottle.forEach((bottle) => {
            if (this.world.character.isColliding(bottle) && !bottle.collected) {
                this.world.character.bottle++;
                bottle.collected = true;
                bottle.findCollectedObjects();
            }
        });
    }


    /**
     * Checks for collision between the character and coin collectibles.
     * Increases character's coin count and marks the coin as collected.
     */
    checkCollisionCoin() {
        this.world.level.coin.forEach((coin) => {
            if (this.world.character.isColliding(coin) && !coin.collected) {
                this.world.character.coin++;
                coin.collected = true;
                coin.findCollectedObjects();
            }
        });
    }
}