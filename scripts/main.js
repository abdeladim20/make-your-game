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
    startTimer();
}

function initializeGame2() {
    gameRunning = true;
    isPaused = false;
    game.style.display = "flex"
    MSlivesvisual();
    document.getElementById("board").style.display = "flex";
    spawnMotherShip();
    spawnPlayer();
    startEnemyActions();
    startTimer();
    gameLoop();
}


function checkGameOver() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))
    if (allKilled) {
        endGame();
    }
}

function pause() {
    const paused = document.getElementById("pause");
    stopEnemyActions();
    stopTimer();
    isPaused = !isPaused;
    paused.style.display = isPaused ? "flex" : "none";
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    Array.from(allEnemies).forEach(element => {
        if (isPaused) {
            element.classList.add("paused");
            game.classList.add("blured")
        } else {
            game.classList.remove("blured")
            element.classList.remove("paused");
        }
    });
    if (isPaused) {
        // Stop any animations or intervals here
        document.body.classList.add('game-paused');
    } else {
        // Resume animations or intervals here
        // shoot = setInterval(enemyShootBullet, 400)
        // animation = setInterval(changeEnemyApperance, 600)
        startEnemyActions();
        startTimer();
        document.body.classList.remove('game-paused');
    }
}

function resume() {
    if (isPaused) {
        pause();
        // stopEnemyActions();
        // stopTimer();
    }
}

function restart() {
    // Hide pause menu and reset pause state
    isPaused = false;
    cancelAnimationFrame(req)
    document.getElementById("pause").style.display = "none";
    document.body.classList.remove("game-paused");
    game.classList.remove("blured");
    playerPosition = 375; // Reset player position to the initial spot
    formationDirection = 1;


    // Reset UI Elements
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("lives").innerText = "Lives: 3";

    // Remove all existing enemies
    const enemiesContainer = document.getElementById("enemy-formation");
    if (enemiesContainer) enemiesContainer.remove();

    // Remove all bullets (enemy and player bullets)
    document.querySelectorAll(".bullet, .enemy-bullet").forEach(bullet => bullet.remove());
    enemyBullets = [];

    // Remove existing player before initializing game
    const existingPlayer = document.getElementById("player");
    if (existingPlayer) existingPlayer.remove();

    // Clear all existing intervals to prevent speed stacking
    // clearInterval(shoot);

    // Ensure enemies spawn
    // spawnEnemyFormation(3, 6); // Manually call this before initializeGame()

    // Restart the game (this will spawn the player and reset any active intervals)
    initializeGame1()
}

function gameLoop() {
    if (!isPaused && gameRunning) {
        moveEntities();
        movePlayer();
        moveEnemyBullets();
        checkBulletCollisions();
        updateUI();
        if (phase == 2) {
            moveEnemy()
            moveMothership();
            checkBulletsMothership();
        } else {
            moveFormation();
        }
    }
    req = requestAnimationFrame(gameLoop);
}


document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("ui").style.display = "none"; // Hide the start button
    document.querySelectorAll(".early").forEach(element => {
        element.style.display = "block";
    });
});

document.getElementById("begin").addEventListener("click", () => {
    document.querySelectorAll(".early").forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("game-container").style.display = "flex";
    countdownandinit(); // Start the game
});

document.getElementById("next").addEventListener("click", () => {
    document.querySelectorAll(".mid").forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("game-container").style.display = "flex";
    countdownandinit()
});

document.getElementById("retry").addEventListener("click", () => {
    location.reload();
});

document.getElementById("again").addEventListener("click", () => {
    location.reload();
});
