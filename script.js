
// déclaration du canvas et du ctx (ce que je faire dans le canvas)
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// imprime un rond vert sur le canevas
// ctx.beginPath(); // début des instructions
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green"; // stocke une couleur qui sera utilisée par la méthode fill()
// ctx.fill();
// ctx.closePath();  // fin des instructions

// déclaration de mes variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffSetTop = 30;
let brickOffSetLeft = 30;
let score = 0;
let lives = 3;

// je place mes briques dans un tableau à deux dimensions
// c représente les colonnes de briques
// chaque colonne contient r les lignes de briques

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1}; // si le status de la brique est à 1 je la dessine
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            // si le status de la brique n'est pas a 1 elle a été touché et je ne la dessine pas
            if (bricks[c][r].status == 1) {
                // je détermine la position X de chaque brique en fonction de la taille d'une brique
                // de l'espacement entre les briques multiplié par le nombre de colonne
                // et je fais la même chose pour la position Y  mais avec les lignes
                let brickX = (c * (brickWidth + brickPadding)) + brickOffSetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffSetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran a chaque démarage de la fonction draw
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if (y + dy < ballRadius) { // si la balle arrive au bord haut on inverse le mouvement
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) { // la balle arrive en bas de l'écran mais touche la raquette
            dy = -dy;
        } else {
            lives --;     // si la balle arrive au bord bas on enlève une vie
            if (!lives) {   // si plus de vie on déclenche le game over
            alert("GAME OVER !!");
            document.location.reload();
            //clearInterval(interval); // Pour mettre fin au jeu sur Chrome
            }
            else {  // sinon on remet la balle au centre de la raquette
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
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
    } else if (leftPressed) {
        paddleX += -7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false); // se déclenche lorsque j'appuie sur une touche et éxécute la fonction keyDownHandler()
document.addEventListener("keyup", keyUpHandler, false); // se déclenche lorsque je relache une touche et éxécute la fonction keyUpHandler()
document.addEventListener("mousemove", mouseMoveHandler, false) // détecte le mouvement de la souris

function keyDownHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    } else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    } else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            // la variable b représente une brique
            let b = bricks[c][r];
            if (b.status == 1) {
                // calculs pour qu'il y ai une collision le centre de la balle doit répondre aux 4 conditions suivantes
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    // la brique a été touchée je passe son status à 0
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("Victory !!!!!!!!!! You Winnnn !!!!!");
                        document.location.reload();
                       // clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score : " + score, 8, 20);

}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives : " + lives, canvas.width - 65, 20)
}

//let interval = setInterval(draw, 10);  // la fonction draw sera executé toutes les 10  millisecondes
draw();

function mouseMoveHandler (event) {
    // Relative X représente la position de la souris sur le canvas
    let relativeX = event.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}