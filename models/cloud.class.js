class Cloud extends MovableObject{
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 800;
        this.y =15;
        this.height =220;
        this.width = 450;
    }
}