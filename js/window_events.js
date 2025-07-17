/**
 * Event listener for keydown events.
 * Sets keyboard state based on pressed key.
 */
window.addEventListener("keydown", (e) => {

    switch (e.keyCode) {
        case 38:
            keyboard.up = true;
            break;
        case 37:
            keyboard.left = true;
            break;
        case 39:
            keyboard.right = true;
            break;
        case 40:
            keyboard.down = true;
            break;
        case 32:
            keyboard.space = true;
            break;
        case 68:
            keyboard.d = true;
            break;
        default:
            break;
    }
})


/**
 * Event listener for keyup events.
 * Resets keyboard state when key is released.
 */
window.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 38:
            keyboard.up = false;
            break;
        case 37:
            keyboard.left = false;
            break;
        case 39:
            keyboard.right = false;
            break;
        case 40:
            keyboard.down = false;
            break;
        case 32:
            keyboard.space = false;
            break;
        case 68:
            keyboard.d = false;
            break;
        default:
            break;
    }
})


/**
 * Shows or hides the rotation screen warning based on device orientation.
 */
function checkOriantation() {
    let isPortrait = window.innerHeight > window.innerWidth;
    let warning = document.getElementById('orientation-warning');
    warning.style.display = isPortrait ? 'flex' : 'none';
}


/**
 * Listens to window orientation changes (or reload) and adjusts UI accordingly.
 */
window.addEventListener('load', checkOriantation);


/**
 * Event listener for window resizing.
 * Triggers orientation check when window size changes.
 */
window.addEventListener('resize', checkOriantation);


/**
 * Listens to orientation change (rotation of device) and updates layout.
 */
window.addEventListener('orientationchange', checkOriantation);