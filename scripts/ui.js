let score = 0;
let lives = 3;
let mothershiplives = 10;

function updateUI() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

function livesvisual() {
    let livesdiv = document.getElementById("lives");
    livesdiv.style.width = `${3 * 20}px`; // Adjust based on enemy width
    livesdiv.style.height = `${1 * 20}px`; // Adjust based on enemy height
    livesdiv.style.display = "grid";
    livesdiv.style.gridTemplateColumns = `repeat(${3}, 1fr)`;

    for (let i = 0; i < lives; i++) {
        heart = document.createElement("div");
        heart.id = "heart";
        heart.style.width = "20px";
        heart.style.height = "20px";
        heart.style.backgroundImage = "url('assets/images/heart.png')";
        heart.style.backgroundSize = "cover";
        heart.style.backgroundPosition = "center";
        livesdiv.appendChild(heart)
    }
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
        countdownElement.textContent = current;

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