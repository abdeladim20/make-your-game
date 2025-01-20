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
        enemy.id = i;
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
    const player = document.getElementById("player");

    if (!enemiesContainer || !player || !gameContainer) return;

    const playerRect = player.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();
    const enemiesRect = enemiesContainer.getBoundingClientRect();

    // Current position and movement direction
    let top = parseFloat(getComputedStyle(enemiesContainer).top) || 0;
    let left = parseFloat(getComputedStyle(enemiesContainer).left) || 0;

    // Horizontal and vertical direction stored in data attributes
    let horizontalDirection = enemiesContainer.dataset.horizontalDirection || "right";
    let verticalDirection = enemiesContainer.dataset.verticalDirection || "down";

    const step = 1; // Movement step size

    // Check if enemies have reached the top of the player
    if (verticalDirection === "down" && enemiesRect.bottom >= playerRect.top) {
        verticalDirection = "up"; // Change direction to move up
    }

    // Move formation vertically
    if (verticalDirection === "down") {
        top += step;
    } else if (verticalDirection === "up") {
        if (top > 0) {
            top -= step;
        } else {
            verticalDirection = "down"; // Change direction back to down when reaching the top of the container
        }
    }

    // Horizontal movement logic
    if (horizontalDirection === "right") {
        if (enemiesRect.right + step < gameRect.right) {
            left += step;
        } else {
            horizontalDirection = "left";
        }
    } else if (horizontalDirection === "left") {
        if (enemiesRect.left - step > gameRect.left) {
            left -= step;
        } else {
            horizontalDirection = "right";
        }
    }

    // Update enemy formation position
    enemiesContainer.style.left = `${left}px`;
    enemiesContainer.style.top = `${top}px`;

    // Save the updated direction
    enemiesContainer.dataset.horizontalDirection = horizontalDirection;
    enemiesContainer.dataset.verticalDirection = verticalDirection;
}

// Call this function repeatedly to move the formation
setInterval(moveFormation, 50); // Adjust the interval for smoother or faster movement

// function moveFormation() {
//     const gameContainer = document.getElementById("game-container");
//     const containerWidth = gameContainer.offsetWidth;

//     if (formation) {
//         const formationRect = formation.getBoundingClientRect();
//         const left = formation.offsetLeft;

//         // Reverse direction if the formation hits the container edges
//         if (left <= 0 || left + formationRect.width >= containerWidth) {
//             formationDirection *= -1; // Reverse direction
//             formation.style.top = `${formation.offsetTop + 20}px`; // Move down when changing direction
//         }

//         // Move the formation
//         formation.style.left = `${left + formationDirection * 2}px`;
//     }
// }

