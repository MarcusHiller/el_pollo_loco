class Cloud extends MovableObject{
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 50 * Math.random() * 10;
        this.y = 20;
    }
}