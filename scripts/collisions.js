let bullets = [];
let canShoot = true;
const end = document.getElementById('endGame');
end.style.display = "none";
const game = document.getElementById('game-container');
const s = document.getElementById('score')

function checkBulletCollisions() {
    const enemiesContainer = document.getElementById("enemy-formation");
    const player = document.getElementById("player");

    if (!enemiesContainer || !player) return;

    const playerRect = player.getBoundingClientRect();

    // Check collisions between bullets and enemies
    bullets.forEach((bullet, bulletIndex) => {
        const bulletRect = bullet.element.getBoundingClientRect();

        // Check each enemy within the formation
        const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
        enemyElements.forEach((enemy) => {
            const enemyRect = enemy.getBoundingClientRect();

            // Check if bullet intersects with enemy
            if (
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top
            ) {
                // Mark enemy as killed
                enemy.classList.add("killed");

                // Update appearance
                enemy.style.backgroundColor = "transparent";
                enemy.style.backgroundImage = "none";

                // Remove the bullet
                bullet.element.remove();
                bullets.splice(bulletIndex, 1);

                // Update score
                updateScore(10);

                // Check if all enemies are killed
                if (enemiesContainer.querySelectorAll(".enemy:not(.killed)").length === 0) {
                    endGame();
                }
            }
        });
    });

    // Check for collision between enemies and player
    const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
    enemyElements.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();

        if (
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top
        ) {
            // End the game if enemy collides with the player
            endGame();
        }
    });
}


function endGame() {
    gameRunning = false;  // Stop the game loop
    isPaused = true;     // Optionally pause everything
    // alert("Game Over! Final Score: " + score); // Show game over message
    // return
    cancelAnimationFrame(req);
    end.style.display = "block";
    end.appendChild(s)
    game.classList.add("blured")
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
