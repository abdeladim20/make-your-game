const keys = {}; // Tracks key states
let playerPosition = 375; // Player's horizontal position (starting at the center)

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function handleInput() {
    const speed = 5; // Speed of player movement
    const containerWidth = 800; // Width of the game container
    const playerWidth = 50; // Width of the player

    if (keys["ArrowLeft"]) {
        playerPosition = Math.max(0, playerPosition - speed);
    }
    if (keys["ArrowRight"]) {
        playerPosition = Math.min(containerWidth - playerWidth, playerPosition + speed);
    }

    // Update player's position
    const player = document.getElementById("player");
    if (player) {
        player.style.left = `${playerPosition}px`;
    }
}
