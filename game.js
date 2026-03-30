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
const pauseButton = document.getElementById("pause");
const restartButton = document.getElementById("restart");

initGame(ctx, scoreEl, statusEl, highScoreEl);

initInput({
  onDirection: setDirection,
  onPause: togglePause,
  onRestart: startGame,
});

pauseButton.addEventListener("click", togglePause);
restartButton.addEventListener("click", startGame);

startGame();
