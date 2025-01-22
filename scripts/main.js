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

    // Check if all enemies have the 'killed' class
    const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))

    if (allKilled) {
        console.log('allKilled');
        
        endGame();
    }
}

function update() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");

    // Check if all enemies have the 'killed' class
    const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))
    // const allKilled = (allEnemies.classList.contains("killed"))
    // allKilled.remove();
    if (allKilled) {
        // If all enemies are killed, remove them
        allEnemies.forEach(enemy => {
            if (enemy.classList.contains("killed")) {
                enemy.remove();
            }
        });
    }


    // allKilled.forEach((element) => {
    //     // console.log('DDDDD');
    //     if (element.classList == "killed") {
    //         // console.log(element);
    //         // console.log('dddddddddd');
    //         element.id.remove();
    //         element.splice(id, 1)
            
    //     }
    // });
}

function gameLoop() {
    if (!isPaused && gameRunning) {
        moveEntities();
        moveFormation();
        movePlayer();
        checkBulletCollisions();
        updateUI();
        // update()
    }
    req = requestAnimationFrame(gameLoop);
}


document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none"; // Hide the start button
    initializeGame(); // Start the game
    spawnEnemyFormation(3, 6); // Spawn enemy formation
});
