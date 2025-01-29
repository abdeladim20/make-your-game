let enemies = [];
let formation = null;
let formationDirection = 1; // 1 for right, -1 for left
let enemytrans = true

function spawnEnemyFormation(rows, cols) {
    const gameContainer = document.getElementById("game-container");
    // Create the formation container
    formation = document.createElement("div");
    formation.id = "enemy-formation";
    formation.style.position = "absolute";
    formation.style.margin = "0";
    formation.style.top = "60px"; // Initial position
    formation.style.left = "60px";
    formation.style.width = `${cols * 50}px`; // Adjust based on enemy width
    formation.style.height = `${rows * 50}px`; // Adjust based on enemy height
    formation.style.display = "grid";
    formation.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    formation.style.gridGap = "10px";

    // Add enemies to the formation
    for (let i = 0; i < rows * cols; i++) {
        const enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.dataset.index = i; // Unique identifier for each enemy
        enemy.style.width = "40px";
        enemy.style.height = "40px";
        enemy.style.backgroundImage = "url('assets/images/inimi2.png')";
        enemy.style.backgroundSize = "cover";
        enemy.style.backgroundPosition = "center";
        formation.appendChild(enemy);
    }

    gameContainer.appendChild(formation);
}

function moveFormation() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const gameContainer = document.getElementById("game-container");

    if (!enemiesContainer || !gameContainer) return;

    const gameRect = gameContainer.getBoundingClientRect();

    // Get all remaining enemies
    const remainingEnemies = Array.from(
        enemiesContainer.querySelectorAll(".enemy:not(.killed)")
    );

    if (remainingEnemies.length === 0) return; // Stop if no enemies remain

    // Calculate the bounding box for all remaining enemies
    const leftMost = Math.min(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().left));
    const rightMost = Math.max(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().right));
    // const topMost = Math.min(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().top));

    let top = parseFloat(getComputedStyle(enemiesContainer).top) || 0;
    let left = parseFloat(getComputedStyle(enemiesContainer).left) || 0;

    const step = 2;
    if (formationDirection === 1) {
        if (rightMost + step < gameRect.right) {
            left += step;
        } else {
            formationDirection = -1;
            top += 20; // Move down when hitting the right border
        }
    } else {
        if (leftMost - step > gameRect.left) {
            left -= step;
        } else {
            formationDirection = 1;
            top += 20; // Move down when hitting the left border
        }
    }

    // Update position
    enemiesContainer.style.left = `${left}px`;
    enemiesContainer.style.top = `${top}px`;
}

let enemyBullets = [];

// Function to update the lives display
function updateLives() {
    const livesDisplay = document.getElementById("lives");
    livesDisplay.textContent = `Lives: ${lives}`;
}

// Function to make an enemy shoot a bullet
function enemyShootBullet() {
    const enemiesContainer = document.getElementById("enemy-formation");
    // const enemyElements = enemiesContainer.querySelectorAll(".enemy");
    if (enemiesContainer) {
        const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");

        if (enemyElements.length === 0) return;

        // Choose a random enemy
        const randomEnemyIndex = Math.floor(Math.random() * enemyElements.length);
        const randomEnemy = enemyElements[randomEnemyIndex];

        // Create a bullet
        const bullet = document.createElement("div");
        bullet.className = "enemy-bullet";
        bullet.style.position = "absolute";
        bullet.style.width = "5px";
        bullet.style.height = "10px";
        bullet.style.backgroundColor = "red";

        // Position the bullet below the enemy
        const enemyRect = randomEnemy.getBoundingClientRect();
        const gameContainerRect = document.getElementById("game-container").getBoundingClientRect();
        bullet.style.left = `${enemyRect.left + enemyRect.width / 2 - gameContainerRect.left}px`;
        bullet.style.top = `${enemyRect.bottom - gameContainerRect.top}px`;

        // Add the bullet to the game container
        document.getElementById("game-container").appendChild(bullet);

        // Add the bullet to the enemyBullets array
        enemyBullets.push({ element: bullet, y: enemyRect.bottom - gameContainerRect.top });
    }
}

function moveEnemyBullets() {
    const player = document.getElementById("player");
    const playerRect = player.getBoundingClientRect();
    const gameContainerRect = document.getElementById("game-container").getBoundingClientRect();

    enemyBullets.forEach((bullet, index) => {
        bullet.y += 5;
        bullet.element.style.top = `${bullet.y}px`;

        // Check for collision with the player
        if (
            bullet.element.getBoundingClientRect().left < playerRect.right &&
            bullet.element.getBoundingClientRect().right > playerRect.left &&
            bullet.element.getBoundingClientRect().top < playerRect.bottom &&
            bullet.element.getBoundingClientRect().bottom > playerRect.top
        ) {
            // Remove bullet on collision
            bullet.element.remove();
            enemyBullets.splice(index, 1);

            lives--;
            updateLives();

            // Check if game over
            if (lives <= 0) {
                endGame();
            }
        }

        // Remove bullet if it goes off-screen
        if (bullet.y > gameContainerRect.height) {
            bullet.element.remove();
            enemyBullets.splice(index, 1);
        }
    });
}

setInterval(enemyShootBullet, 600);

function changeEnemyApperance() {
    const enemiesContainer = document.getElementById("enemy-formation");
    if (enemiesContainer) {
        const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
        if (enemytrans) {
            enemyElements.forEach((enemy) => {
                enemy.style.backgroundImage = "url('assets/images/inimi1.png')";
            });
            enemytrans = false
        } else {
            enemyElements.forEach((enemy) => {
                enemy.style.backgroundImage = "url('assets/images/inimi2.png')";
            });
            enemytrans = true
        }
    }
}

let shoot = setInterval(changeEnemyApperance, 600);