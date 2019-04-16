import createAction from '../src/createAction'
import onAction from '../src/onAction'
import { PayloadAction } from '../src/types'

const increment = createAction('increment')
const multiply = createAction('multiply').withPayload<number>()

let onIncrement: (state: number) => number
let onMultiply: (state: number, action: PayloadAction<number>) => number

beforeEach(() => {
  onIncrement = jest.fn(state => state + 1)
  onMultiply = jest.fn((state, action) => state * action.payload)
})

describe('with action type', () => {
  test('calls action reducer for matching actions', () => {
    const reducer = onAction('increment', onIncrement)
    const nextState = reducer(0, increment())
    expect(nextState).toBe(1)
  })

  test('returns unchanged state for non-matching actions', () => {
    const reducer = onAction('increment', onIncrement)
    const nextState = reducer(0, multiply(2))
    expect(nextState).toBe(0)
    expect(onIncrement).not.toHaveBeenCalled()
  })
})

describe('with action creator', () => {
  test('calls action reducer for matching actions', () => {
    const reducer = onAction(multiply, onMultiply)
    const nextState = reducer(2, multiply(3))
    expect(nextState).toBe(6)
  })

  test('returns unchanged state for non-matching actions', () => {
    const reducer = onAction('multiply', onMultiply)
    const nextState = reducer(0, increment())
    expect(nextState).toBe(0)
    expect(onMultiply).not.toHaveBeenCalled()
  })
})
