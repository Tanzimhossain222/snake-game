import { createBoard, isOutOfBounds, placeFood } from './board.js'
import { createSnake, move, grow, setDirection, checkSelfCollision, getHead } from './snake.js'

export function createGame({ width, height }) {
  const board = createBoard(width, height)
  const center = {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  }
  const snake = createSnake(center)
  placeFood(board, snake.body)

  return {
    board,
    snake,
    score: 0,
    gameOver: false,
    won: false,
  }
}

export function getState(game) {
  return {
    snake: game.snake,
    food: game.board.food,
    score: game.score,
    gameOver: game.gameOver,
    won: game.won,
    board: game.board,
  }
}

export function changeDirection(game, direction) {
  if (game.gameOver) return
  setDirection(game.snake, direction)
}

export function tick(game) {
  if (game.gameOver) return

  const head = getHead(game.snake)
  const newHead = {
    x: head.x + game.snake.direction.x,
    y: head.y + game.snake.direction.y,
  }

  const ate = game.board.food && newHead.x === game.board.food.x && newHead.y === game.board.food.y
  if (ate) {
    grow(game.snake)
    game.score++
  }

  move(game.snake)

  if (ate) {
    try {
      placeFood(game.board, game.snake.body)
    } catch {
      game.won = true
      return
    }
  }

  if (isOutOfBounds(game.board, getHead(game.snake))) {
    game.gameOver = true
    return
  }

  if (checkSelfCollision(game.snake)) {
    game.gameOver = true
    return
  }
}
