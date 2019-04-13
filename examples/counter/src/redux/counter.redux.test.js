import { getInitialState, reduceActions } from 'redux-preboiled'
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
  const state = reduceActions(reducer, increment(), decrement())
  expect(state).toBe(0)
})

test('multiply', () => {
  const state = reduceActions(reducer, increment(), increment(), multiply(2))
  expect(state).toBe(4)
})
