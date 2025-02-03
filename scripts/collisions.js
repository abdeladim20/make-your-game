let bullets = [];
let canShoot = true;
const end = document.getElementById('endGame');
end.style.display = "none";
const game = document.getElementById('game-container');
const s = document.getElementById('score')

function checkBulletCollisions() {
    const formations = document.querySelectorAll("#enemy-formation");
    const player = document.getElementById("player");

    if (!formations || !player) return;

    const playerRect = player.getBoundingClientRect();

    formations.forEach((enemiesContainer) => {
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            const bulletRect = bullet.element.getBoundingClientRect();
            const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
            enemyElements.forEach((enemy) => {
                const enemyRect = enemy.getBoundingClientRect();
                if (
                    bulletRect.left < enemyRect.right &&
                    bulletRect.right > enemyRect.left &&
                    bulletRect.top < enemyRect.bottom &&
                    bulletRect.bottom > enemyRect.top
                ) {
                    enemy.classList.add("killed");
                    enemy.style.backgroundImage = "url('assets/images/explo1.png')";

                    setTimeout(() => {
                        enemy.style.backgroundImage = "url('assets/images/explo2.png')";
                    }, 200);
                    setTimeout(() => {
                        enemy.style.backgroundImage = "none";
                    }, 300);
                    bullet.element.remove();
                    bullets.splice(i, 1);

                    updateScore(10);
                }
            });
        }
        const enemyElements = enemiesContainer.querySelectorAll(".enemy:not(.killed)");
        enemyElements.forEach((enemy) => {
            const enemyRect = enemy.getBoundingClientRect();

            if (
                playerRect.left < enemyRect.right &&
                playerRect.right > enemyRect.left &&
                playerRect.top < enemyRect.bottom &&
                playerRect.bottom > enemyRect.top
            ) {
                endGame();
            }
        });

        // Check if all enemies are killed and phase is 1
        if (enemiesContainer.querySelectorAll(".enemy:not(.killed)").length === 0 && phase === 1) {
            stopEnemyActions();
            gameRunning = false;
            isPaused = true;
            setTimeout(() => {
                game.innerHTML = '<div id="countdown"></div>';
                game.style.display = "none";
                document.getElementById("board").style.display = "none";
                stopGameLoop();
                stopTimer();
                phase = 2;
                playerPosition = 375;
                document.querySelectorAll(".mid").forEach(element => {
                    element.style.display = "block";
                });
            }, 700);
        }
    });
}



function checkBulletsMothership() {
    const player = document.getElementById("player");
    const mothership = document.getElementById("mothership");

    if (!mothership || !player) return;
    
    const shipRec = mothership.getBoundingClientRect();

    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        const bulletRect = bullet.element.getBoundingClientRect();

        if (
            bulletRect.left < shipRec.right &&
            bulletRect.right > shipRec.left &&
            bulletRect.top < shipRec.bottom &&
            bulletRect.bottom > shipRec.top
        ) {
            bullet.element.remove();
            bullets.splice(i, 1);

            mothershiplives--;
            takeDamage(mothership);
            updateMSLives();

            if (mothershiplives === 0) {
                // Explosion effect
                mothership.style.backgroundImage = "url('assets/images/explo.gif'), url('assets/images/mothership.png')";
                mothership.style.backgroundSize = "contain, cover"; 
                mothership.style.backgroundPosition = "center, center";
                mothership.style.backgroundRepeat = "no-repeat, no-repeat";

                updateScore(300);
                gameRunning = false;
                isPaused = true;
                stopEnemyActions();
                despawnEnemies();
                stopTimer();

                setTimeout(() => {
                    stopGameLoop();
                    document.getElementById("mothershiphp").style.display = "none";
                    stopTimer();
                    game.style.display = "none";
                    document.getElementById("board").style.display = "none";
                    document.querySelectorAll(".late").forEach(element => {
                        element.style.display = "block";
                    });
                }, 1500);
            }
        }
    }
}

function endGame() {
    document.getElementById("board").style.display = "none";
    gameRunning = false;
    isPaused = true;
    stopEnemyActions();
    stopTimer();
    clearInterval(enemyChange);
    clearInterval(enemyshooting);
    cancelAnimationFrame(req);
    end.style.display = "block";
    document.getElementById("scoreres").textContent = `Score: ${score}`;
    game.classList.add("blured");
}

function moveEntities() {
    // Move bullets
    bullets.forEach((bullet, index) => {
        bullet.y += 7;
        bullet.element.style.bottom = `${bullet.y}px`;

        // Remove bullet if it moves off-screen
        if (bullet.y > 850) {
            bullet.element.remove();
            bullets.splice(index, 1);
        }
    });
}