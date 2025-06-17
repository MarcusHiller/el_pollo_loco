let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let gameState = 'start';
let showHelp = false;
let screenManager = new ScreenManager();
let uiController = new UIController();


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
    //ctx.save();
    //ctx.scale(canvas.width / 720, canvas.height / 480);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    screenManager.draw(ctx, gameState, showHelp);
    requestAnimationFrame(drawMenuLoop);
    //ctx.restore();
}


function startGame() {
    gameState = 'playing';
    showHelp = false;
    world = new World(canvas, keyboard, uiController);

    world.endGame = function (result) {
        this.clearRunIntervall();
        gameState = result ? 'end-won' : 'end-lose';
    };

    world.draw();
}


window.addEventListener('click', function (e) {
    let { x, y } = enterButton(e);
    let buttons = getActiveButtons();
    for (let btn of buttons) {
        if (isInside(x, y, btn)) {
            handleButtonClick(btn.action);
            break;
        }
    }
});


function handleButtonClick(action) {
    let currentButtons = screenManager.getButtons(gameState, showHelp) || [];
    if (gameState === 'start') {
        if (action === 'Play') startGame();
        else if (action === 'Info') showHelp = true;
        else if (action === 'Back') showHelp = false;
        else if (action === 'Screen') uiController.toggleScreen(currentButtons);

    } else if (gameState === 'playing') {
        if (action === 'Break' || action === 'Play') world.toggleBreak();
        else if (action === 'Volume') world.toggleSound();
        else if (action === 'Screen') uiController.toggleScreen(world.fixedObjects.button);
        else if (action === 'End') {
            gameState = 'start';
            drawMenuLoop();
            world.gameStop();
        }

    } else if (gameState === 'end-won' || gameState === 'end-lose') {
        if (action === 'Restart') startGame();
        else if (action === 'End') gameState = 'start';
        else if (action === 'Screen') uiController.toggleScreen(world.fixedObjects.button);
    }
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


/* function enterButton(e) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;
    return {x, y};
} */


/* function enterButton(e) {
    //const rect = canvas.getBoundingClientRect();
    //console.log(rect);
    //console.log(e);
    if (window.screen.width > window.screen.height) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = 720 / window.screen.width;   // virtuelle Breite
        const scaleY = 480 / canvas.height;  // virtuelle Höhe

        const x = (e.clientX - rect.left) * (canvas.width / rect.width) * scaleX;
        console.log("result:A1 " + x, (e.clientX - rect.left), (canvas.width / rect.width), scaleX);

        const y = (e.clientY - rect.top) * (canvas.height / rect.height) * scaleY;
        console.log("result:A2 " + y, (e.clientY - rect.top), (canvas.height / rect.height), scaleY);
        console.log("X:" + x, "Y:" + y);
        return { x, y };
    } else if (window.screen.width < window.screen.height) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = 720 / canvas.width;   // virtuelle Breite
        const scaleY = 480 / window.screen.height;  // virtuelle Höhe

        const x = (e.clientX - rect.left) * (canvas.width / rect.width) * scaleX;
        console.log("result:B1 " + x, (e.clientX - rect.left), (canvas.width / rect.width), scaleX);

        const y = (e.clientY - rect.top) * (canvas.height / rect.height) * scaleY;
        console.log("result:B2 " + y, (e.clientY - rect.top), (canvas.height / rect.height), scaleY);
        console.log("X:" + x, "Y:" + y);
        return { x, y };
    } 

    const rect = canvas.getBoundingClientRect();
    const scaleX = 720 / canvas.width;   // virtuelle Breite
    const scaleY = 480 / canvas.height;  // virtuelle Höhe
    console.log(canvas.height);
    

    const x = (e.clientX - rect.left) * (canvas.width / rect.width) * scaleX;
    console.log("result:" + x, (e.clientX - rect.left), (canvas.width / rect.width), scaleX);

    const y = (e.clientY - rect.top) * (canvas.height / rect.height) * scaleY;
    console.log("result:" + y, (e.clientY - rect.top), (canvas.height / rect.height), scaleY);
    console.log("X:" + x, "Y:" + y);
    return { x, y };

    

} */

function enterButton(e) {
    const rect = canvas.getBoundingClientRect();
    const canvasVirtualWidth = 720;
    const canvasVirtualHeight = 480;
    const aspectRatioCanvas = canvasVirtualWidth / canvasVirtualHeight;
    const aspectRatioScreen = rect.width / rect.height;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (aspectRatioScreen > aspectRatioCanvas) {
        // Bildschirm ist breiter als Canvas: schwarze Balken links/rechts
        renderHeight = rect.height;
        renderWidth = renderHeight * aspectRatioCanvas;
        offsetX = (rect.width - renderWidth) / 2;
        offsetY = 0;
    } else {
        // Bildschirm ist höher als Canvas: schwarze Balken oben/unten
        renderWidth = rect.width;
        renderHeight = renderWidth / aspectRatioCanvas;
        offsetX = 0;
        offsetY = (rect.height - renderHeight) / 2;
    }

    const clickX = (e.clientX - rect.left - offsetX) / renderWidth;
    const clickY = (e.clientY - rect.top - offsetY) / renderHeight;

    const virtualX = clickX * canvasVirtualWidth;
    const virtualY = clickY * canvasVirtualHeight;

    return { x: virtualX, y: virtualY };
}




function getActiveButtons() {
    let buttons = screenManager.getButtons(gameState, showHelp) || [];
    if (gameState === 'playing' && typeof world !== 'undefined') {
        buttons = buttons.concat(world.getButtons());
    }
    return buttons;
}

