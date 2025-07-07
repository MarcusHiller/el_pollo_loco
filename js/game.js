let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let gameState = 'start';
let showHelp = false;
let screenManager = new ScreenManager();
let uiController = new UIController();
let activeTouchActions = new Set();



function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    drawMenuLoop();
}


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


function drawMenuLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    screenManager.draw(ctx, gameState, showHelp);
    requestAnimationFrame(drawMenuLoop);
}


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

// Maus-Klick (für Desktop oder DevTools)
window.addEventListener('click', function (e) {
    const { x, y } = enterButton(e);
    handleInput(x, y, true);
});

// Touchstart (für Mobilgeräte)
window.addEventListener('touchstart', function (e) {
    if (!e.touches || !e.touches.length) return;
    const { x, y } = enterButton(e.touches[0]);
    handleInput(x, y);
}, { passive: true }); // wichtig: kein preventDefault, damit click evt. trotzdem ausgelöst werden kann

// Touchend: Button-Logik deaktivieren
window.addEventListener('touchend', function () {
    activeTouchActions.forEach(action => {
        handleButtonAction(action, false);
    });
    activeTouchActions.clear();
});



/* window.addEventListener('touchstart', function (e) {
    e.preventDefault();
    const { x, y } = enterButton(e.touches[0]);
    const buttons = getActiveButtons();
    for (let btn of buttons) {
        if (isInside(x, y, btn)) {
            activeTouchActions.add(btn.action);
            handleButtonAction(btn.action, true);
            break;
        }
    }
}, { passive: false });

window.addEventListener('touchend', function () {
    activeTouchActions.forEach(action => {
        handleButtonAction(action, false);
    });
    activeTouchActions.clear();
});


window.addEventListener('click', function (e) {
    let { x, y } = enterButton(e);
    let buttons = getActiveButtons();
    for (let btn of buttons) {
        if (isInside(x, y, btn)) {
            handleButtonClick(btn.action);
            break;
        }
    }
}); */


function handleButtonClick(action) {
    let currentButtons = screenManager.getButtons(gameState, showHelp) || [];
    if (gameState === 'start') {
        if (action === 'Play') startGame();
        else if (action === 'Info') showHelp = true;
        else if (action === 'Back') showHelp = false;
        else if (action === 'Screen') uiController.toggleScreen(currentButtons);
    } else if (gameState === 'end-won' || gameState === 'end-lose') {
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
    } else if (gameState === 'playing') {
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
}


function handleButtonAction(action, isPressed) {
    if (action === 'Left') keyboard.left = isPressed;
    else if (action === 'Right') keyboard.right = isPressed;
    else if (action === 'Jump') keyboard.space = isPressed;
    else if (action === 'throw') keyboard.d = isPressed;
}


function isInside(x, y, btn) {
    return x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height;
}


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


function enterButton(e) {
    const rect = canvas.getBoundingClientRect();
    if (isSmallScreen()) {
        return getCoordsSmallScreen(e, rect);
    } else {
        return getCoordsExtendedScreen(e, rect);
    }
}


function isSmallScreen() {
    return window.innerWidth < 720 && window.innerHeight < 480;
}


function getCoordsSmallScreen(e, rect) {
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
}


function getCoordsExtendedScreen(e, rect) {
    const { renderWidth, renderHeight, offsetX, offsetY } = getLetterboxOffsets(rect);
    const clickX = (e.clientX - rect.left - offsetX) / renderWidth;
    const clickY = (e.clientY - rect.top - offsetY) / renderHeight;
    return {
        x: clickX * 720,
        y: clickY * 480
    };
}


function getLetterboxOffsets(rect) {
    const virtualWidth = 720;
    const virtualHeight = 480;
    const aspectCanvas = virtualWidth / virtualHeight;
    const aspectScreen = rect.width / rect.height;

    return aspectScreen > aspectCanvas
        ? getSideBalken(rect, aspectCanvas)
        : getTopBottomBalken(rect, aspectCanvas);
}


function getSideBalken(rect, aspectCanvas) {
    const renderHeight = rect.height;
    const renderWidth = renderHeight * aspectCanvas;
    const offsetX = (rect.width - renderWidth) / 2;
    return { renderWidth, renderHeight, offsetX, offsetY: 0 };
}


function getTopBottomBalken(rect, aspectCanvas) {
    const renderWidth = rect.width;
    const renderHeight = renderWidth / aspectCanvas;
    const offsetY = (rect.height - renderHeight) / 2;
    return { renderWidth, renderHeight, offsetX: 0, offsetY };
}


function getActiveButtons() {
    let buttons = screenManager.getButtons(gameState, showHelp) || [];
    if (gameState === 'playing' && typeof world !== 'undefined') {
        buttons = buttons.concat(world.getButtons());
    }
    return buttons;
}


function checkOriantation() {
    let isPortrait = window.innerHeight > window.innerWidth;
    let warning = document.getElementById('orientation-warning');
    warning.style.display = isPortrait ? 'flex' : 'none';
}


window.addEventListener('load', checkOriantation);
window.addEventListener('resize', checkOriantation);
window.addEventListener('orientationchange', checkOriantation);