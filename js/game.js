const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "image/ground.png"

const food = new Image();
food.src = "image/food.png"

let box = 32;

let score = 0;

let foodInterval = {};

function foodIntervalSet() {
    foodInterval.x = Math.floor(Math.random() * 17 + 1) * box;
    foodInterval.y = Math.floor(Math.random() * 15 + 3) * box;
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == foodInterval.x && snake[i].y == foodInterval.y)
            foodIntervalSet();
    }
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 9 * box
}

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}

function drawGame() {
    //ctx.drawImage(ground, 0, 0);  //Фон
    ctx.clearRect(0, 0, box * 19, box * 19);
    ctx.drawImage(food, foodInterval.x, foodInterval.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "red" : "yellow";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 17, box * 1.8);

    ctx.strokeRect(box, box * 3, box * 17, box * 15);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == foodInterval.x && snakeY == foodInterval.y) {
        score++;
        foodIntervalSet()
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 
        || snakeY < box * 3 || snakeY > box * 17)
        clearInterval(game);

    if (dir == "left") snakeX -= box; else
    if (dir == "right") snakeX += box; else
    if (dir == "up") snakeY -= box; else
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100)

foodIntervalSet();