let isPaused = false;
let gameRunning = false;

function initializeGame() {
    gameRunning = true;
    isPaused = false;
    resetUI();
    spawnEnemyFormation(3, 6);
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

function pause() {
    const paused = document.getElementById("pause");
    clearInterval(shoot);
    clearInterval(animation)
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
        shoot = setInterval(enemyShootBullet, 400)
        animation = setInterval(changeEnemyApperance, 600)
        document.body.classList.remove('game-paused');
    }

}

function resume() {
    if (isPaused) {
        pause();
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
    document.getElementById("ui").style.display = "none"; // Hide the start button
    document.getElementById("story").style.display = "block";
});

document.getElementById("begin").addEventListener("click", () => {
    document.getElementById("story").style.display = "none"; // Hide the start button
    document.getElementById("game-container").style.display = "flex";
    countdownandinit(); // Start the game
});

document.getElementById("retry").addEventListener("click", () => {
    location.reload();
});
