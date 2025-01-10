let score = 0;
let lives = 3;

function incrementScore() {
    score += 10;
    document.getElementById("score").textContent = `Score: ${score}`;
}

function loseLife() {
    lives -= 1;
    document.getElementById("lives").textContent = `Lives: ${lives}`;

    if (lives <= 0) {
        endGame();
    }
}

function updateUI() {
    // This function can handle additional UI updates if necessary
}

function endGame() {
    isPaused = true;
    alert(`Game Over! Your final score is: ${score}`);
    resetGame();
}

function resetGame() {
    // Reset game state
    score = 0;
    lives = 3;
    playerPosition = 375;

    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("lives").textContent = `Lives: ${lives}`;

    // Remove all bullets and enemies
    document.querySelectorAll(".bullet, .enemy").forEach((entity) => entity.remove());

    isPaused = false;
    requestAnimationFrame(gameLoop); // Restart the game loop
}
