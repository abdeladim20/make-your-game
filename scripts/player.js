let playerPosition = 375;
const playerSpeed = 5;

function spawnPlayer() {
    const player = document.createElement("div");
    player.id = "player";
    player.style.position = "absolute";
    player.style.width = "50px";
    player.style.height = "50px";
    player.style.backgroundImage = "url('assets/images/player.png')";
    player.style.backgroundSize = "cover";
    player.style.left = `${playerPosition}px`;
    player.style.bottom = "20px";
    document.getElementById("game-container").appendChild(player);
}

function movePlayer() {
    if (keys["ArrowLeft"]) {
        playerPosition = Math.max(0, playerPosition - playerSpeed);
    }
    if (keys["ArrowRight"]) {
        playerPosition = Math.min(750, playerPosition + playerSpeed);
    }

    const player = document.getElementById("player");
    if (player) {
        player.style.left = `${playerPosition}px`;
    }
}
