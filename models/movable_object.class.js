class MovableObject extends DrawableObject {

    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy;
    damagePoints;
    damageTime;
    lastHit = 0;
    world;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    constructor() {
        super();
    };


    isColliding(movableObject) {
        return this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top;
    }


    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playAnimationOnce(images, count) {
        this.currentImage = 0;
        this.animationInterval = setInterval(() => {
            if (this.currentImage < images.length) {
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(this.animationInterval);
            }
        }, count);
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else {
            return this.y < 175;
        }
    }


    moveLeft() {
        this.x -= this.speed;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveJump() {
        this.speedY = 18;
    }


    ishurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < this.damageTime;
    }


    isDead() {
        return this.energy == 0;
    }


    setHurt() {
        this.lastHit = new Date().getTime();
    }


    hitEnemy(enemy) {
        enemy.energy = enemy.energy - enemy.damagePoints;
        if (enemy.energy <= 0) {
            enemy.energy = 0;
            this.speed = 0;
            this.setHurt();
        }
    }


    drawOffEnergy() {
        if (this.energy > 0) {
            this.energy -= this.damagePoints;
        }
        if (this.energy <= 0) {
            this.energy = 0; 
        }
    }


    injuryProcess() {
        if (!this.ishurt()) {
            this.setHurt();
            this.drawOffEnergy();
            this.findCharacterObjekt();
        }
    }

    
    findCharacterObjekt() {
        if (this.name === 'pepe') {
            let healthBar = world.getStatusbarByType('HEALTH');
            healthBar?.setPercentage(this.energy);
        } else if (this.name === 'endboss') {
            let bossBar = world.getStatusbarByType('ENDBOSS');
            bossBar?.setPercentage(this.energy);
        }
    }


    animateChicken(walkImages, deadImage) {
        this.chickenIntervallX = setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
        this.chickenWalk = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(walkImages);
            } else if (this.energy == 0) {
                this.loadImage(deadImage);
            }
        }, 150);
    }
}