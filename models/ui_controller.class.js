class UIController {
    
    fullScreen = false;
    soundMuted = false;
    constructor() {

    }

    toggleScreen(buttons) {
        this.fullScreen = !this.fullScreen;
        let icon = this.fullScreen ? 'img/icons/compress-solid-hell-gray.svg' : 'img/icons/expand-solid-hell-gray.svg';
        let btn = buttons.find(b => b.action === 'Screen');
        if (btn) {
            btn.imagePath = icon;
            btn.loadImage(icon);
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }


    toggleSound(buttons, bgMusic) {
        this.soundMuted = !this.soundMuted;
        let icon = this.soundMuted ? 'img/icons/volume-xmark-solid.svg' : 'img/icons/volume-high-solid.svg';
        let btn = buttons.find(b => b.action === 'Volume');
        if (btn) {
            btn.imagePath = icon;
            btn.loadImage(icon);
        }
        if(bgMusic) bgMusic.muted = this.soundMuted; 
    }
}