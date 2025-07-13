class UIController {
    
    fullScreen = false;


    constructor() {
        this.bgMusic = new Audio('sounds/accordion-54979.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;
        this.bgMusic.muted = false;
    }


    resizeCanvasToFullscreen(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }


    toggleScreen(buttons) {
        let screenToSmall = window.innerWidth < 720 && window.innerHeight < 480;
        if (screenToSmall) return;
        this.fullScreen = !this.fullScreen;
        let icon = this.fullScreen ? 'img/icons/compress-solid-hell-gray.svg' : 'img/icons/expand-solid-hell-gray.svg';
        let btn = buttons.find(b => b.action === 'Screen');
        if (btn) {
            btn.imagePath = icon;
            btn.loadImage(icon);
        }
        let fullscreen = document.getElementById('canvas');
        document.fullscreenElement ? document.exitFullscreen() : fullscreen.requestFullscreen();
    }


    toggleSound(buttons) {
        this.toggleSoundIcon(buttons);
        this.toggleMute();
    }


    toggleSoundIcon(buttons) {
        let icon = this.bgMusic.muted ? 'img/icons/volume-high-solid-hell-gray.svg' : 'img/icons/volume-xmark-solid-hell-gray.svg';
        let btn = buttons.find(b => b.action === 'Volume');
        if (btn) {
            btn.imagePath = icon;
            btn.loadImage(icon);
        }
    }


    playBackgroundMusic() {
        if (!this.soundMuted) {
            this.bgMusic.play().catch(e => console.warn('autoplay blocked:', e));
        }
    }

    
    stopBackgroundMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }


    toggleMute() {
        this.bgMusic.muted = !this.bgMusic.muted; 
    }

    
    isMuted() {
        return this.soundMuted;
    }
}