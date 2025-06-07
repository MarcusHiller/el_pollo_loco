class Level {

    enemies;
    clouds;
    background;
    bottle;
    coin;
    level_end_x = 2880;

    constructor(enemies, clouds, background, bottle, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.bottle = bottle;
        this.coin = coin;
    }
}