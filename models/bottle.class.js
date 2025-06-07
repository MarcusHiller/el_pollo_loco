class Bottle extends DrawableObject {

    
    offset = {
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        };
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = 300 + Math.random() * x;
        this.y = y;
        this.height = 90;
        this.width = 90;
        this.collected = false;
        this.object = 'bottle';
    }
}