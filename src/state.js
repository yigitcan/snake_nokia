export const state = {
  snake: [],
  direction: { x: 1, y: 0 },
  queuedDirection: { x: 1, y: 0 },
  food: { x: 0, y: 0 },
  score: 0,
  highScore: 0,
  gameOver: false,
  started: false,
  paused: false,
  tickTimeout: null,
};

export function resetState() {
  state.snake = [
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ];
  state.direction = { x: 1, y: 0 };
  state.queuedDirection = { x: 1, y: 0 };
  state.score = 0;
  state.gameOver = false;
  state.started = false;
  state.paused = false;
  clearTimeout(state.tickTimeout);
  state.tickTimeout = null;
}
