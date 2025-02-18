let enemies = [];
let enemyBullets = [];
let formation = null;
let formationDirection = 1;
let mothershipDirection = 1;
let enemytrans = true
let MSenemies;
let enemyChange;
let enemyshooting;


function spawnEnemyFormation(rows, cols) {
    let enemyindex = 1;
    const gameContainer = document.getElementById("game-container");
    formation = document.createElement("div");
    formation.id = "enemy-formation";
    formation.style.position = "absolute";
    formation.style.margin = "0";
    formation.style.top = "5px";
    formation.style.left = "0px";
    formation.style.width = `${cols * 50}px`;
    formation.style.height = `${rows * 50}px`;
    formation.style.display = "grid";
    formation.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.dataset.index = i;
        enemyindex = Math.ceil((i + 1) / cols);
        enemy.style.backgroundImage = `url('assets/images/enemy${enemyindex}.gif')`;
        enemy.style.backgroundSize = "cover";
        enemy.style.backgroundPosition = "center";
        formation.appendChild(enemy);
    }
    gameContainer.appendChild(formation);
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

    if (remainingEnemies.length === 0) return;

    // Calculate the bounding box for all remaining enemies
    const leftMost = Math.min(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().left));
    const rightMost = Math.max(...remainingEnemies.map(enemy => enemy.getBoundingClientRect().right));

    let top = parseFloat(getComputedStyle(enemiesContainer).top) || 0;
    let left = parseFloat(getComputedStyle(enemiesContainer).left) || 0;

    const step = 2;
    if (formationDirection === 1) {
        if (rightMost + step < gameRect.right) {
            left += step;
        } else {
            formationDirection = -1;
            top += 20;
        }
    } else {
        if (leftMost - step > gameRect.left) {
            left -= step;
        } else {
            formationDirection = 1;
            top += 20;
        }
    }

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


// update the lives display
function updateLives() {
    const livesDisplay = document.getElementById("lives");
    const hearts = livesDisplay.querySelectorAll("#heart");
    if (hearts.length > 0) {
        hearts[hearts.length - 1].remove();
    }
}

function updateMSLives() {
    const livesDisplay = document.getElementById("mothershiphp");
    const hearts = livesDisplay.querySelectorAll("#wheart");
    if (hearts.length > 0) {
        hearts[hearts.length - 1].remove();
    }
}

function enemyShootBullet() {
   const enemiesContainers = document.querySelectorAll("#enemy-formation");
   enemiesContainers.forEach((enemiesContainer) => {
    const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
    
    if (enemyElements.length === 0) return;
        const randomEnemyIndex = Math.floor(Math.random() * enemyElements.length);
        const randomEnemy = enemyElements[randomEnemyIndex];

        const bullet = document.createElement("div");
        bullet.className = "enemy-bullet";
        bullet.style.position = "absolute";
        bullet.style.width = "5px";
        bullet.style.height = "10px";

        const enemyRect = randomEnemy.getBoundingClientRect();
        const gameContainerRect = document.getElementById("game-container").getBoundingClientRect();
        bullet.style.left = `${enemyRect.left + enemyRect.width / 2 - gameContainerRect.left}px`;
        bullet.style.top = `${enemyRect.bottom - gameContainerRect.top}px`;

        document.getElementById("game-container").appendChild(bullet);

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
            takeDamage(player);

            if (lives <= 0) {
                endGame();
            }
        }

        if (bullet.y > gameContainerRect.height) {
            bullet.element.remove();
            enemyBullets.splice(index, 1);
        }
    });
}

function spawnMotherShip() {
    const gameContainer = document.getElementById("game-container");
    MotherShip = document.createElement("div");
    MotherShip.id = "mothership";
    MotherShip.style.top = "10px";
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
    let enemyindex = 1;
    const mothership = document.getElementById("mothership");
    const gameContainer = document.getElementById("game-container");

    if (!mothership || !gameContainer) return;

    // Get the mothership's position relative to the game container
    const mothershipRect = mothership.getBoundingClientRect();
    const gameContainerRect = gameContainer.getBoundingClientRect();
    const formation = document.createElement("div");
    formation.id = "enemy-formation";
    formation.style.position = "absolute";
    formation.style.margin = "0";
    formation.style.width = `150px`;
    formation.style.height = `50px`;
    formation.style.display = "grid";
    formation.style.gridTemplateColumns = "repeat(3, 1fr)"; // Three enemies per row

    formation.style.left = `${mothershipRect.left - gameContainerRect.left}px`;
    formation.style.top = `${mothershipRect.bottom - gameContainerRect.top}px`;

    for (let i = 0; i < 3; i++) {
        if (enemyindex == 4) {
            enemyindex = 1;
        }
        const enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.style.width = "40px";
        enemy.style.height = "40px";
        enemy.style.backgroundImage = `url('assets/images/enemy${enemyindex}.gif')`;
        enemy.style.backgroundSize = "cover";
        enemy.style.backgroundPosition = "center";
        formation.appendChild(enemy);
        enemyindex++;
    }

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
        if (formationY > gameContainer.clientHeight) {
            formation.remove();
        }
    });
}

function startEnemyActions() {
    if (phase == 2) {
        MSenemies = setInterval(mothershipSpawnEnemies, 1000);
    }
    enemyshooting = setInterval(enemyShootBullet, 700);
}

function stopEnemyActions() {
    if (phase == 2) {
        clearInterval(MSenemies);
    }
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