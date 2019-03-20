import getInitialState from '../src/getInitialState'

test("returns a reducer's initial state", () => {
  const reducer = (state = 0, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1
      default:
        return state
    }
  }

  expect(getInitialState(reducer)).toBe(0)
})
