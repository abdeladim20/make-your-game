let enemies = [];
let formation = null;
let formationDirection = 1;

function spawnEnemyFormation(rows, cols) {
    const gameContainer = document.getElementById("game-container");
    const cords = gameContainer.getBoundingClientRect();
    formation = document.createElement("div");
    formation.id = "enemy-formation";
    gameContainer.appendChild(formation);
    formation.style.top = `${cords.top + 20}px`;
    formation.style.left = `${Math.ceil(cords.left)}px`;
    formation.style.width = `${cols * 60}px`;
    formation.style.height = `${rows * 60}px`;
    formation.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
    formation.style.gridTemplateRows = `repeat(${rows}, 50px)`;
    formation.style.gap = "10px";

    // Add enemies to the formation
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            const enemy = document.createElement("div");
            enemy.className = "enemy";
            enemy.dataset.index = `${row}-${col}`;
            enemy.style.gridArea = `${row} / ${col}`;
            enemy.style.width = "40px";
            enemy.style.height = "40px";
            enemy.style.backgroundImage = "url('assets/images/enemy.png')";
            enemy.style.backgroundSize = "cover";
            enemy.style.backgroundPosition = "center";
            formation.appendChild(enemy);
        }
    }
}

let speedEnemy = 5;
let xx = 0;

function moveFormation() {
    const enemiesCntainer = document.getElementById("enemy-formation");
    const gameContainer = document.getElementById("game-container");
    if (!enemiesCntainer) {
        return
    }

    // if (!enemiesCntainer || !gameContainer) return;

    const gameRect = gameContainer.getBoundingClientRect();
    // const remainingEnemies = Array.from(enemiesContainer.querySelectorAll(".enemy:not(.killed)"));

    // if (remainingEnemies.length === 0) return; // Stop if no enemies remain

    // // Get dynamic leftmost and rightmost enemy positions
    // const leftMost = Math.min(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().left));
    // const rightMost = Math.max(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().right));

    // // let top = parseFloat(getComputedStyle(enemiesContainer).top) || 0;
    // // let left = parseFloat(getComputedStyle(enemiesContainer).left) || 0;
    // const enemiesContainerCords = enemiesCntainer.getBoundingClientRect();

    // const step = 5; // Movement step size

    // if (formationDirection === 1) {
    //     if (rightMost + step < gameRect.right) {
    //         enemiesContainerCords.left += step;
    //     } else {
    //         formationDirection *= -1;
    //         top += 20; // Move down when hitting the right border
    //     }
    // } else {
    //     if (leftMost - step > gameRect.left) {
    //         left -= step;
    //     } else {
    //         formationDirection *= -1;   
    //         top += 20; // Move down when hitting the left border
    //     }
    // }

    // // Update position
    // enemiesContainer.style.top = `${top}px`;
    console.log('out', speedEnemy);
    console.log("out", xx);


    const enemiesContainerCords = enemiesCntainer.getBoundingClientRect();
    if (enemiesContainerCords.right > gameRect.right || enemiesContainerCords.left < gameRect.left) {
        speedEnemy *= -1;
        enemiesCntainer.style.top = `${enemiesContainerCords.top + 7}px`
    }

    xx += speedEnemy
    enemiesCntainer.style.transform = `translateX(${xx}px)`;
}


let enemyBullets = [];

// update the lives display
function updateLives() {
    const livesDisplay = document.getElementById("lives");
    livesDisplay.textContent = `Lives: ${lives}`;
}

// make an enemy shoot a bullet
function enemyShootBullet() {

    const enemiesContainer = document.getElementById("enemy-formation")
    if (enemiesContainer) {

        const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");

        if (enemyElements.length === 0) return;

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

        if (
            bullet.element.getBoundingClientRect().left < playerRect.right &&
            bullet.element.getBoundingClientRect().right > playerRect.left &&
            bullet.element.getBoundingClientRect().top < playerRect.bottom &&
            bullet.element.getBoundingClientRect().bottom > playerRect.top
        ) {
            bullet.element.remove();
            enemyBullets.splice(index, 1);
            lives--;
            updateLives();

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

let shoot = setInterval(enemyShootBullet, 400);