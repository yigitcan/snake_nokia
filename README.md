# Snake 3300

A tiny browser Snake game with a retro Nokia-style screen and native ES modules.

## Run it locally

Because the app uses `<script type="module">`, open it through a local HTTP server instead of `file://`.

One simple option:

```bash
npx serve .
```

You can also use VS Code Live Server or any static server you already like.

## Controls

- Arrow keys or `WASD`: move
- `P` or `Esc`: pause / resume
- `R`: restart

## Current structure

- `index.html`: shell and HUD markup
- `styles.css`: retro Nokia-inspired styling
- `game.js`: thin browser entry point
- `src/`: game modules for constants, state, rendering, input, and core logic

## Notes

- High score is stored in `localStorage` when the browser allows it.
- Touch swipe controls are supported.
- Opening the page directly as `file://` will block module imports in the browser.
