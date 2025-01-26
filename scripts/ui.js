let score = 0;
let lives = 3;

function updateUI() {
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("lives").textContent = `Lives: ${lives}`;
}

function resetUI() {
    score = 0;
    lives = 3;
    updateUI();
}

function updateScore(points) {
    score += points;
    document.getElementById("score").innerText = `Score: ${score}`;
}

// function updateLives(change) {
//     lives += change;
//     document.getElementById("lives").innerText = `Lives: ${lives}`;
// }