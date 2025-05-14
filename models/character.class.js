class Character extends MovableObject {
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        
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