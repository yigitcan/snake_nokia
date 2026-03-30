import {
  BASE_SPEED,
  LS_HIGH_SCORE_KEY,
  MIN_SPEED,
  SPEED_FAST_THRESHOLD,
  SPEED_DELTA,
  TILE_COUNT,
} from "./constants.js";
import { draw } from "./renderer.js";
import { resetState, state } from "./state.js";

let ctxRef;
let scoreElRef;
let statusElRef;
let highScoreElRef;

function saveHighScore(score) {
  try {
    localStorage.setItem(LS_HIGH_SCORE_KEY, String(score));
  } catch {
    // Ignore storage failures so the game still works in private mode.
  }
}

function loadHighScore() {
  try {
    return parseInt(localStorage.getItem(LS_HIGH_SCORE_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

export function initGame(ctx, scoreEl, statusEl, highScoreEl) {
  ctxRef = ctx;
  scoreElRef = scoreEl;
  statusElRef = statusEl;
  highScoreElRef = highScoreEl;
  state.highScore = loadHighScore();
  highScoreElRef.textContent = String(state.highScore);
}

function randomCell() {
  return {
    x: Math.floor(Math.random() * TILE_COUNT),
    y: Math.floor(Math.random() * TILE_COUNT),
  };
}

function placeFood() {
  let nextFood = randomCell();

  while (
    state.snake.some(
      (segment) => segment.x === nextFood.x && segment.y === nextFood.y
    )
  ) {
    nextFood = randomCell();
  }

  state.food = nextFood;
}

export function startGame() {
  resetState();
  scoreElRef.textContent = "0";
  statusElRef.textContent = "press any arrow key";
  highScoreElRef.textContent = String(state.highScore);
  placeFood();
  draw(ctxRef, state);
}

export function setDirection(nextX, nextY) {
  if (state.gameOver || state.paused) {
    return;
  }

  const isReverse =
    state.direction.x === -nextX && state.direction.y === -nextY;
  const isSameDirection =
    state.queuedDirection.x === nextX && state.queuedDirection.y === nextY;

  if (isReverse || isSameDirection) {
    return;
  }

  state.queuedDirection = { x: nextX, y: nextY };

  if (!state.started) {
    state.started = true;
    statusElRef.textContent = "survive.";
    tick();
  }
}

export function togglePause() {
  return;
}

function endGame() {
  state.gameOver = true;
  statusElRef.textContent = "game over. restart?";
  draw(ctxRef, state);
}

function tick() {
  if (state.gameOver || state.paused) {
    return;
  }

  state.direction = state.queuedDirection;

  const head = {
    x: state.snake[0].x + state.direction.x,
    y: state.snake[0].y + state.direction.y,
  };

  const hitWall =
    head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT;
  const hitSelf = state.snake.some(
    (segment) => segment.x === head.x && segment.y === head.y
  );

  if (hitWall || hitSelf) {
    endGame();
    return;
  }

  state.snake.unshift(head);

  if (head.x === state.food.x && head.y === state.food.y) {
    state.score += 1;
    scoreElRef.textContent = String(state.score);
    statusElRef.textContent =
      state.score >= SPEED_FAST_THRESHOLD ? "fast now." : "nice.";

    if (state.score > state.highScore) {
      state.highScore = state.score;
      highScoreElRef.textContent = String(state.highScore);
      saveHighScore(state.highScore);
    }

    placeFood();
  } else {
    state.snake.pop();
  }

  draw(ctxRef, state);

  const speed = Math.max(MIN_SPEED, BASE_SPEED - state.score * SPEED_DELTA);
  state.tickTimeout = setTimeout(tick, speed);
}
