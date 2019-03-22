import { Action, ActionCreator, AnyAction } from 'redux'

/**
 * An action creator with a `type` property which stores the
 * action type value used for all returned actions.
 */
export interface TypedActionCreator<A extends Action = AnyAction>
  extends ActionCreator<A> {
  /**
   * The action type value used for all of the action creator's actions.
   */
  type: A extends Action<infer T> ? T : never
}

/**
 * A `TypedActionCreator` that generates simple actions, i.e. actions
 * with nothing else than a `type`.
 */
export interface SimpleActionCreator<T = any> {
  /**
   * The action type value used for all of the action creator's actions.
   */
  type: T

  /**
   * Creates an action with the action creator's associated action type.
   */
  (): Action<T>

  /**
   * Returns a version of the action creator that accepts a payload to
   * attach to the created action.
   */
  withPayload<P = any>(): PayloadActionCreator<P, T>
}

/**
 * An action with an attached payload value.
 */
export interface PayloadAction<P = any, T = any> extends Action<T> {
  payload: P
}

/**
 * An `TypedActionCreator` that generates payload actions.
 */
export interface PayloadActionCreator<P, T> {
  /**
   * The action type value used for all of the action creator's actions.
   */
  type: T

  /**
   * Creates an action with the action creator's associated action type
   * and the given payload.
   *
   * @param payload - The payload to add to the action.
   */
  (payload: P): PayloadAction<P, T>
}

/**
 * A reducer-like function that assumes the initial state is provided by a
 * parent reducer, i.e. that it is never called with an `undefined` state.
 */
export interface SubReducer<S = any, A extends Action = AnyAction> {
  (state: S, action: A): S
}
