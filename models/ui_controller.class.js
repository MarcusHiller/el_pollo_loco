/**
 * Manages UI-related controls such as full-screen toggle, sound control, and background music.
 */
class UIController {
    
    /**
     * Tracks whether the game is in full-screen mode.
     * @type {boolean}
     */
    fullScreen = false;


    /**
     * Creates an instance of UIController with background music initialized.
     */
    constructor() {
        this.bgMusic = new Audio('sounds/accordion-54979.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;
        this.bgMusic.muted = false;
    }


    /**
     * Resizes the given canvas to fill the entire browser window.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element to resize.
     */
    resizeCanvasToFullscreen(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }


    /**
     * Toggles full-screen mode and updates the corresponding button icon.
     * Will not activate if screen is smaller than 720x480.
     * 
     * @param {Button[]} buttons - Array of Button instances to update icon from.
     */
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


    /**
     * Toggles background music and updates the corresponding sound button icon.
     * 
     * @param {Button[]} buttons - Array of Button instances to update icon from.
     */
    toggleSound(buttons) {
        this.toggleSoundIcon(buttons);
        this.toggleMute();
    }


    /**
     * Updates the sound icon on the button depending on mute state.
     * 
     * @param {Button[]} buttons - Array of Button instances to update.
     */
    toggleSoundIcon(buttons) {
        let icon = this.bgMusic.muted ? 'img/icons/volume-high-solid-hell-gray.svg' : 'img/icons/volume-xmark-solid-hell-gray.svg';
        let btn = buttons.find(b => b.action === 'Volume');
        if (btn) {
            btn.imagePath = icon;
            btn.loadImage(icon);
        }
    }


    /**
     * Plays the background music if not muted.
     */
    playBackgroundMusic() {
        if (!this.soundMuted) {
            this.bgMusic.play().catch(e => console.warn('autoplay blocked:', e));
        }
    }

    
    /**
     * Stops and resets the background music.
     */
    stopBackgroundMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }


    /**
     * Toggles the mute state of the background music.
     */
    toggleMute() {
        this.bgMusic.muted = !this.bgMusic.muted; 
    }
}