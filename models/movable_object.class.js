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
    }

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


    /* playAnimationOnce(images) {
        for (let index = 0; index < images.length; index++) {
            let path  = images[index];
            this.img = this.imageCache[path];
        }
        return true;
        let index = images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++; 
    } */

    playAnimationOnce(images) {
        this.currentImage = 0;
        this.animationInterval = setInterval(() => {
            if (this.currentImage < images.length) {
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(this.animationInterval);
            }
        }, 40);
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


    dead() {

        console.log("Gestorben");
    }


    ishurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < this.damageTime;
    }


    setHurt() {
        this.lastHit = new Date().getTime();
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
        }
    }

}