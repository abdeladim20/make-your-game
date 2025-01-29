let isPaused = false;
let gameRunning = false;
let req;
let phase = 1;

function stopGameLoop() {
    cancelAnimationFrame(req);
    gameRunning = false; // Set a flag if needed
}

function initializeGame1() {
    gameRunning = true;
    isPaused = false;
    resetUI();
    spawnEnemyFormation(3, 6);
    spawnPlayer();
    gameLoop();
}

function initializeGame2() {
    gameRunning = true;
    isPaused = false;
    game.style.display = "flex"
    document.getElementById("board").style.display = "flex";
    spawnMotherShip();
    spawnPlayer();
    //gameLoop();
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
