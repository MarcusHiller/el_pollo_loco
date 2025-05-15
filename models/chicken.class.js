class Chicken extends MovableObject {

    width = 100;
    height = 100;
    y = 330;
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
    }
    moveRigth() {
        console.log("rigth");

    }
    eat() {
        console.log("eat");

    }
}