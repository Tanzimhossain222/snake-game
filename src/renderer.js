export function createRenderer(canvas, cellSize) {
  const ctx = canvas.getContext('2d')
  return { ctx, cellSize }
}

export function clearCanvas(renderer, width, height) {
  renderer.ctx.fillStyle = '#1a1a2e'
  renderer.ctx.fillRect(0, 0, width * renderer.cellSize, height * renderer.cellSize)
}

export function drawGrid(renderer, width, height) {
  const ctx = renderer.ctx
  ctx.strokeStyle = '#16213e'
  ctx.lineWidth = 0.5
  for (let x = 0; x <= width; x++) {
    ctx.beginPath()
    ctx.moveTo(x * renderer.cellSize, 0)
    ctx.lineTo(x * renderer.cellSize, height * renderer.cellSize)
    ctx.stroke()
  }
  for (let y = 0; y <= height; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * renderer.cellSize)
    ctx.lineTo(width * renderer.cellSize, y * renderer.cellSize)
    ctx.stroke()
  }
}

export function drawSnake(renderer, snake) {
  const ctx = renderer.ctx
  snake.body.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? '#00ff88' : '#00cc6a'
    ctx.fillRect(
      segment.x * renderer.cellSize + 1,
      segment.y * renderer.cellSize + 1,
      renderer.cellSize - 2,
      renderer.cellSize - 2,
    )
  })
}

export function drawFood(renderer, food) {
  if (!food) return
  const ctx = renderer.ctx
  ctx.fillStyle = '#ff3366'
  ctx.beginPath()
  ctx.arc(
    food.x * renderer.cellSize + renderer.cellSize / 2,
    food.y * renderer.cellSize + renderer.cellSize / 2,
    renderer.cellSize / 2 - 2,
    0,
    Math.PI * 2,
  )
  ctx.fill()
}

export function drawScore(renderer, score, width) {
  const ctx = renderer.ctx
  ctx.fillStyle = '#ffffff'
  ctx.font = '16px monospace'
  ctx.textAlign = 'left'
  ctx.fillText(`Score: ${score}`, 8, 20)
}

export function drawGameOver(renderer, width, height) {
  const ctx = renderer.ctx
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
  ctx.fillRect(0, 0, width * renderer.cellSize, height * renderer.cellSize)
  ctx.fillStyle = '#ff3366'
  ctx.font = 'bold 32px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('GAME OVER', (width * renderer.cellSize) / 2, (height * renderer.cellSize) / 2)
}

export function drawWin(renderer, width, height) {
  const ctx = renderer.ctx
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
  ctx.fillRect(0, 0, width * renderer.cellSize, height * renderer.cellSize)
  ctx.fillStyle = '#00ff88'
  ctx.font = 'bold 32px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('YOU WIN!', (width * renderer.cellSize) / 2, (height * renderer.cellSize) / 2)
}
