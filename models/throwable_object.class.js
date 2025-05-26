class ThrowableObject extends MovableObject{
    
    width = 60;
    height = 70;
    world;
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.throw();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 60);
        
    }
}