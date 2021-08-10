// déclaration du canvas et du ctx (ce que je faire dans le canvas)
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// déclaration de mes variables
let x = Math.trunc(canvas.width / 2);

let snakeHeight = 5;
let snakeWidth = 5;
let cibleHeight = 10;
let cibleWidth = 10;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let cible = {
    x: Math.floor(Math.random() * canvas.width - (snakeWidth / 2)),
    y: Math.floor(Math.random() * canvas.height - (snakeHeight / 2)),
    height: cibleHeight,
    width: cibleWidth,
}
let snake = [
    {
        x: 2,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 7,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 12,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 17,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 22,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 27,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 32,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 37,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 42,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 47,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 52,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 57,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 62,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 67,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 72,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 77,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 82,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 87,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 92,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 97,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    },
    {
        x: 102,
        y: Math.trunc(canvas.height / 2),
        direction: "Right",
    }
];

function changeDirection(element, index, arraySnake) {
    if (arraySnake[index + 1] != undefined) {
        if (element.direction !== arraySnake[index + 1].direction) {
                return arraySnake[index + 1].direction;
        } else {
            return element.direction;
        }
    } else {
        return element.direction;
    }
}

function drawCible() {
    ctx.beginPath();
    ctx.rect(cible.x, cible.y, cible.height, cible.width);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawSnake() {
    snake.forEach(function (element, index) {
        console.log(element);
        console.log(index);
        console.log(snake[index + 1]);
        switch (element.direction) {
            case "Right" :
                element.x += 5;
                element.direction = changeDirection(element, index, snake);
                break;
            case "Left" :
                element.x += -5;
                element.direction = changeDirection(element, index, snake);
                break;
            case "Up" :
                element.y += -5;
                element.direction = changeDirection(element, index, snake);
                break;
            case "Down" :
                element.y += 5;
                element.direction = changeDirection(element, index, snake);
                break;
        }
        ctx.beginPath();
        ctx.rect(element.x, element.y, snakeWidth, snakeHeight);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    })
}

function draw() {
    snake.forEach(function (element) {
        ctx.clearRect(element.x, element.y, snakeWidth, snakeHeight);
    });
    drawSnake();
   // requestAnimationFrame(draw);
}

// se déclenche lorsque j'appuie sur une touche et éxécute la fonction keyDownHandler()
document.addEventListener("keydown", keyDownHandler);
// // se déclenche lorsque je relache une touche et éxécute la fonction keyUpHandler()
// document.addEventListener("keyup", keyUpHandler, false);

// // Quand j'appuie sur une touche je modifie la direction du snake
function keyDownHandler(event) {
    const lastBloc = snake.length - 1;
    if (event.key == "Right" || event.key == "ArrowRight") {
        if (snake[lastBloc].direction !== "Left") {
            snake[lastBloc].direction = "Right";
        }
    } else if (event.key == "Left" || event.key == "ArrowLeft") {
        if (snake[lastBloc].direction !== "Right") {
            snake[lastBloc].direction = "Left";
        }
    } else if (event.key == "Up" || event.key == "ArrowUp") {
        if (snake[lastBloc].direction !== "Down") {
            snake[lastBloc].direction = "Up";
        }
    } else if (event.key == "Down" || event.key == "ArrowDown") {
        if (snake[lastBloc].direction !== "Up") {
            snake[lastBloc].direction = "Down";
        }
    }
}

function snakeEatCible() {
    if (x > cible.x && x < cible.x + cibleWidth && y > cible.y && y < cible.y + cibleHeight) {
        console.log("ça marche");
        snakeWidth += cibleWidth;
        cible.x = Math.floor(Math.random() * canvas.width - (snakeWidth / 2));
        cible.y = Math.floor(Math.random() * canvas.height - (snakeHeight / 2));
    }
}

setInterval(draw, 200);
//draw();