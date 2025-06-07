class Bottle extends DrawableObject {
    
    constructor(imagePath, y) {
        super().loadImage(imagePath);
        this.x = Math.random() * 1500;
        this.y = y;
        this.height = 90;
        this.width = 90;
    }
}