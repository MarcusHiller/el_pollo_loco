let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let gameState = 'start';
let showHelp = false;
let screenManager = new ScreenManager();


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
    gameState = 'playing';
    showHelp = false;
    world = new World(canvas, keyboard);

    world.endGame = function (result) {
        this.clearRunIntervall();
        gameState = result ? 'end-won' : 'end-lose';
    };

    world.draw();
}


window.addEventListener('click', function (e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let buttons = screenManager.getButtons(gameState, showHelp);

    for (let btn of buttons) {
        if (isInside(x, y, btn)) {
            handleButtonClick(btn.text);
            break;
        }
    }
});


function handleButtonClick(text) {
    if (gameState === 'start') {
        if (text === 'Spiel starten') startGame();
        else if (text === 'Hilfe') showHelp = true;
        else if (text === 'Zurück') showHelp = false;
    } else if (gameState === 'end-won' || gameState === 'end-lose') {
        if (text === 'Neustarten') startGame();
        else if (text === 'Beenden') gameState = 'start';
    }
}


function isInside(x, y, btn) {
    return x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height;
}
