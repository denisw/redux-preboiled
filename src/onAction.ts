import { Action, AnyAction } from 'redux'
import { InitializedReducer, IntrospectableActionCreator } from './types.js'

/**
 * Returns a reducer for a specific action type. Actions of this type
 * are forwarded to `reducer`, while for all other actions, the input
 * state is returned unchanged.
 *
 * @param type - The action type to handle, or an action creator with
 *               a `type` property (such as returned by `createAction`).
 * @param actionReducer - The reducer to forward matching actions to.
 */
export default function onAction<S = any, A extends Action = AnyAction>(
  actionCreator: IntrospectableActionCreator<A>,
  actionReducer: InitializedReducer<S, A>
): InitializedReducer<S>
export default function onAction<
  S = any,
  T extends string = any,
  A extends Action<T> = AnyAction
>(type: T, actionReducer: InitializedReducer<S, A>): InitializedReducer<S>
export default function onAction<
  S = any,
  T = any,
  A extends Action<T> = AnyAction
>(
  actionTypeOrCreator: string | IntrospectableActionCreator<A>,
  actionReducer: InitializedReducer<S, A>
): InitializedReducer<S> {
  const actionType =
    typeof actionTypeOrCreator === 'string'
      ? actionTypeOrCreator
      : actionTypeOrCreator.type

  return function onActionReducer(state, action) {
    return action.type === actionType
      ? actionReducer(state, action as A)
      : state
  }
}
