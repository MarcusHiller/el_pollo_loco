class Coin extends DrawableObject {
    
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = 200 + x;
        this.y = y;
        this.height = 110;
        this.width = 110;
    }
}