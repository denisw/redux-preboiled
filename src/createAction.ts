import { BasicActionCreator, PayloadActionCreator } from './types.js'

/**
 * Returns an action creator that generates actions of the passed type.
 * It also attaches a `type` property to the action creator that allows
 * retrieving the used action type at runtime.
 *
 * The generated action creator takes no arguments. However, you can
 * generate a version that takes a `payload` to attach to the action
 * by calling the action creator's `withPayload()` method.
 *
 * @param type - The action type for the actions to generate.
 */
export default function createAction<T extends string>(
  type: T
): BasicActionCreator<T> {
  const actionCreator = () => ({ type })

  function withPayload<P>(): PayloadActionCreator<P, T> {
    const result = (payload: P) => ({ type, payload })
    return Object.assign(result, { type })
  }

  return Object.assign(actionCreator, {
    type,
    withPayload
  })
}
