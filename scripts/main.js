let isPaused = false;
let gameRunning = false;

function initializeGame() {
    gameRunning = true;
    isPaused = false;
    resetUI();
    spawnPlayer();
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

// function update() {
//     const enemiesContainer = document.getElementById("enemy-formation");
//     const allEnemies = enemiesContainer.querySelectorAll(".enemy");

//     // Check if all enemies have the 'killed' class
//     const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))
//     // const allKilled = (allEnemies.classList.contains("killed"))
//     // allKilled.remove();
//     if (allKilled) {
//         allKilled.forEach((e, i) => {
//             if (e.classList.contains("")) {
//                 e.remove();
//                 e.splice(i, 1)
//             }
//         });
//     }
// }

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


document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none"; // Hide the start button
    initializeGame(); // Start the game
    spawnEnemyFormation(3, 6); // Spawn enemy formation
});
