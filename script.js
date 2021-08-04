let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// imprime un rond vert sur le canevas
// ctx.beginPath(); // début des instructions
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green"; // stocke une couleur qui sera utilisée par la méthode fill()
// ctx.fill();
// ctx.closePath();  // fin des instructions

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height); // efface l'écran a chaque démarage de la fonction draw
    drawBall();
    drawPaddle();
    if (y + dy < ballRadius) { // si la balle arrive au bord haut on inverse le mouvement
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) { // la balle arrive en bas de l'écran mais touche la raquette
            dy = -dy;
        }
        else {
         alert("GAME OVER !!");  // si la balle arrive au bord bas on déclenche un game over
        document.location.reload();
        clearInterval(interval); // Pour mettre fin au jeu sur Chrome
        }
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {  // si la balle arrive au bord gauche ou au bord droit on inverse le mouvement
        dx = -dx;
    }
    x += dx;
    y += dy;

    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {   // on déplace la raquette
            paddleX = canvas.width - paddleWidth;     // si la raquette arrive au bord du screen on empéche qu'elle sorte du screen
        }
    }
    else if (leftPressed) {
        paddleX += -7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

}

document.addEventListener("keydown", keyDownHandler, false); // se déclenche lorsque j'appuie sur une touche et éxécute la fonction keyDownHandler()
document.addEventListener("keyup", keyUpHandler, false); // se déclenche lorsque je relache une touche et éxécute la fonction keyUpHandler()

function keyDownHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed =true;
    }
}

function keyUpHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    }
}

let interval = setInterval(draw, 10);  // la fonction draw sera executé toutes les 10  millisecondes