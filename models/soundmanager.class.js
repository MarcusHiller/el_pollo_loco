class SoundManager {

    constructor() {
        this.bgMusic = new Audio('');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;
        this.muted = false;
    }

    
    playBackgroundMusic() {
        if (!this.muted) {
            this.bgMusic.play().catch(e => console.warn('autoplay blocked:', e));
        }
    }


    stopBackgroundMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }


    toggleMute() {
        this.muted = !this.muted;
        this.bgMusic.muted = this.muted;
    }

    
    isMuted() {
        return this.muted;
    }
}