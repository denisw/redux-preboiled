import { Reducer } from 'redux'

/**
 * Returns the initial state provided by the passed reducer. A
 * more expressive alias for calling the reducer with an `undefined`
 * state and a dummy action.
 *
 * @param reducer - The reducer to get the initial state from.
 */
export default function getInitialState<S>(reducer: Reducer<S>): S {
  return reducer(undefined, { type: '@@INIT' })
}
