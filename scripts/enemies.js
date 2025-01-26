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

// const gameContainer = document.getElementById("game-container");
// const player = document.getElementById("player");
// const enemyFormation = document.getElementById("enemy-formation"); // Reference to enemy container

// function fireEnemyBullet(enemy) {
//     const bullet = document.createElement("div");
//     bullet.classList.add("enemybullet");

//     // Set initial position based on the enemy's position
//     const enemyRect = enemy.getBoundingClientRect();
//     const containerRect = gameContainer.getBoundingClientRect();
//     bullet.style.position = "absolute";
//     bullet.style.left = `${enemyRect.left + enemyRect.width / 2 - containerRect.left}px`;
//     bullet.style.top = `${enemyRect.bottom - containerRect.top}px`;

//     // Add the bullet to the game container
//     gameContainer.appendChild(bullet);

//     // Move the bullet downward
//     const bulletInterval = setInterval(() => {
//         const bulletTop = parseFloat(bullet.style.top);
//         bullet.style.top = `${bulletTop + 5}px`;

//         // Check for collision with the player
//         const bulletRect = bullet.getBoundingClientRect();
//         const playerRect = player.getBoundingClientRect();
//         if (
//             bulletRect.left < playerRect.right &&
//             bulletRect.right > playerRect.left &&
//             bulletRect.top < playerRect.bottom &&
//             bulletRect.bottom > playerRect.top
//         ) {
//             console.log("Player hit!");
//             bullet.remove();
//             clearInterval(bulletInterval);
//         }

//         // Remove the bullet if it goes out of bounds
//         if (bulletTop > gameContainer.offsetHeight) {
//             bullet.remove();
//             clearInterval(bulletInterval);
//         }
//     }, 20); // Adjust speed as needed
// }

function startEnemyFiring() {
    const enemiesContainer = document.getElementById("enemy-formation");
    console.log("Starting enemy firing...");

    if (!enemiesContainer) {
        console.error("Enemy formation not found!");
        return;
    }

    const enemies =  enemiesContainer.querySelectorAll(".enemy"); // Get all enemies inside the formation
    enemies.forEach((enemy) => {
        // Set an interval for each enemy to fire bullets
        setInterval(() => {
            if (document.body.contains(enemy)) {
                fireEnemyBullet(enemy);
            }
        }, Math.random() * 2000 + 1000); // Random interval between 1 and 3 seconds
    });
}



// Start enemy firing logic
startEnemyFiring();
