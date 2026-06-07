import { describe, it, expect, beforeEach } from 'vitest'
import { createGame, tick, changeDirection, getState } from '../src/game.js'

describe('Game', () => {
  let game

  beforeEach(() => {
    game = createGame({ width: 10, height: 10 })
  })

  it('creates a game with initial state', () => {
    const state = getState(game)
    expect(state.score).toBe(0)
    expect(state.gameOver).toBe(false)
    expect(state.won).toBe(false)
  })

  it('creates a game with a snake at the center', () => {
    const state = getState(game)
    expect(state.snake.body).toEqual([{ x: 5, y: 5 }])
  })

  it('creates a game with food placed', () => {
    const state = getState(game)
    expect(state.food).not.toBeNull()
  })

  describe('tick', () => {
    it('moves the snake forward', () => {
      const before = getState(game).snake.body[0]
      tick(game)
      const after = getState(game).snake.body[0]
      expect(after.x).toBe(before.x + 1)
      expect(after.y).toBe(before.y)
    })

    it('ends game when snake hits wall', () => {
      game = createGame({ width: 5, height: 5 })
      const snake = getState(game).snake
      snake.direction = { x: 1, y: 0 }
      snake.body = [
        { x: 4, y: 2 },
        { x: 3, y: 2 },
      ]
      tick(game)
      expect(getState(game).gameOver).toBe(true)
    })

    it('ends game when snake hits itself', () => {
      const snake = getState(game).snake
      snake.direction = { x: 1, y: 0 }
      snake.body = [
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 3, y: 3 },
      ]
      tick(game)
      expect(getState(game).gameOver).toBe(true)
    })

    it('grows snake and increments score when eating food', () => {
      const snake = getState(game).snake
      game.board.food = { x: snake.body[0].x + 1, y: snake.body[0].y }
      tick(game)
      const state = getState(game)
      expect(state.score).toBe(1)
      expect(state.snake.body).toHaveLength(2)
    })

    it('sets won when board is full', () => {
      game = createGame({ width: 3, height: 3 })
      const snake = getState(game).snake
      snake.body = [
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ]
      snake.direction = { x: 1, y: 0 }
      game.board.food = { x: 2, y: 2 }
      tick(game)
      expect(getState(game).won).toBe(true)
      expect(getState(game).score).toBe(1)
    })
  })

  describe('changeDirection', () => {
    it('changes direction of the snake', () => {
      changeDirection(game, { x: 0, y: -1 })
      expect(getState(game).snake.direction).toEqual({ x: 0, y: -1 })
    })

    it('does not change direction when game is over', () => {
      game.gameOver = true
      changeDirection(game, { x: 0, y: -1 })
      expect(getState(game).snake.direction).toEqual({ x: 1, y: 0 })
    })
  })
})
