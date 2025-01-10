

let isPaused = false;

function initializeGame() {
    // Reset player position
    playerPosition = 375;

    // Clear any existing entities
    document.querySelectorAll(".bullet, .enemy, #player").forEach((entity) => entity.remove());

    // Set initial UI values
    document.getElementById("score").textContent = `Score: 0`;
    document.getElementById("lives").textContent = `Lives: 3`;

    // Spawn the player
    spawnPlayer();

    // Start the game loop
    requestAnimationFrame(gameLoop);
}

