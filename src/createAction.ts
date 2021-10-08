import { Action } from 'redux'
import { BasicActionCreator, PayloadActionCreator } from './types'

/**
 * Returns an action creator that produces actions of the passed type.
 * It also attaches a `type` property to the action creator that allows
 * retrieving the action type at runtime.
 *
 * The returned action creator takes no arguments. To create a version
 * that takes a `payload` and attaches it to the action, call the action
 * creator's `.withPayload()` method.
 *
 * @param type - The action type for the actions to generate.
 * @returns An action creator for the action type.
 */
export default function createAction<T extends string | symbol | number>(
  type: T
): BasicActionCreator<T> {
  const actionCreator = () => ({ type })

  return Object.assign(actionCreator, {
    type,

    matches(a: Action<T>): a is Action<T> {
      return a.type == type
    },

    withPayload<P>(): PayloadActionCreator<P, T> {
      const payloadActionCreator = (payload: P) => ({
        type,
        payload,
      })

      return Object.assign(payloadActionCreator, {
        type,
        matches: this.matches as any,
      })
    },
  })
}
