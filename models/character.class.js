class Character extends MovableObject {
    width = 200;
    height = 350;
    y = 85;
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.x = 10;
    }

    junp() {
        console.log("jump");

    }

    idleShort() {
        console.log("sleep short");
    }

    idleLong() {
        console.log("sleep long");
    }

    idleHurt() {
        console.log("Schaden");
    }

    dead() {
        console.log("Gestorben");

    }
}