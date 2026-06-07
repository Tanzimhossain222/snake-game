export function createBoard(width, height) {
  return { width, height, food: null }
}

export function isOutOfBounds(board, position) {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= board.width ||
    position.y >= board.height
  )
}

export function isOccupied(board, position, occupiedCells) {
  return occupiedCells.some(cell => cell.x === position.x && cell.y === position.y)
}

export function placeFood(board, occupiedCells) {
  const available = []
  for (let x = 0; x < board.width; x++) {
    for (let y = 0; y < board.height; y++) {
      if (!isOccupied(board, { x, y }, occupiedCells)) {
        available.push({ x, y })
      }
    }
  }
  if (available.length === 0) {
    throw new Error('Board is full')
  }
  const idx = Math.floor(Math.random() * available.length)
  board.food = available[idx]
}
