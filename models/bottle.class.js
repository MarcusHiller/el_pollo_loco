class Bottle extends DrawableObject {
    
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = 300 + Math.random() * x;
        this.y = y;
        this.height = 90;
        this.width = 90;
    }
}