import {
  chainReducers,
  createAction,
  onAction,
  withInitialState
} from 'redux-preboiled'

// State

export type CounterState = number

// Actions

export const increment = createAction('increment')
export const decrement = createAction('decrement')
export const multiply = createAction('multiply').withPayload<number>()

// Reducer

export default chainReducers(
  withInitialState(0),
  onAction(increment, state => state + 1),
  onAction(decrement, state => state - 1),
  onAction(multiply, (state, action) => state * action.payload)
)
