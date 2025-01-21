let isPaused = false;
let gameRunning = false;

function initializeGame() {
    gameRunning = true;
    isPaused = false;
    resetUI();
    spawnPlayer();
    gameLoop();
}

function gameLoop() {
    if (!isPaused && gameRunning) {
        moveEntities();
        moveFormation();
        movePlayer();
        checkBulletCollisions();
        updateUI();
    }
    requestAnimationFrame(gameLoop);
}

document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none";
    initializeGame();
    spawnEnemyFormation(3, 6); 
});
