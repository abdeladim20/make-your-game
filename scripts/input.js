const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
    if (event.key == "p" && gameRunning == true) {
        pause();
    }
})

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;

    if (event.key === " " && gameRunning && canShoot) {
        shootBullet()
    }
});
