/**
 * Class for handling background music and mute functionality.
 */
class SoundManager {

    /**
     * Initializes a SoundManager with default background music settings.
     */
    constructor() {
        this.bgMusic = new Audio('');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;
        this.muted = false;
    }

    
    /**
     * Starts playback of the background music (if not muted).
     */
    playBackgroundMusic() {
        if (!this.muted) {
            this.bgMusic.play().catch(e => console.warn('autoplay blocked:', e));
        }
    }


    /**
     * Stops the background music and resets time.
     */
    stopBackgroundMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }


    /**
     * Toggles the mute state of the background music.
     */
    toggleMute() {
        this.muted = !this.muted;
        this.bgMusic.muted = this.muted;
    }


    /**
     * Checks if the sound is currently muted.
     * @returns {boolean} True if muted, false otherwise.
     */
    isMuted() {
        return this.muted;
    }
}