import { Reducer } from 'redux'
import reduceActionsFrom from '../src/reduceActionsFrom'

const reducer: Reducer<number> = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'multiply':
      return state * action.payload
    default:
      return state
  }
}

test('single action', () => {
  const action = { type: 'increment' }
  expect(reduceActionsFrom(0, reducer, action)).toBe(1)
  expect(reduceActionsFrom(1, reducer, action)).toBe(2)
})

test('multiple actions', () => {
  const actions = [
    { type: 'increment' },
    { type: 'increment' },
    { type: 'multiply', payload: 2 }
  ]
  expect(reduceActionsFrom(0, reducer, ...actions)).toBe(4)
  expect(reduceActionsFrom(1, reducer, ...actions)).toBe(6)
})

test('no action', () => {
  expect(reduceActionsFrom(0, reducer)).toBe(0)
  expect(reduceActionsFrom(1, reducer)).toBe(1)
})
