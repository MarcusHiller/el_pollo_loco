class MovableObject extends DrawableObject{

   
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy;
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


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 175;
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

}