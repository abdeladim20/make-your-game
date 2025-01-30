let enemies = [];
let formation = null;
let formationDirection = 1; // 1 for right, -1 for left
let mothershipDirection = 1;
let enemytrans = true
let MSenemies;
let enemyChange;
let enemyshooting;


function spawnEnemyFormation(rows, cols) {
    const gameContainer = document.getElementById("game-container");
    // Create the formation container
    formation = document.createElement("div");
    formation.id = "enemy-formation";
    formation.style.position = "absolute";
    formation.style.margin = "0";
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
        enemy.dataset.index = i; // Unique identifier for each enemy
        enemy.style.width = "60px";
        enemy.style.height = "60px";
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
    const hearts = livesDisplay.querySelectorAll("#heart");
    if (hearts.length > 0) {
        hearts[hearts.length - 1].remove(); // Remove the last heart
    }
}

function updateMSLives() {
    const livesDisplay = document.getElementById("mothershiphp");
    const hearts = livesDisplay.querySelectorAll("#wheart");
    if (hearts.length > 0) {
        hearts[hearts.length - 1].remove(); // Remove the last heart
    }
}

// Function to make an enemy shoot a bullet
function enemyShootBullet() {
   const enemiesContainers = document.querySelectorAll("#enemy-formation");
   enemiesContainers.forEach((enemiesContainer) => {
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

        // Position the bullet below the enemy
        const enemyRect = randomEnemy.getBoundingClientRect();
        const gameContainerRect = document.getElementById("game-container").getBoundingClientRect();
        bullet.style.left = `${enemyRect.left + enemyRect.width / 2 - gameContainerRect.left}px`;
        bullet.style.top = `${enemyRect.bottom - gameContainerRect.top}px`;

        // Add the bullet to the game container
        document.getElementById("game-container").appendChild(bullet);

    // Add the bullet to the enemyBullets array
    enemyBullets.push({ element: bullet, y: enemyRect.bottom - gameContainerRect.top });
   })
}

function moveEnemyBullets() {
    const player = document.getElementById("player");
    const playerRect = player.getBoundingClientRect();
    const gameContainerRect = document.getElementById("game-container").getBoundingClientRect();

    enemyBullets.forEach((bullet, index) => {
        bullet.y += 7;
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
            takeDamage(player);

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



function changeEnemyApperance() {
    const enemiesContainers = document.querySelectorAll("#enemy-formation");
    // const enemiesContainer = document.getElementById("enemy-formation");
    enemiesContainers.forEach((enemiesContainer) => {
        const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
        if (enemytrans) {
            enemyElements.forEach((enemy) =>{
                enemy.style.backgroundImage = "url('assets/images/inimi1.png')";
            });
            enemytrans = false
        } else {
            enemyElements.forEach((enemy) =>{
                enemy.style.backgroundImage = "url('assets/images/inimi2.png')";
            });
            enemytrans = true
        }
    });
}

function spawnMotherShip() {
    const gameContainer = document.getElementById("game-container");
    // Create the formation container
    MotherShip = document.createElement("div");
    MotherShip.id = "mothership";
    MotherShip.style.top = "10px"; // Initial position
    MotherShip.style.left = "50px";
    MotherShip.style.position = "absolute";
    MotherShip.style.height = "80px";
    MotherShip.style.width = "210px";
    MotherShip.style.margin = "0";
    MotherShip.style.backgroundImage = "url('assets/images/mothership.png')"
    MotherShip.style.backgroundSize = "cover";
    MotherShip.style.backgroundPosition = "center";

    gameContainer.appendChild(MotherShip)
}

function moveMothership() {
    const mothership = document.getElementById("mothership");
    const gameContainer = document.getElementById("game-container");

    if (!mothership || !gameContainer) return;

    const gameRect = gameContainer.getBoundingClientRect();

    const leftMost = Math.min(mothership.getBoundingClientRect().left);
    const rightMost = Math.max(mothership.getBoundingClientRect().right);

    let left = parseFloat(getComputedStyle(mothership).left) || 0;

    const step = 2;
    if (mothershipDirection === 1) {
        if (rightMost + step < gameRect.right) {
            left += step;
        } else {
            mothershipDirection = -1;
        }
    } else {
        if (leftMost - step > gameRect.left) {
            left -= step;
        } else {
            mothershipDirection = 1;
        }
    }

    mothership.style.left = `${left}px`;
    mothership.style.top = `${top}px`;
}


function mothershipSpawnEnemies() {
    const mothership = document.getElementById("mothership");
    const gameContainer = document.getElementById("game-container");

    if (!mothership || !gameContainer) return;

    // Get the mothership's position relative to the game container
    const mothershipRect = mothership.getBoundingClientRect();
    const gameContainerRect = gameContainer.getBoundingClientRect();

    // Create enemy formation
    const formation = document.createElement("div");
    formation.id = "enemy-formation";
    formation.style.position = "absolute";
    formation.style.margin = "0";
    formation.style.width = `150px`; // Adjust based on formation size
    formation.style.height = `50px`;
    formation.style.display = "grid";
    formation.style.gridTemplateColumns = "repeat(3, 1fr)"; // Three enemies per row

    // Position the formation at the mothership's location
    formation.style.left = `${mothershipRect.left - gameContainerRect.left}px`;
    formation.style.top = `${mothershipRect.bottom - gameContainerRect.top}px`;

    // Spawn multiple enemies inside the formation
    for (let i = 0; i < 3; i++) { // Adjust number of enemies
        const enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.style.width = "40px";
        enemy.style.height = "40px";
        enemy.style.backgroundImage = "url('assets/images/inimi2.png')";
        enemy.style.backgroundSize = "cover";
        enemy.style.backgroundPosition = "center";
        formation.appendChild(enemy);
    }

    // Add formation to the game container
    gameContainer.appendChild(formation);
}

function moveEnemy() {
    const formations = document.querySelectorAll("#enemy-formation");
    const gameContainer = document.getElementById("game-container");

    if (!formations.length || !gameContainer) return;

    formations.forEach((formation) => {
        let formationY = parseInt(formation.style.top) || 0;
        formationY += 3;
        formation.style.top = `${formationY}px`;

        // Remove formation if it reaches the bottom
        if (formationY > gameContainer.clientHeight) {
            formation.remove();
        }
    });
}

function startEnemyActions() {
    if (phase == 2) {
        MSenemies = setInterval(mothershipSpawnEnemies, 1000);
    }
    enemyChange = setInterval(changeEnemyApperance, 600);
    enemyshooting = setInterval(enemyShootBullet, 700);
}

function stopEnemyActions() {
    if (phase == 2) {
        clearInterval(MSenemies);
    }
    clearInterval(enemyChange);
    clearInterval(enemyshooting);
}

function takeDamage(element) {
    element.style.filter= `invert(50%) sepia(100%) saturate(5000%) hue-rotate(0deg)`;
    setTimeout(()=>{
        element.style.filter= ``;
    }, 100)
}

function despawnEnemies() {
    const formations = document.querySelectorAll("#enemy-formation");
    formations.forEach((enemiesContainer) => {
    const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
    enemyElements.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();
            enemy.classList.add("killed");
            enemy.style.backgroundImage = "url('assets/images/explo1.png')";

            setTimeout(() => {
                enemy.style.backgroundImage = "url('assets/images/explo2.png')";
            }, 300)
            setTimeout(() => {
                enemy.style.backgroundImage = "none";
            }, 300)
        });
        enemiesContainer.remove;
    });
}