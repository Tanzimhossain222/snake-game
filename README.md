# Snake Game

A classic Snake game built with vanilla JavaScript, HTML5 Canvas, and ES Modules.

```
Play it: npx serve .
```

## Architecture

```
snake-game/
├── index.html              # Entry point — game loop, input handling, UI
├── package.json
│
├── src/
│   ├── board.js            # Board state: dimensions, food placement, bounds
│   ├── snake.js            # Snake state: movement, growth, direction, collision
│   ├── game.js             # Game logic: tick, score, win/lose, restart
│   └── renderer.js         # Canvas rendering: grid, snake, food, overlays
│
└── test/
    ├── board.test.js       # 14 tests — bounds, occupancy, food placement
    ├── snake.test.js       # 15 tests — movement, direction, self-collision
    └── game.test.js        # 12 tests — tick, eating, win, restart
```

## Module Responsibilities

### `src/board.js`

| Export | Purpose |
|---|---|
| `createBoard(w, h)` | Create board with dimensions |
| `isOutOfBounds(board, pos)` | Check if position is outside the grid |
| `isOccupied(board, pos, cells)` | Check if a cell is already taken |
| `placeFood(board, occupied)` | Place food on a random free cell |

### `src/snake.js`

| Export | Purpose |
|---|---|
| `createSnake(pos)` | Snake at position, default `{x:1,y:0}` right |
| `getHead(snake)` | Get head segment |
| `move(snake)` | Advance snake one step, pop tail |
| `grow(snake)` | Flag snake to grow on next move |
| `setDirection(snake, dir)` | Change direction (rejects reverse + zero) |
| `checkSelfCollision(snake)` | Head overlapping any body segment |

### `src/game.js`

| Export | Purpose |
|---|---|
| `createGame({w, h})` | New game: board + snake + food + state |
| `getState(game)` | Snapshot of game state for rendering |
| `tick(game)` | One game step: move, eat, check death/win |
| `changeDirection(game, dir)` | Forward direction change to snake |
| `restartGame(game)` | Reset game to fresh state |

### `src/renderer.js`

| Export | Purpose |
|---|---|
| `createRenderer(canvas, cellSize)` | Init 2D context |
| `clearCanvas(r, w, h)` | Clear background |
| `drawGrid(r, w, h)` | Draw grid lines |
| `drawSnake(r, snake)` | Snake body + head highlight |
| `drawFood(r, food)` | Food circle |
| `drawScore(r, score, w)` | Score text overlay |
| `drawGameOver(r, w, h)` | Game over screen |
| `drawWin(r, w, h)` | Win screen |

## Data Flow

```
Keyboard Input
      │
      ▼
 changeDirection(game, dir)
      │
      ▼
 tick(game)
   ├── move(snake)
   ├── grow(snake)          ← if food eaten
   ├── placeFood(board)     ← if food eaten
   ├── checkSelfCollision() ← if true → gameOver
   └── isOutOfBounds()      ← if true → gameOver
      │
      ▼
 getState(game) → render()
      │
      ▼
 Canvas Output
```

## Edge Cases Handled

| Case | Behavior |
|---|---|
| `createSnake(null)` | Defaults to `{x: 0, y: 0}` |
| `setDirection(snake, {0,0})` | Ignored (zero vector rejected) |
| `isOccupied(board, pos, [])` | Returns `false` (empty list) |
| `tick()` when `won === true` | No-op |
| `tick()` when `gameOver === true` | No-op |
| Rapid direction changes | Last valid direction wins |
| Self-collision (length 1) | `false` — head can't overlap body |
| Board full | `game.won = true` |

## Testing

41 tests across 3 files, run with Vitest:

```bash
npm test          # single run
npm run test:watch  # watch mode
```

```
 ✓ test/board.test.js   (14 tests)
 ✓ test/snake.test.js   (15 tests)
 ✓ test/game.test.js    (12 tests)

 Tests  41 passed (41)
```

## Development

```bash
npm install
npm test
npm start          # opens game in browser
```

## Tech Stack

- **Language:** Vanilla JavaScript (ES Modules)
- **Rendering:** HTML5 Canvas 2D
- **Testing:** Vitest
- **Build:** None — runs directly in browser
