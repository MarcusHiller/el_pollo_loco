class DrawableObject {

    img;
    imageCache = {};
    x;
    y;
    height;
    width;
    currentImage = 0;
    collected;
    object;

    constructor() {
    }


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
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

        }
    }

    
    drawFrameInside(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
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


    findCollectedObjects() {
        if (this instanceof Coin) {
            let coinBar = world.getStatusbarByType('COINS');
            coinBar?.setPercentage(this.world.character.coin * 5);
        } else if (this instanceof Bottle) {
            let bottleBar = world.getStatusbarByType('BOTTLES');
            bottleBar?.setPercentage(this.world.character.bottle * 10);
        }
    }
}