let isPaused = false;
let gameRunning = false;
let req;
let phase = 2;

function stopGameLoop() {
    gameRunning = false;
    isPaused = true;
    cancelAnimationFrame(req);
}

function initializeGame1() {
    gameRunning = true;
    isPaused = false;
    resetUI();
    livesvisual();
    spawnEnemyFormation(3, 6);
    spawnPlayer();
    gameLoop();
    startEnemyActions();
    startTimer(true);
}

function initializeGame3() {
    gameRunning = true;
    isPaused = false;
    game.style.display = "flex";
    livesvisual();
    MSlivesvisual();
    document.getElementById("board").style.display = "flex";
    spawnMotherShip();
    spawnPlayer();
    startEnemyActions();
    startTimer(true);
    gameLoop();
}
function initializeGame2() {
    gameRunning = true;
    isPaused = false;
    game.style.display = "flex";
    livesvisual();
    document.getElementById("board").style.display = "flex";
    spawnPlayer();
    startEnemyActions();
    startTimer(true);
    gameLoop();
}

function pause() {
    const paused = document.getElementById("pause");
    stopEnemyActions();
    stopTimer();
    isPaused = !isPaused;
    paused.style.display = isPaused ? "flex" : "none";
    if (isPaused) {
        document.body.classList.add('game-paused');
    } else {
        startEnemyActions();
        startTimer();
        document.body.classList.remove('game-paused');
    }
}

function resume() {
    if (isPaused) {
        pause();
    }
}

function restart() {
    isPaused = false;
    cancelAnimationFrame(req)
    document.getElementById("endGame").style.display = "none";
    document.getElementById("pause").style.display = "none";
    document.getElementById("mothershiphp").style.display = "none";
    document.body.classList.remove("game-paused");
    game.classList.remove("blured");
    playerPosition = 375;
    mothershiplives = 10;
    formationDirection = 1;

    resetUI();

    game.innerHTML = `<div id="countdown"></div>`
    phase = 1;
    countdownandinit();
}

function gameLoop() {
    if (!isPaused && gameRunning) {
        if (phase == 2) {
            checkAsteroids();
            moveAsteroids();
        }
        moveEntities();
        movePlayer();
        if (phase == 1 || phase == 3){
            moveEnemyBullets();
            checkBulletCollisions();
        }
        updateUI();
        if (phase == 3) {
            moveEnemy()
            moveMothership();
            checkBulletsMothership();
        } else if (phase == 1){
            moveFormation();
        }
    }
    req = requestAnimationFrame(gameLoop);
}


document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("ui").style.display = "none";
    document.querySelectorAll(".early").forEach(element => {
        element.style.display = "block";
    });
    document.getElementById("intro-animation").style.opacity = "0.5";
});

document.getElementById("begin").addEventListener("click", () => {
    document.querySelectorAll(".early").forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("game-container").style.display = "flex";
    countdownandinit();
});

document.getElementById("next1").addEventListener("click", () => {
    document.querySelectorAll(".mid1").forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("game-container").style.display = "flex";
    countdownandinit()
});
document.getElementById("next2").addEventListener("click", () => {
    document.querySelectorAll(".mid2").forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("game-container").style.display = "flex";
    countdownandinit()
});

document.getElementById("retry").addEventListener("click", () => {
    restart();
});

document.getElementById("again").addEventListener("click", () => {
    document.querySelectorAll(".late").forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("game-container").style.display = "flex";
    restart();
});
