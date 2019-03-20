import { AnyAction } from 'redux'
import getInitialState from '../src/getInitialState'

test("returns a reducer's initial state", () => {
  const reducer = (state = 0, action: AnyAction) =>
    action.type === 'increment' ? state + 1 : state

  expect(getInitialState(reducer)).toBe(0)
})
