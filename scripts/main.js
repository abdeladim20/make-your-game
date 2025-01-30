let isPaused = false;
let gameRunning = false;
let req

function initializeGame() {
    gameRunning = true;
    isPaused = false;
    resetUI();
    spawnPlayer();
    gameLoop();
}

function pause() {
    const paused = document.getElementById("pause");
    clearInterval(shoot);
    isPaused = !isPaused;
    paused.style.display = isPaused ? "flex" : "none";

    const enemiesContainer = document.getElementById("enemy-formation");
    if (!enemiesContainer) return;

    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    allEnemies.forEach(element => {
        if (isPaused) {
            element.classList.add("paused");
            game.classList.add("blured");
        } else {
            game.classList.remove("blured");
            element.classList.remove("paused");
        }
    });

    if (isPaused) {
        document.body.classList.add("game-paused");
    } else {
        shoot = setInterval(enemyShootBullet, 400);
        document.body.classList.remove("game-paused");
    }
}

function resume() {
    if (isPaused) {
        pause();
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
    clearInterval(shoot);

    // Ensure enemies spawn
    spawnEnemyFormation(3, 6); // Manually call this before initializeGame()

    // Restart the game (this will spawn the player and reset any active intervals)
    initializeGame();
}


function checkGameOver() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))
    if (allKilled) {
        endGame();
    }
}


function gameLoop() {
    if (!isPaused && gameRunning) {
        moveEntities();
        moveFormation();
        movePlayer();
        moveEnemyBullets();
        checkBulletCollisions();
        updateUI();
    }
    req = requestAnimationFrame(gameLoop);
}

document.getElementById("start-button").addEventListener("click", ff = () => {
    document.getElementById("start-button").style.display = "none";
    spawnEnemyFormation(3, 6);
    initializeGame();
});
