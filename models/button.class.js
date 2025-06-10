class Button extends DrawableObject {
    constructor({x, y, width, height, text = '', imagePath = '', onClick = null}) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.onClick = onClick;
        this.isPictureAvailable(imagePath);
    }


    isPictureAvailable(imagePath) {
        if (imagePath) {
            this.loadImage(imagePath);
        }
    }


    draw(ctx) {
        if (this.img) {
            super.draw(ctx);
        } else {
            ctx.fillStyle = '#333'
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = '#fff'
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.text, this.x + this.width / 2, this.y +28);
        }
    }


    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.height;
    }
}


