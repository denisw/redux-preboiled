import { Action, ActionCreator, AnyAction } from 'redux'

/**
 * An action creator that exposes the associated actino type through a
 * `type` property.
 */
export interface IntrospectableActionCreator<A extends Action = any>
  extends ActionCreator<A> {
  type: A extends Action<infer T> ? T : never
}

/**
 * A `IntrospectableActionCreator` that generates simple actions, i.e.
 * actions without any properties other than `type`.
 */
export interface SimpleActionCreator<T = any> {
  (): Action<T>
  type: T
  withPayload<P = any>(): PayloadActionCreator<P, T>
}

/**
 * An action with an attached payload. The payload can be used for any
 * kinds of arguments that are needed by the store's reducer or
 * middleware to process the action.
 */
export interface PayloadAction<P = any, T = any> extends Action<T> {
  payload: P
}

/**
 * An `IntrospectableActionCreator` that generates payload actions.
 */
export interface PayloadActionCreator<P, T> {
  (payload: P): PayloadAction<P, T>
  type: T
}

/**
 * A reducer-like function that assumes the initial state is provided by a
 * parent reducer, i.e. that it is never called with an `undefined` state.
 */
export interface SubReducer<S = any, A extends Action = AnyAction> {
  (state: S, action: A): S
}
