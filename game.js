const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const restartButton = document.getElementById("restart");

const gridSize = 20;
const tileCount = canvas.width / gridSize;
const baseSpeed = 140;

let snake;
let direction;
let queuedDirection;
let food;
let score;
let gameOver;
let started;
let tickTimeout;

function randomCell() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function placeFood() {
  let nextFood = randomCell();

  while (snake.some((segment) => segment.x === nextFood.x && segment.y === nextFood.y)) {
    nextFood = randomCell();
  }

  food = nextFood;
}

function resetGame() {
  snake = [
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ];
  direction = { x: 1, y: 0 };
  queuedDirection = { x: 1, y: 0 };
  score = 0;
  gameOver = false;
  started = false;
  scoreEl.textContent = "0";
  statusEl.textContent = "press any arrow key";
  clearTimeout(tickTimeout);
  placeFood();
  draw();
}

function setDirection(nextX, nextY) {
  const isReverse = direction.x === -nextX && direction.y === -nextY;
  if (isReverse || gameOver) {
    return;
  }

  queuedDirection = { x: nextX, y: nextY };
  if (!started) {
    started = true;
    statusEl.textContent = "survive.";
    tick();
  }
}

function drawPixel(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < tileCount; y += 1) {
    for (let x = 0; x < tileCount; x += 1) {
      drawPixel(x, y, (x + y) % 2 === 0 ? "#b8c98f" : "#aec284");
    }
  }

  drawPixel(food.x, food.y, "#24351f");

  snake.forEach((segment, index) => {
    drawPixel(segment.x, segment.y, index === 0 ? "#24351f" : "#3d532f");
    ctx.strokeStyle = "#bdd09a";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      segment.x * gridSize + 0.5,
      segment.y * gridSize + 0.5,
      gridSize - 1,
      gridSize - 1
    );
  });
}

function endGame() {
  gameOver = true;
  statusEl.textContent = "game over. restart?";
  draw();

  ctx.fillStyle = "rgba(36, 53, 31, 0.75)";
  ctx.fillRect(40, 145, canvas.width - 80, 70);
  ctx.fillStyle = "#bdd09a";
  ctx.font = '20px "Courier New", monospace';
  ctx.textAlign = "center";
  ctx.fillText("game over", canvas.width / 2, 173);
  ctx.font = '14px "Courier New", monospace';
  ctx.fillText("press restart", canvas.width / 2, 195);
}

function tick() {
  if (gameOver) {
    return;
  }

  direction = queuedDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  const hitWall =
    head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount;
  const hitSelf = snake.some((segment) => segment.x === head.x && segment.y === head.y);

  if (hitWall || hitSelf) {
    endGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreEl.textContent = String(score);
    statusEl.textContent = score > 6 ? "fast now." : "nice.";
    placeFood();
  } else {
    snake.pop();
  }

  draw();

  const speed = Math.max(65, baseSpeed - score * 6);
  tickTimeout = setTimeout(tick, speed);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const actions = {
    arrowup: () => setDirection(0, -1),
    w: () => setDirection(0, -1),
    arrowdown: () => setDirection(0, 1),
    s: () => setDirection(0, 1),
    arrowleft: () => setDirection(-1, 0),
    a: () => setDirection(-1, 0),
    arrowright: () => setDirection(1, 0),
    d: () => setDirection(1, 0),
  };

  const action = actions[key];
  if (action) {
    event.preventDefault();
    action();
  }
});

restartButton.addEventListener("click", resetGame);

resetGame();
