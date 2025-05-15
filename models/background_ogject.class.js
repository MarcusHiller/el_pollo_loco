class BackgroundObject extends MovableObject {

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}