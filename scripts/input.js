const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;

    // Shoot on Spacebar press
    if (event.key === " " && gameRunning && canShoot) {
        shootBullet()
    }
});
