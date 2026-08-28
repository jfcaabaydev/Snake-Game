const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const currentScore = document.getElementById("currentScore");
const gameOverMessage = document.getElementById("gameOverMessage");
const finalScore = document.getElementById("finalScore");
const cellSize = 20;
const gridSize = 20;
const restartButton = document.getElementById("restartButton");
let snake = [{x: 10, y: 10}];
let snakeDirection = {x: 1, y: 0};
let foodPosition = {x: 5, y: 5};
let gameScore = 0;

document.addEventListener("keydown", (event) => {
let newDirection = {};  

if (event.key === "ArrowUp") {
  newDirection = {x: 0, y: -1};
} else if (event.key === "ArrowDown") {
  newDirection = {x: 0, y: 1};
} else if (event.key === "ArrowLeft") {
  newDirection = {x: -1, y: 0};
} else if (event.key === "ArrowRight") {
  newDirection = {x: 1, y: 0};
} else {
  return;
}

if (newDirection.x === -snakeDirection.x && newDirection.y === -snakeDirection.y) {
  return;
} else {
  snakeDirection = newDirection;
}
});

restartButton.addEventListener("click", handleRestart);

let gameInterval = setInterval(() => {
  move();
  draw();
}, 150);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(foodPosition.x * cellSize, foodPosition.y * cellSize, cellSize, cellSize);

  // Snake
  ctx.fillStyle = "#000000";
  snake.forEach((segment) => {
  ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  }); 
}
function move() {
const newHead = {x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y};
if (checkCollision(newHead)) {
  gameOver();
  return;
}

  snake.unshift(newHead);

if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
  gameScore += 1;
  spawnFood();
  currentScore.textContent = `Score: ${gameScore}`;
} else {
  snake.pop();
};
}
function spawnFood() {
  foodPosition = {x: Math.floor(Math.random() * gridSize),y: Math.floor(Math.random() * gridSize)};
}
function checkCollision(newHead) {
  if (newHead.x < 0 || newHead.x >= gridSize) {
    return true;
  } else if (newHead.y < 0 || newHead.y >= gridSize) {
    return true;
  } else if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    return true;
  } else {
    return false;
  }
}
function gameOver() {
  clearInterval(gameInterval);
  currentScore.classList.add("hidden");
  gameOverMessage.classList.remove("hidden");
  finalScore.textContent = `Final Score: ${gameScore}`;
}
function handleRestart() {
  snake = [{x: 10, y: 10}];
  snakeDirection = {x: 1, y: 0};
  foodPosition = {x: 5, y: 5};
  gameScore = 0;
  currentScore.classList.remove("hidden");
  currentScore.textContent = "Score: 0";
  gameOverMessage.classList.add("hidden");
  gameInterval = setInterval(() => {
  move();
  draw();
}, 150);
}
