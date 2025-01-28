let isPaused = false;
let gameRunning = false;

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
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    Array.from(allEnemies).forEach(element => {
        if (isPaused) {
            element.classList.add("paused");
        } else {
            element.classList.remove("paused");
        }
    });
    if (isPaused) {
        // Stop any animations or intervals here
        document.body.classList.add('game-paused');
    } else {
        // Resume animations or intervals here
        shoot = setInterval(enemyShootBullet, 400)
        document.body.classList.remove('game-paused');
    }

}

function resume() {
    if (isPaused) {
        pause();
    }
}


function checkGameOver() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    const allKilled = Array.from(allEnemies).every(enemy => enemy.classList.contains("killed"))
    if (allKilled) {
        endGame();
    }
}

function update() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const allEnemies = enemiesContainer.querySelectorAll(".enemy");
    const allKilled = Array.from(allEnemies).some(enemy => enemy.classList.contains("killed"))
    if (allKilled) {
        allEnemies.forEach((e, i) => {
            if (e.classList.contains("")) {
                e.remove();
                e.splice(i, 1)
            }
        });
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


document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none";
    initializeGame();
    spawnEnemyFormation(3, 6);
});
