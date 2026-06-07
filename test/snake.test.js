import { describe, it, expect } from 'vitest'
import { createSnake, move, grow, setDirection, checkSelfCollision, getHead } from '../src/snake.js'

describe('Snake', () => {
  it('creates a snake with given start position', () => {
    const snake = createSnake({ x: 5, y: 5 })
    expect(snake.body).toEqual([{ x: 5, y: 5 }])
    expect(snake.direction).toEqual({ x: 1, y: 0 })
  })

  it('creates a snake with default position when null', () => {
    const snake = createSnake(null)
    expect(snake.body).toEqual([{ x: 0, y: 0 }])
  })

  it('creates a snake with default position when undefined', () => {
    const snake = createSnake(undefined)
    expect(snake.body).toEqual([{ x: 0, y: 0 }])
  })

  describe('getHead', () => {
    it('returns the first cell of the body', () => {
      const snake = createSnake({ x: 3, y: 4 })
      expect(getHead(snake)).toEqual({ x: 3, y: 4 })
    })
  })

  describe('move', () => {
    it('moves the snake one step in the current direction', () => {
      const snake = createSnake({ x: 2, y: 3 })
      move(snake)
      expect(getHead(snake)).toEqual({ x: 3, y: 3 })
      expect(snake.body).toHaveLength(1)
    })

    it('moves and preserves body length when no growth', () => {
      const snake = createSnake({ x: 5, y: 5 })
      snake.body.push({ x: 4, y: 5 })
      move(snake)
      expect(snake.body).toHaveLength(2)
      expect(getHead(snake)).toEqual({ x: 6, y: 5 })
      expect(snake.body[1]).toEqual({ x: 5, y: 5 })
    })
  })

  describe('grow', () => {
    it('marks snake to grow on next move', () => {
      const snake = createSnake({ x: 5, y: 5 })
      grow(snake)
      move(snake)
      expect(snake.body).toHaveLength(2)
      expect(getHead(snake)).toEqual({ x: 6, y: 5 })
    })
  })

  it('checkSelfCollision returns false for single segment snake', () => {
    const snake = createSnake({ x: 5, y: 5 })
    expect(checkSelfCollision(snake)).toBe(false)
  })

  describe('setDirection', () => {
    it('sets a valid direction', () => {
      const snake = createSnake({ x: 5, y: 5 })
      setDirection(snake, { x: 0, y: -1 })
      expect(snake.direction).toEqual({ x: 0, y: -1 })
    })

    it('prevents reversing direction (left when moving right)', () => {
      const snake = createSnake({ x: 5, y: 5 })
      snake.direction = { x: 1, y: 0 }
      setDirection(snake, { x: -1, y: 0 })
      expect(snake.direction).toEqual({ x: 1, y: 0 })
    })

    it('prevents reversing direction (up when moving down)', () => {
      const snake = createSnake({ x: 5, y: 5 })
      snake.direction = { x: 0, y: 1 }
      setDirection(snake, { x: 0, y: -1 })
      expect(snake.direction).toEqual({ x: 0, y: 1 })
    })

    it('allows perpendicular direction change', () => {
      const snake = createSnake({ x: 5, y: 5 })
      snake.direction = { x: 1, y: 0 }
      setDirection(snake, { x: 0, y: 1 })
      expect(snake.direction).toEqual({ x: 0, y: 1 })
    })

    it('ignores zero direction vector', () => {
      const snake = createSnake({ x: 5, y: 5 })
      snake.direction = { x: 1, y: 0 }
      setDirection(snake, { x: 0, y: 0 })
      expect(snake.direction).toEqual({ x: 1, y: 0 })
    })
  })

  describe('checkSelfCollision', () => {
    it('returns false when no collision', () => {
      const snake = createSnake({ x: 5, y: 5 })
      snake.body.push({ x: 4, y: 5 })
      snake.body.push({ x: 3, y: 5 })
      expect(checkSelfCollision(snake)).toBe(false)
    })

    it('returns true when head collides with body', () => {
      const snake = createSnake({ x: 5, y: 5 })
      snake.body.push({ x: 4, y: 5 })
      snake.body.push({ x: 4, y: 6 })
      snake.body.push({ x: 5, y: 6 })
      snake.body.push({ x: 5, y: 5 })
      expect(checkSelfCollision(snake)).toBe(true)
    })
  })
})
