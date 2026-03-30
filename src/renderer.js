import { COLOR, GRID_SIZE, TILE_COUNT } from "./constants.js";

export function drawBackground(ctx) {
  for (let y = 0; y < TILE_COUNT; y += 1) {
    for (let x = 0; x < TILE_COUNT; x += 1) {
      ctx.fillStyle = (x + y) % 2 === 0 ? COLOR.TILE_A : COLOR.TILE_B;
      ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }
}

export function drawFood(ctx, food) {
  ctx.fillStyle = COLOR.FOOD;
  ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

export function drawSnake(ctx, snake) {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? COLOR.SNAKE_HEAD : COLOR.SNAKE_BODY;
    ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    ctx.strokeStyle = COLOR.SNAKE_BORDER;
    ctx.lineWidth = 1;
    ctx.strokeRect(
      segment.x * GRID_SIZE + 0.5,
      segment.y * GRID_SIZE + 0.5,
      GRID_SIZE - 1,
      GRID_SIZE - 1
    );
  });
}

export function drawGameOverOverlay(ctx, canvasWidth, canvasHeight) {
  ctx.fillStyle = COLOR.OVERLAY_BG;
  ctx.fillRect(40, canvasHeight / 2 - 35, canvasWidth - 80, 70);
  ctx.fillStyle = COLOR.OVERLAY_TEXT;
  ctx.textAlign = "center";
  ctx.font = '20px "Courier New", monospace';
  ctx.fillText("game over", canvasWidth / 2, canvasHeight / 2 - 7);
  ctx.font = '14px "Courier New", monospace';
  ctx.fillText("press restart", canvasWidth / 2, canvasHeight / 2 + 15);
}

export function drawPauseOverlay(ctx, canvasWidth, canvasHeight) {
  ctx.fillStyle = COLOR.OVERLAY_BG;
  ctx.fillRect(40, canvasHeight / 2 - 35, canvasWidth - 80, 70);
  ctx.fillStyle = COLOR.OVERLAY_TEXT;
  ctx.textAlign = "center";
  ctx.font = '20px "Courier New", monospace';
  ctx.fillText("paused", canvasWidth / 2, canvasHeight / 2 - 7);
  ctx.font = '14px "Courier New", monospace';
  ctx.fillText("press p to resume", canvasWidth / 2, canvasHeight / 2 + 15);
}

export function draw(ctx, currentState) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawBackground(ctx);
  drawFood(ctx, currentState.food);
  drawSnake(ctx, currentState.snake);

  if (currentState.gameOver) {
    drawGameOverOverlay(ctx, ctx.canvas.width, ctx.canvas.height);
  }

  if (currentState.paused) {
    drawPauseOverlay(ctx, ctx.canvas.width, ctx.canvas.height);
  }
}
