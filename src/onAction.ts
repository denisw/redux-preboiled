import { Action, AnyAction } from 'redux'
import { SubReducer, TypedActionCreator } from './types.js'

/**
 * Returns a sub-reducer for a specific action type. Actions of this
 * type are forwarded to `actionReducer`, while for all other actions,
 * the input state is returned unchanged.
 *
 * @param type - The action type to handle, or an action creator with
 *               a `type` property (such as the ones returned by
 *               `createAction`).
 * @param actionReducer - The reducer to forward matching actions to.
 */
export default function onAction<
  S = any,
  T extends string | symbol | number = any,
  A extends Action<T> = AnyAction
>(type: T, actionReducer: SubReducer<S, A>): SubReducer<S>
export default function onAction<S = any, A extends Action = AnyAction>(
  actionCreator: TypedActionCreator<A>,
  actionReducer: SubReducer<S, A>
): SubReducer<S>
export default function onAction<
  S = any,
  T = any,
  A extends Action<T> = AnyAction
>(
  actionTypeOrCreator: string | TypedActionCreator<A>,
  actionReducer: SubReducer<S, A>
): SubReducer<S> {
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
