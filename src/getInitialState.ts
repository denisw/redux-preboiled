import { Action, Reducer } from 'redux'

/**
 * Returns the initial state provided by the passed reducer. A
 * more expressive alias for calling the reducer with an `undefined`
 * state and a dummy action.
 *
 * @param reducer - The reducer to get the initial state from.
 */
export default function getInitialState<S, A extends Action>(
  reducer: Reducer<S, A>
): S {
  const dummyAction = { type: '@@INIT' } as any
  return reducer(undefined, dummyAction)
}
