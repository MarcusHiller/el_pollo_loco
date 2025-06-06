class Statusbar extends DrawableObject{

    percentage = 100;
    type;
    imageSources;

    constructor(type, x, y, imageSources) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 50;
        this.imageSources = imageSources['IMAGES_' + type];
        this.loadImages(this.imageSources);
        this.setPercentage(100);
    }
    

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex(percentage);
        this.loadImage(this.imageSources[index]);
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 20) return 1;
        return 0;
    }
}