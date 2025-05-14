class Cloud extends MovableObject{
    y = 15;
    height = 220;
    width = 450;
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 800;
    }
}