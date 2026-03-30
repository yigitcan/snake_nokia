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

  let touchStart = null;
  const swipeMinPx = 20;

  window.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      touchStart = { x: touch.clientX, y: touch.clientY };
    },
    { passive: true }
  );

  window.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart) {
        return;
      }

      const touch = event.changedTouches[0];
      if (!touch) {
        touchStart = null;
        return;
      }

      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      touchStart = null;

      if (Math.abs(dx) < swipeMinPx && Math.abs(dy) < swipeMinPx) {
        return;
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        onDirection(dx > 0 ? 1 : -1, 0);
        return;
      }

      onDirection(0, dy > 0 ? 1 : -1);
    },
    { passive: true }
  );
}
