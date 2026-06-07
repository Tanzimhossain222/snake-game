export function createSnake(startPosition) {
  return {
    body: [{ ...startPosition }],
    direction: { x: 1, y: 0 },
    growing: false,
  }
}

export function getHead(snake) {
  return snake.body[0]
}

export function move(snake) {
  const head = getHead(snake)
  const newHead = {
    x: head.x + snake.direction.x,
    y: head.y + snake.direction.y,
  }
  snake.body.unshift(newHead)
  if (!snake.growing) {
    snake.body.pop()
  }
  snake.growing = false
}

export function grow(snake) {
  snake.growing = true
}

export function setDirection(snake, newDirection) {
  const opposite =
    snake.direction.x + newDirection.x === 0 &&
    snake.direction.y + newDirection.y === 0
  if (!opposite) {
    snake.direction = { ...newDirection }
  }
}

export function checkSelfCollision(snake) {
  const head = getHead(snake)
  return snake.body.slice(1).some(segment =>
    segment.x === head.x && segment.y === head.y
  )
}
