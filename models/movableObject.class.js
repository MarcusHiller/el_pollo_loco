class MovableObject {

    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    constructor() { };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

        }
    }

    drawFrameInside(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }


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



}