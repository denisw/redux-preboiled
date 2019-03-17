import { SimpleActionCreator, PayloadActionCreator } from './types.js'

/**
 * Returns an action creator that generates actions of the passed type.
 * It also attaches a `type` property to the action creator that allows
 * retrieving the corresponding action type at runtime.
 *
 * The generated action creator takes no arguments. To create a version
 * that takes a `payload` and attaches it to the action, call the action
 * creator's `.withPayload()` method.
 *
 * @param type - The action type for the actions to generate.
 * @returns An action creator for the action type.
 */
export default function createAction<T extends string | symbol | number>(
  type: T
): SimpleActionCreator<T> {
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
