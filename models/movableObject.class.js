class MovableObject {
    x;
    y;
    img;
    height;
    width;

    constructor() {

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