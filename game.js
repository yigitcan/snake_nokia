import {
  initGame,
  setDirection,
  startGame,
  togglePause,
} from "./src/game.js";
import { initInput } from "./src/input.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const highScoreEl = document.getElementById("high-score");
const restartButton = document.getElementById("restart");

initGame(ctx, scoreEl, statusEl, highScoreEl);

initInput({
  onDirection: setDirection,
  onPause: togglePause,
  onRestart: startGame,
});

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

restartButton.addEventListener("click", startGame);

startGame();
