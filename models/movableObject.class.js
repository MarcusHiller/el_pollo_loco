class MovableObject {
    x;
    y;
    img;
    height = 150;
    width = 100;
    constructor() {
        this.x = 100;
        this.y = 250;
    }
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    moveRigth() {
        console.log("right");

        
    }
    moveLeft() {
        console.log("right");
        
    }

}