import {
  getInitialState,
  reduceActions,
  reduceActionsFrom
} from 'redux-preboiled'
import reducer, { increment, decrement, multiply } from './counter.redux'

test('initial state is 0', () => {
  expect(getInitialState(reducer)).toBe(0)
})

test('increment', () => {
  const state = reduceActions(reducer, increment())
  expect(state).toBe(1)
})

test('multiple increments', () => {
  const state = reduceActions(reducer, increment(), increment())
  expect(state).toBe(2)
})

test('decrement', () => {
  const state = reduceActionsFrom(3, reducer, decrement())
  expect(state).toBe(2)
})

test('multiply', () => {
  const state = reduceActionsFrom(2, reducer, multiply(4))
  expect(state).toBe(8)
})
