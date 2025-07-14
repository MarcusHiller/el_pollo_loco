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


    
}