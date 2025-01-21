let bullets = [];
let canShoot = true;

function checkBulletCollisions() {
    const enemiesContainer = document.getElementById("enemy-formation");

    if (!enemiesContainer) return;

    bullets.forEach((bullet, bulletIndex) => {
        const bulletRect = bullet.element.getBoundingClientRect();

        // Check each enemy within the formation
        const enemyElements = enemiesContainer.querySelectorAll(".enemy");
        enemyElements.forEach((enemy) => {
            const enemyRect = enemy.getBoundingClientRect();

            // Check if bullet intersects with enemy
            if (
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top
            ) {
                // Change enemy class to 'killed'
                enemy.className = "killed";

                // Update appearance: make background transparent and remove background image
                enemy.style.backgroundColor = "transparent";
                enemy.style.backgroundImage = "none";

                // Remove the bullet
                bullet.element.remove();
                bullets.splice(bulletIndex, 1);

                // Optionally update score
                updateScore(10);
            }
        });
    });
}


function endGame() {
    gameRunning = false;
    alert("Game Over! Final Score: " + score);
    // Optionally reset the game
}



function shootBullet() {
    const player = document.getElementById("player");
    if (!player||!canShoot) return;
    canShoot = false;
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.position = "absolute";
    bullet.style.width = "5px";
    bullet.style.height = "10px";
    bullet.style.backgroundColor = "yellow";
    bullet.style.left = `${playerPosition + 22.5}px`; 
    bullet.style.bottom = "70px"; 

    document.getElementById("game-container").appendChild(bullet);

    bullets.push({ element: bullet, y: 70 });
    setTimeout(() => {
        canShoot = true;
    }, 300);
}

function moveEntities() {
    // Move bullets
    bullets.forEach((bullet, index) => {
        bullet.y += 5; // Move upwards
        bullet.element.style.bottom = `${bullet.y}px`;

        // Remove bullet if it moves off-screen
        if (bullet.y > 600) {
            bullet.element.remove(); // Remove from DOM
            bullets.splice(index, 1); // Remove from array
        }
    });
}
