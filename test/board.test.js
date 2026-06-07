import { describe, it, expect } from 'vitest'
import { createBoard, placeFood, isOutOfBounds, isOccupied } from '../src/board.js'

describe('Board', () => {
  it('creates a board with given dimensions', () => {
    const board = createBoard(10, 15)
    expect(board.width).toBe(10)
    expect(board.height).toBe(15)
  })

  it('creates a board with no food initially', () => {
    const board = createBoard(5, 5)
    expect(board.food).toBeNull()
  })

  describe('isOutOfBounds', () => {
    it('returns true for negative x', () => {
      const board = createBoard(10, 10)
      expect(isOutOfBounds(board, { x: -1, y: 0 })).toBe(true)
    })

    it('returns true for negative y', () => {
      const board = createBoard(10, 10)
      expect(isOutOfBounds(board, { x: 0, y: -1 })).toBe(true)
    })

    it('returns true for x >= width', () => {
      const board = createBoard(10, 10)
      expect(isOutOfBounds(board, { x: 10, y: 0 })).toBe(true)
    })

    it('returns true for y >= height', () => {
      const board = createBoard(10, 10)
      expect(isOutOfBounds(board, { x: 0, y: 10 })).toBe(true)
    })

    it('returns false for valid position', () => {
      const board = createBoard(10, 10)
      expect(isOutOfBounds(board, { x: 5, y: 5 })).toBe(false)
    })
  })

  describe('isOccupied', () => {
    it('returns true if position matches any occupied cell', () => {
      const board = createBoard(10, 10)
      const occupied = [{ x: 1, y: 2 }, { x: 3, y: 4 }]
      expect(isOccupied(board, { x: 1, y: 2 }, occupied)).toBe(true)
      expect(isOccupied(board, { x: 3, y: 4 }, occupied)).toBe(true)
    })

    it('returns false if position is not occupied', () => {
      const board = createBoard(10, 10)
      const occupied = [{ x: 1, y: 2 }]
      expect(isOccupied(board, { x: 5, y: 5 }, occupied)).toBe(false)
    })

    it('returns false for empty occupied cells', () => {
      const board = createBoard(10, 10)
      expect(isOccupied(board, { x: 5, y: 5 }, [])).toBe(false)
    })
  })

  it('creates a board with minimum valid dimensions', () => {
    const board = createBoard(1, 1)
    expect(board.width).toBe(1)
    expect(board.height).toBe(1)
  })

  it('placeFood works when only one cell available', () => {
    const board = createBoard(1, 1)
    const occupied = [{ x: 0, y: 0 }]
    expect(() => placeFood(board, occupied)).toThrow('Board is full')
    const board2 = createBoard(2, 1)
    placeFood(board2, [{ x: 0, y: 0 }])
    expect(board2.food).toEqual({ x: 1, y: 0 })
  })

  describe('placeFood', () => {
    it('places food on the board at an unoccupied position', () => {
      const board = createBoard(5, 5)
      const occupied = [{ x: 0, y: 0 }, { x: 1, y: 1 }]
      placeFood(board, occupied)
      expect(board.food).not.toBeNull()
      expect(board.food.x).toBeGreaterThanOrEqual(0)
      expect(board.food.x).toBeLessThan(5)
      expect(board.food.y).toBeGreaterThanOrEqual(0)
      expect(board.food.y).toBeLessThan(5)
      const isOnOccupied = occupied.some(p => p.x === board.food.x && p.y === board.food.y)
      expect(isOnOccupied).toBe(false)
    })

    it('throws an error if board is full', () => {
      const board = createBoard(1, 1)
      const occupied = [{ x: 0, y: 0 }]
      expect(() => placeFood(board, occupied)).toThrow('Board is full')
    })
  })
})
