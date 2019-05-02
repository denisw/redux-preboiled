import { Action, AnyAction, Reducer } from 'redux'
import { SubReducer } from './types'

/**
 * Returns a reducer that calls the passed (sub-)reducers in sequence.
 * That is, when the reducer is called, it passes the input state and
 * action to the first child reducer, then the returned state together
 * with the same action to the second child reducer, and so on. Finally,
 * the state returned by the last child reducer is returned by the
 * chained reducer itself.
 *
 * @param firstChildReducer - The first (sub-)reducer in the chain.
 * @param otherChildReducers - The other (sub-)reducers to chain together.
 */
export default function chainReducers<S = any, A extends Action = AnyAction>(
  firstChildReducer: Reducer<S, A>,
  ...otherChildReducers: SubReducer<S, A>[]
): Reducer<S, A> {
  if (!firstChildReducer) {
    throw new Error('chainReducers() needs at least one reducer.')
  }

  if (otherChildReducers.length === 0) {
    return firstChildReducer
  }

  return function chainedReducer(state, action) {
    const nextState = firstChildReducer(state, action)
    return otherChildReducers.reduce(
      (s, reducer) => reducer(s, action),
      nextState
    )
  }
}
