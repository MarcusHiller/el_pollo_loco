let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let gameState = 'start';
let startButton = {
    x: 260,
    y: 220,
    width: 200,
    height: 50,
    text: 'Spiel starten'
}

function init() {
    canvas = document.getElementById('canvas');
    //world = new World (canvas, keyboard);
    ctx = canvas.getContext('2d');

    //console.log("My Character is, MovableObject", world.character);
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


window.addEventListener('click', function (e) {
    //console.log(e);
    console.log('Canvas-Klick erkannt:', e.x, e.y, gameState);

    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (
        gameState !== 'playing' &&
        x >= startButton.x &&
        x <= startButton.x + startButton.width &&
        y >= startButton.y &&
        y <= startButton.y + startButton.height
    ) {
        startGame();
    }
});



function drawMenuLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'start') {
        drawStartScreen();
    } else if (gameState === 'end') {
        drawEndScreen();
    }

    requestAnimationFrame(drawMenuLoop);
}

function drawStartScreen() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Willkommen zum Spiel!', canvas.width / 2, 150);

    drawButton(startButton);
}

function drawEndScreen() {
    console.log('Endscreen wird gezeichnet');

    ctx.fillStyle = '#400';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Spiel beendet!', canvas.width / 2, 150);

    startButton.text = 'Neustarten';
    drawButton(startButton);
}

function drawButton(btn) {
    ctx.fillStyle = '#555';
    ctx.fillRect(btn.x, btn.y, btn.width, btn.height);

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + 32);
}


function startGame() {
    console.log('startGame() aufgerufen. Alter gameState:', gameState);
    gameState = 'playing';
    console.log('startGame() aufgerufen. Alter gameState:', gameState);
    world = new World(canvas, keyboard);

    // Wichtig: World bekommt `endGame()`-Methode
    world.endGame = function () {
        this.clearRunIntervall();
        console.log('endGame() wurde aufgerufen');
        gameState = 'end';
    };

    world.draw(); // ruft dein World-Zeichnen auf
}
