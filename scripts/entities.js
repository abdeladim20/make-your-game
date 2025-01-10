function moveEntities(deltaTime) {
    // Move bullets upward
    document.querySelectorAll(".bullet").forEach((bullet) => {
        const currentTop = parseFloat(bullet.style.top) || 0;
        if (currentTop <= 0) {
            bullet.remove(); // Remove bullets that go offscreen
        } else {
            bullet.style.top = `${currentTop - 5}px`;
        }
    });

    // Move enemies downward
    document.querySelectorAll(".enemy").forEach((enemy) => {
        const currentTop = parseFloat(enemy.style.top) || 0;
        enemy.style.top = `${currentTop + 1}px`;

        // Check if an enemy has reached the bottom
        if (currentTop > 600) {
            enemy.remove();
            loseLife();
        }
    });
}

function shootBullet() {
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.position = "absolute";
    bullet.style.width = "5px";
    bullet.style.height = "10px";
    bullet.style.background = "yellow";
    bullet.style.left = `${playerPosition + 22}px`; // Center the bullet on the player
    bullet.style.top = "550px"; // Start near the player's top edge
    document.getElementById("game-container").appendChild(bullet);
}

function spawnEnemy() {
    const enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.top = "0px";
    enemy.style.left = `${Math.random() * 760}px`; // Random horizontal position
    document.getElementById("game-container").appendChild(enemy);
}

// Spawn enemies periodically
setInterval(spawnEnemy, 2000); // Spawn an enemy every 2 seconds

function spawnPlayer() {
    const player = document.createElement("div");
    player.id = "player";
    player.style.position = "absolute";
    player.style.width = "50px";
    player.style.height = "50px";
    player.style.backgroundImage = "url('../assets/condom.png')"; // Set player's image
    player.style.backgroundSize = "cover";
    player.style.backgroundPosition = "center";
    player.style.backgroundRepeat = "no-repeat";
    player.style.left = `${playerPosition}px`; // Use `playerPosition` for horizontal placement
    player.style.bottom = "20px"; // Fixed position from the bottom
    document.getElementById("game-container").appendChild(player);
}
