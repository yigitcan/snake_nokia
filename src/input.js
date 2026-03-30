export function initInput({ onDirection, onPause, onRestart }) {
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const actions = {
      arrowup: () => onDirection(0, -1),
      w: () => onDirection(0, -1),
      arrowdown: () => onDirection(0, 1),
      s: () => onDirection(0, 1),
      arrowleft: () => onDirection(-1, 0),
      a: () => onDirection(-1, 0),
      arrowright: () => onDirection(1, 0),
      d: () => onDirection(1, 0),
    };

    const action = actions[key];
    if (action) {
      event.preventDefault();
      action();
      return;
    }

    if (key === "p" || key === "escape") {
      event.preventDefault();
      onPause();
      return;
    }

    if (key === "r") {
      event.preventDefault();
      onRestart();
    }
  });
}
