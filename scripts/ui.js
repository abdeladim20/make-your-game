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


function countdownandinit() {
    let current = 3;

    const countdownElement = document.getElementById('countdown');

    // Function to update the countdown
    const interval = setInterval(() => {
        countdownElement.textContent = current; // Update the DOM with the current countdown value

        if (current === 0) {
            countdownElement.style.display = "none"; 
            clearInterval(interval); // Stop the countdown
            initializeGame(); // Execute the provided function
        } else {
            current--;
        }
    }, 1000); // Run every 1 second
}

// Example usage:
// countdown(3, () => {
//     const countdownElement = document.getElementById('countdown');
//     countdownElement.textContent = "Go!"; // Update the DOM to show "Go!"
//     console.log("Countdown complete!");
// });
// function updateLives(change) {
//     lives += change;
//     document.getElementById("lives").innerText = `Lives: ${lives}`;
// }