class Coin extends DrawableObject {
    
    offset = {
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        };
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = 200 + x;
        this.y = y;
        this.height = 110;
        this.width = 110;
        this.collected = false;
    }
}