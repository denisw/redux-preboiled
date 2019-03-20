import { Reducer } from 'redux'
import reduceActions from '../src/reduceActions'

const reducer: Reducer = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'multiply':
      return state * action.payload
    default:
      return state
  }
}

test('one action', () => {
  const state = reduceActions(reducer, { type: 'increment' })
  expect(state).toBe(1)
})

test('multiple actions', () => {
  const state = reduceActions(
    reducer,
    { type: 'increment' },
    { type: 'increment' },
    { type: 'multiply', payload: 2 }
  )
  expect(state).toBe(4)
})

test('no action', () => {
  const state = reduceActions(reducer)
  expect(state).toBe(0)
})
