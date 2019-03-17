import { Action, AnyAction, Reducer } from 'redux'
import { SubReducer } from './types.js'

/**
 * Returns a reducer that calls the passed child reducers in sequence.
 * That is, when the reducer is called, it passes the input state and
 * action to the first child reducer, then the returned state together
 * with the same action to the second child reducer, and so on. Finally,
 * the state returned by the last child reducer is returned by the
 * chained reducer itself.
 *
 * A common pattern is to specify `withInitialState(initialState)` as
 * the first child reducer, followed by a series of `onAction()`
 * reducers for different action types.
 *
 * @param firstReducer - The first child reducer to call.
 * @param otherReducers - The other child reducers to chain together.
 */
export default function chainReducers<S = any, A extends Action = AnyAction>(
  firstReducer: Reducer<S, A>,
  ...otherReducers: SubReducer<S, A>[]
): Reducer<S, A> {
  if (!firstReducer) {
    throw new Error('chainReducers() needs at least one reducer.')
  }

  if (otherReducers.length === 0) {
    return firstReducer
  }

  return function chainedReducer(state, action) {
    const nextState = firstReducer(state, action)
    return otherReducers.reduce((s, reducer) => reducer(s, action), nextState)
  }
}
