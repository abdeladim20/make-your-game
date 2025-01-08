import EnemyController from "./EnemyController.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.width= 600;
canvas.height = 600

const backgroud = new Image()
backgroud.src = "images/space.png"

const enemyController = new EnemyController(canvas)

function game() {
    context.drawImage(backgroud, 0, 0, canvas.width, canvas.height)
    enemyController.draw(context)
    requestAnimationFrame(game)
}

game();
