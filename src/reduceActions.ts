import { Action, Reducer } from 'redux'
import getInitialState from './getInitialState'

/**
 * Returns the state returned by the passed reducer after the
 * given sequence of dispatched actions, using the reducer's
 * initial state as starting point. If the action sequence
 * is empty, the initial state is returned.
 *
 * @param reducer - The reducer to process the actions with.
 * @param actions - The actions to process.
 */
export default function reduceActions<S, A extends Action>(
  reducer: Reducer<S, A>,
  ...actions: A[]
): S {
  const initialState = getInitialState(reducer)
  return actions.reduce(reducer, initialState) || initialState
}
