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
function isCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function moveFormation() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const gameContainer = document.getElementById("game-container");
    const player = document.getElementById("player");

    if (!enemiesContainer || !player || !gameContainer) return;

    const playerRect = player.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();

    // Current enemy formation position
    let top = parseFloat(getComputedStyle(enemiesContainer).top) || 0;
    let left = parseFloat(getComputedStyle(enemiesContainer).left) || 0;
    for (let index = 0; index < enemies.length; index++) {
        let enemiesRect = enemiesContainer.getBoundingClientRect();
        console.log(enemiesRect);
        
        if(isCollision(enemiesRect, playerRect)) {
        console.log('player top');
         endGame();
        }
         
     }
    // Check if enemies are close to the player's border
    let enemiesRect = enemiesContainer.getBoundingClientRect();

    if (enemiesRect.bottom > gameRect.bottom) {
        top -= 20; // Move up by 20px
        enemiesContainer.style.top = `${top}px`;
        left += 10; // Shift slightly to avoid direct vertical descent
        enemiesContainer.style.left = `${left}px`;
        // return;
    }else if (enemiesRect.bottom == gameRect.bottom){   
        console.log('rect bottom');
        endGame()
    }

    // Regular horizontal movement logic (move left or right)
    let direction = enemiesContainer.dataset.direction || "right"; // Save direction as a dataset property
    const step = 5; // Movement step size

    if (direction === "right") {
        if (enemiesRect.right + step < gameRect.right) {
            left += step;
        } else {
            direction = "left";
            top += 20; // Move down when hitting a border
        }
    } else if (direction === "left") {
        if (enemiesRect.left - step > gameRect.left) {
            left -= step;
        } else {
            direction = "right";
            top += 20; // Move down when hitting a border
        }
    }

    // Update position
    enemiesContainer.style.left = `${left}px`;
    enemiesContainer.style.top = `${top}px`;

    // Save the updated direction
    enemiesContainer.dataset.direction = direction;
}

// Call this function repeatedly to move the formation
setInterval(moveFormation, 50); // Adjust the interval for smoother or faster movement