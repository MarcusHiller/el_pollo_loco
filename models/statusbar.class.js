class Statusbar extends DrawableObject{

    IMAGES_STATUS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percentage = 100;
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS);
        this.x = 5;
        this.y = 5;
        this.width = 150;
        this.height = 50;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        if (this.percentage == 100) {
            this.loadImage(this.IMAGES_STATUS[5]);
        } else if (this.percentage >= 80) {
            this.loadImage(this.IMAGES_STATUS[4]);
        } else if (this.percentage >= 60) {
            this.loadImage(this.IMAGES_STATUS[3]);
        } else if (this.percentage >= 40) {
            this.loadImage(this.IMAGES_STATUS[2]);
        } else if (this.percentage >= 20) {
            this.loadImage(this.IMAGES_STATUS[1]);
        } else if (this.percentage == 0) {
            this.loadImage(this.IMAGES_STATUS[0]);
        }
    }
}