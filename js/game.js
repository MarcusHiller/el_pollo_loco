/** @type {HTMLCanvasElement} The canvas element used for rendering the game. */
let canvas;


/** @type {World} The main game world instance, initialized when the game starts. */
let world;


/** 
 * Keyboard input handler for managing key states. 
 * 
 * @type {Keyboard}
 */
let keyboard = new Keyboard();


/** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas. */
let ctx;


/**
 * Current game state. Can be 'start', 'playing', 'won', or 'lost'.
 * 
 * @type {'start' | 'playing' | 'won' | 'lost'}
 */
let gameState = 'start';


/** @type {boolean} Indicates whether the help screen is currently shown. */
let showHelp = false;


/**
 * Manages the active screen view and transitions.
 * 
 * @type {ScreenManager}
 */
let screenManager = new ScreenManager();


/**
 * Controls UI interactions like buttons, overlays, and sounds.
 * 
 * @type {UIController}
 */
let uiController = new UIController();


/**
 * Stores currently active touch actions to prevent multiple triggers.
 * 
 * @type {Set<string>}
 */
let activeTouchActions = new Set();


/**
 * Initializes the game canvas and starts the menu drawing loop.
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    drawMenuLoop();
}


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
 * Continuously redraws the menu screen (start/help/end).
 */
function drawMenuLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    screenManager.draw(ctx, gameState, showHelp);
    requestAnimationFrame(drawMenuLoop);
}


/**
 * Starts the game by initializing the world and defining game over handling.
 */
function startGame() {
    world?.gameStop?.();
    gameState = 'playing';
    showHelp = false;
    world = new World(canvas, keyboard, uiController);
    uiController.playBackgroundMusic();
    world.endGame = function (result) {
        world?.gameStop?.();
        this.clearRunIntervall();
        gameState = result ? 'end-won' : 'end-lose';
    };
    world.draw();
}


/**
 * Handles input events (click/touch) and triggers actions on buttons.
 * 
 * @param {number} x - X coordinate of the input.
 * @param {number} y - Y coordinate of the input.
 * @param {boolean} [isClick=false] - Whether the event was a click (as opposed to a hold).
 */
function handleInput(x, y, isClick = false) {
    const buttons = getActiveButtons();
    for (let btn of buttons) {
        if (isInside(x, y, btn)) {
            if (isClick) {
                handleButtonClick(btn.action);
            } else {
                activeTouchActions.add(btn.action);
                handleButtonAction(btn.action, true);
            }
            break;
        }
    }
}


/**
 * Listens to click events on the canvas and triggers input handling.
 */
window.addEventListener('click', function (e) {
    const { x, y } = enterButton(e);
    handleInput(x, y, true);
});



/**
 * Listens to touchstart events and triggers input handling on touch devices.
 */
window.addEventListener('touchstart', function (e) {
    if (!e.touches || !e.touches.length) return;
    const { x, y } = enterButton(e.touches[0]);
    handleInput(x, y);
}, { passive: true }); // wichtig: kein preventDefault, damit click evt. trotzdem ausgelöst werden kann



/**
 * Listens to touchend events and resets active button states.
 */
window.addEventListener('touchend', function () {
    activeTouchActions.forEach(action => {
        handleButtonAction(action, false);
    });
    activeTouchActions.clear();
});


/**
 * Dispatches button actions depending on the current game state.
 * 
 * @param {string} action - The action to perform (e.g., "start", "help", etc.).
 */
function handleButtonClick(action) {
    let currentButtons = screenManager.getButtons(gameState, showHelp) || [];
    if (gameState === 'start') {
        gameStateStart(action, currentButtons);
    } else if (gameState === 'end-won' || gameState === 'end-lose') {
        gameStateFinish(action);
    } else if (gameState === 'playing') {
        gameStatePlaying(action);
    }
}


/**
 * Handles button actions for the start screen.
 * 
 * @param {string} action - The triggered button action.
 * @param {Object[]} currentButtons - List of currently active buttons.
 */
function gameStateStart(action, currentButtons) {
    if (action === 'Play') startGame();
    else if (action === 'Info') showHelp = true;
    else if (action === 'Back') showHelp = false;
    else if (action === 'Screen') uiController.toggleScreen(currentButtons);
}


/**
 * Handles button actions for the end screen.
 * 
 * @param {string} action - The triggered button action.
 */
function gameStateFinish(action) {
    if (action === 'Restart') {
        world.gameStop();
        startGame();
    }
    else if (action === 'End') {
        gameState = 'start';
        drawMenuLoop();
        world.gameStop();
    }
    else if (action === 'Screen') uiController.toggleScreen(world.fixedObjects.button);
}


/**
 * Handles button actions during gameplay.
 * 
 * @param {string} action - The triggered button action.
 */
function gameStatePlaying(action) {
    if (action === 'Break' || action === 'Play') {
        world.toggleBreak();
    }
    else if (action === 'Volume') world.toggleSound();
    else if (action === 'Screen') uiController.toggleScreen(world.fixedObjects.button);
    else if (action === 'End') {
        gameState = 'start';
        drawMenuLoop();
        world.gameStop();
    }
}


/**
 * Sets the state of control keys based on the given action.
 * 
 * @param {string} action - Action (e.g., 'Left', 'Right', 'Jump', 'throw').
 * @param {boolean} isPressed - Whether the button is pressed.
 */
function handleButtonAction(action, isPressed) {
    if (action === 'Left') keyboard.left = isPressed;
    else if (action === 'Right') keyboard.right = isPressed;
    else if (action === 'Jump') keyboard.space = isPressed;
    else if (action === 'throw') keyboard.d = isPressed;
}


/**
 * Checks if the given coordinates are inside a button’s area.
 * 
 * @param {number} x - X coordinate of the pointer.
 * @param {number} y - Y coordinate of the pointer.
 * @param {{x: number, y: number, width: number, height: number}} btn - Button object.
 * @returns {boolean} True if the point is inside the button area.
 */
function isInside(x, y, btn) {
    return x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height;
}


/**
 * Event listener for mouse movement over the canvas.
 * Changes the cursor to a pointer if hovering over an active button.
 */
window.addEventListener('mousemove', function (e) {
    let { x, y } = enterButton(e);
    let buttons = getActiveButtons();
    let hovering = false;
    for (let btn of buttons) {
        if (isInside(x, y, btn)) {
            hovering = true;
            break;
        }
    }
    canvas.style.cursor = hovering ? 'pointer' : 'default';
});


/**
 * Calculates the pointer coordinates relative to the canvas.
 * Automatically chooses between small screen and extended screen logic.
 * 
 * @param {MouseEvent|Touch} e - The input event.
 * @returns {{x: number, y: number}} The calculated coordinates.
 */
function enterButton(e) {
    const canvasElement = document.getElementById('canvas');
    if (!canvasElement) {
        console.warn('Canvas not found yet!');
        return { x: 0, y: 0 };
    }
    const rect = canvasElement.getBoundingClientRect();
    if (isSmallScreen()) {
        return getCoordsSmallScreen(e, rect, canvasElement);
    } else {
        return getCoordsExtendedScreen(e, rect, canvasElement);
    }
}


/**
 * Checks if the screen resolution is considered small (e.g., mobile devices).
 * 
 * @returns {boolean} True if screen is small.
 */
function isSmallScreen() {
    return window.innerWidth < 720 && window.innerHeight < 480;
}


/**
 * Gets input coordinates adjusted for small screen scaling.
 * 
 * @param {MouseEvent|Touch} e - The input event.
 * @param {DOMRect} rect - Bounding rectangle of the canvas.
 * @returns {{x: number, y: number}} Relative canvas coordinates.
 */
function getCoordsSmallScreen(e, rect, canvasElement) {
    const scaleX = canvasElement.width / rect.width;
    const scaleY = canvasElement.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
}


/**
 * Gets input coordinates adjusted for extended screen letterboxing.
 * 
 * @param {MouseEvent|Touch} e - The input event.
 * @param {DOMRect} rect - Bounding rectangle of the canvas.
 * @returns {{x: number, y: number}} Relative canvas coordinates.
 */
function getCoordsExtendedScreen(e, rect, canvasElement) {
    const { renderWidth, renderHeight, offsetX, offsetY } = getLetterboxOffsets(rect);
    const clickX = (e.clientX - rect.left - offsetX) / renderWidth;
    const clickY = (e.clientY - rect.top - offsetY) / renderHeight;
    return {
        x: clickX * canvasElement.width,
        y: clickY * canvasElement.height
    };
}


/**
 * Calculates the letterbox (black bar) offsets for different screen aspect ratios.
 * Used to properly align input coordinates with the virtual canvas.
 * 
 * @param {DOMRect} rect - The bounding client rectangle of the canvas.
 * @returns {{ offsetX: number, offsetY: number }} Offset values to compensate for letterboxing.
 */
function getLetterboxOffsets(rect) {
    const virtualWidth = 720;
    const virtualHeight = 480;
    const aspectCanvas = virtualWidth / virtualHeight;
    const aspectScreen = rect.width / rect.height;
    return aspectScreen > aspectCanvas
        ? getSideBar(rect, aspectCanvas)
        : getTopBottomBar(rect, aspectCanvas);
}


/**
 * Calculates rendering area and side offsets when letterboxing with side bars.
 * 
 * @param {DOMRect} rect - Bounding rectangle of the canvas.
 * @param {number} aspectCanvas - Aspect ratio of the original canvas.
 * @returns {{renderWidth: number, renderHeight: number, offsetX: number, offsetY: number}} Rendering dimensions and offset.
 */
function getSideBar(rect, aspectCanvas) {
    const renderHeight = rect.height;
    const renderWidth = renderHeight * aspectCanvas;
    const offsetX = (rect.width - renderWidth) / 2;
    return { renderWidth, renderHeight, offsetX, offsetY: 0 };
}


/**
 * Calculates rendering area and top/bottom offsets when letterboxing vertically.
 * @param {DOMRect} rect - Bounding rectangle of the canvas.
 * @param {number} aspectCanvas - Aspect ratio of the original canvas.
 * @returns {{renderWidth: number, renderHeight: number, offsetX: number, offsetY: number}} Rendering dimensions and offset.
 */
function getTopBottomBar(rect, aspectCanvas) {
    const renderWidth = rect.width;
    const renderHeight = renderWidth / aspectCanvas;
    const offsetY = (rect.height - renderHeight) / 2;
    return { renderWidth, renderHeight, offsetX: 0, offsetY };
}


/**
 * Returns the currently active button set depending on the game state.
 * 
 * @returns {Object[]} List of active buttons.
 */
function getActiveButtons() {
    let buttons = screenManager.getButtons(gameState, showHelp) || [];
    if (gameState === 'playing' && typeof world !== 'undefined') {
        buttons = buttons.concat(world.getButtons());
    }
    return buttons;
}


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