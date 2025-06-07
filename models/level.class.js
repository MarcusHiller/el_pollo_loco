class Level {

    enemies;
    clouds;
    background;
    bottle
    level_end_x = 1440;

    constructor(enemies, clouds, background, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.bottle = bottle;
    }
}