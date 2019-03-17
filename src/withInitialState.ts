import { Action, Reducer } from 'redux'
import { SubReducer } from './types.js'

/**
 * Returns a reducer that returns the passed initial state when called
 * with an `undefined` state (i.e., during store initialization).
 *
 * If a child reducer function is passed to `withInitialState()`, the
 * generated reducer will delegate all calls to that function. If the
 * input state is `undefined`, it will substitute the specified initial
 * state. This ensures that the child reducer doesn't need to provide an
 * initial state on its own, and can rely on the state always being
 * defined.
 *
 * If called without a child reducer, the `withInitialState()` reducer
 * will simply return the input state if it is defined.
 *
 * @param initialState - The initial state to return.
 * @param [reducer] - If specified, the child reducer to delegate to.
 */
export default function withInitialState<S, A extends Action>(
  initialState: S,
  reducer?: SubReducer<S, A>
): Reducer<S, A> {
  return reducer
    ? (state = initialState, action) => reducer(state, action)
    : (state = initialState) => state
}
