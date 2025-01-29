let score = 0;
let lives = 3;
let mothershiplives = 10;

function updateUI() {
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("lives").textContent = `Lives: ${lives}`;
    document.getElementById("mslives").textContent = `Mothership: ${mothershiplives}`;
}

function resetUI() {
    score = 0;
    lives = 3;
    game.style.display = "flex"
    document.getElementById("board").style.display = "flex";
    updateUI();
}

function updateScore(points) {
    score += points;
    document.getElementById("score").innerText = `Score: ${score}`;
}


function countdownandinit() {
    let current = 1;

    const countdownElement = document.getElementById('countdown');

    // Function to update the countdown
    const interval = setInterval(() => {
        countdownElement.textContent = current; // Update the DOM with the current countdown value

        if (current === 0) {
            countdownElement.style.display = "none"; 
            clearInterval(interval); // Stop the countdown
            if (phase == 1) {
                initializeGame1(); // Execute the provided function
            } else {
                initializeGame2();
            }
        } else {
            current--;
        }
    }, 1000); // Run every 1 second
}