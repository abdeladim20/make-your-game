let isPaused = false;
let gameRunning = false;

function initializeGame() {
    gameRunning = true;
    isPaused = false;
    resetUI();
    spawnPlayer();
    gameLoop();
}


let count = 0
function checkGameOver() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    
    // Check if all enemies have the 'killed' class
    const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))
    
    if (allKilled && count == 0) {
        count++
        endGame();
    }
}

function remove() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    // const id = document
    
    // Check if all enemies have the 'killed' class
    const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))
    allEnemies.forEach((element, i) => {
        if (element.classList == "killed") { 
            element.splice(i, 1) 
        }
    });
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
    document.getElementById("start-button").style.display = "none"; // Hide the start button
    initializeGame(); // Start the game
    spawnEnemyFormation(3, 6); // Spawn enemy formation
});
