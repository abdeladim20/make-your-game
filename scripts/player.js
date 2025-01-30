let playerPosition = 375;
const playerSpeed = 5;

function spawnPlayer() {
    const player = document.createElement("div");
    player.id = "player";
    player.style.position = "absolute";
    player.style.width = "60px";
    player.style.height = "60px";
    player.style.backgroundImage = "url('assets/images/player.png')";
    player.style.backgroundSize = "cover";
    player.style.left = `${playerPosition}px`;
    player.style.bottom = "20px";
    document.getElementById("game-container").appendChild(player);
}

function movePlayer() {
    let image = "url('assets/images/player.png')"
    if (keys["ArrowLeft"]) {
        image = "url('assets/images/playerleft.png')"
        playerPosition = Math.max(0, playerPosition - playerSpeed);
    }
    if (keys["ArrowRight"]) {
        image = "url('assets/images/playerright.png')"
        playerPosition = Math.min(781, playerPosition + playerSpeed);
    }
    if (keys[" "] && gameRunning && canShoot) {
        shootBullet()
    }

    const player = document.getElementById("player");
    if (player) {
        player.style.backgroundImage = image
        player.style.left = `${playerPosition}px`;
    }
}
