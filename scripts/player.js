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
    let image = "url('assets/images/player.png')";
    const gameContainer = document.getElementById("game-container");
    const player = document.getElementById("player");

    if (!gameContainer || !player) return;

    const maxRight = gameContainer.clientWidth - player.clientWidth;

    if (keys["ArrowLeft"]) {
        image = "url('assets/images/playerleft.png')";
        playerPosition = Math.max(0, playerPosition - playerSpeed);
    } else if (keys["ArrowRight"]) {
        image = "url('assets/images/playerright.png')";
        playerPosition = Math.min(maxRight, playerPosition + playerSpeed);
    }

    if (keys[" "] && gameRunning && canShoot) {
        shootBullet();
    }

    if (player.style.backgroundImage !== image) {
        player.style.backgroundImage = image;
    }
    player.style.left = `${playerPosition}px`;
}

function shootBullet() {
    const player = document.getElementById("player");
    if (!player || !canShoot) return;
    canShoot = false;
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.position = "absolute";
    bullet.style.left = `${playerPosition + 22.5}px`;
    bullet.style.bottom = "70px";

    document.getElementById("game-container").appendChild(bullet);

    bullets.push({ element: bullet, y: 70 });
    setTimeout(() => {
        canShoot = true;
    }, 300);
}
