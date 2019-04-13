import {
  chainReducers,
  createAction,
  onAction,
  withInitialState
} from 'redux-preboiled'

// Actions

export const increment = createAction('increment')
export const decrement = createAction('decrement')
export const multiply = createAction('multiply').withPayload()

// Reducer

export default chainReducers(
  withInitialState(0),
  onAction(increment, state => state + 1),
  onAction(decrement, state => state - 1),
  onAction(multiply, (state, action) => state * action.payload)
)
