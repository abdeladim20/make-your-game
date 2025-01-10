// Global variables for game state
let lastTime = 0; // Tracks the last frame timestamp
let isPaused = false; // Tracks if the game is paused
const FPS = 60;
const FRAME_DURATION = 1000 / FPS; // Approx 16.67 ms per frame

// Main game loop function
function gameLoop(timestamp) {
    if (isPaused) {
        return; // Stop the loop if the game is paused
    }

    // Calculate the time difference since the last frame
    const deltaTime = timestamp - lastTime;

    // Update the game state if enough time has passed for a new frame
    if (deltaTime >= FRAME_DURATION) {
        update(deltaTime); // Update game logic
        render();          // Render the frame
        lastTime = timestamp; // Save the timestamp for the next frame
    }

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
function startGame() {
    lastTime = performance.now(); // Initialize the first timestamp
    requestAnimationFrame(gameLoop); // Start the loop
}

// Game logic: update positions, collisions, etc.
function update(deltaTime) {
    handleInput(); // Handle player input
    moveEntities(deltaTime); // Update player, enemies, bullets, etc.
    checkCollisions(); // Handle collisions
    updateUI(); // Update the score, lives, and other UI elements
}

// Render logic: update the DOM for game entities
function render() {
    // Update the DOM for entities, animations, etc.
    const player = document.getElementById("player");
    if (player) {
        player.style.transform = `translateX(${playerPosition}px)`;
    }
}

// Pause and resume the game
function togglePause() {
    isPaused = !isPaused;
    if (!isPaused) {
        requestAnimationFrame(gameLoop); // Resume the game loop
    }
}

// Initialize and start the game
document.addEventListener("DOMContentLoaded", () => {
    startGame();

    // Add a key listener to toggle pause with the Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") togglePause();
    });
});

function checkCollisions() {
    const bullets = document.querySelectorAll(".bullet");
    const enemies = document.querySelectorAll(".enemy");

    bullets.forEach((bullet) => {
        const bulletRect = bullet.getBoundingClientRect();

        enemies.forEach((enemy) => {
            const enemyRect = enemy.getBoundingClientRect();

            // Check if the bullet overlaps with an enemy
            if (
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top &&
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left
            ) {
                bullet.remove();
                enemy.remove();
                incrementScore();
            }
        });
    });
}