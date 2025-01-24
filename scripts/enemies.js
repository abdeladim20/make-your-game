let enemies = [];
let formation = null;
let formationDirection = 1; // 1 for right, -1 for left

function spawnEnemyFormation(rows, cols) {
    const gameContainer = document.getElementById("game-container");
    // Create the formation container
    formation = document.createElement("div");
    formation.id = "enemy-formation";
    formation.style.position = "absolute";
    formation.style.top = "50px"; // Initial position
    formation.style.left = "50px";
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
        enemy.style.backgroundImage = "url('assets/images/enemy.png')";
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
    const topMost = Math.min(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().top));

    let top = parseFloat(getComputedStyle(enemiesContainer).top) || 0;
    let left = parseFloat(getComputedStyle(enemiesContainer).left) || 0;

    const step = 5; // Movement step size
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
