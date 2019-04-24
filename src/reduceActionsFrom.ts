import { Action, Reducer } from 'redux'

/**
 * Returns the state returned by the passed reducer after the
 * given sequence of dispatched actions, using the passed
 * starting state. If the action sequence is empty, the
 * passed state is returned unchanged.
 *
 * @param state - The starting state.
 * @param reducer - The reducer to process the actions with.
 * @param actions - The actions to process.
 */
export default function reduceActionsFrom<S, A extends Action>(
  state: S,
  reducer: Reducer<S, A>,
  ...actions: A[]
): S {
  return actions.reduce(reducer, state)
}
