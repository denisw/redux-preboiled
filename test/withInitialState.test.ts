import withInitialState from '../src/withInitialState'
import createAction from '../src/createAction'
import onAction from '../src/onAction'

describe('with child reducer', () => {
  const increment = createAction('increment').withPayload<number>()
  const childReducer = onAction(
    increment,
    (state, { payload }) => state + payload
  )

  test('reducer initially returns the specified state', () => {
    const reducer = withInitialState(1, childReducer)
    expect(reducer(undefined, { type: '' })).toBe(1)
  })

  test('reducer delegates to child reducer afterwards', () => {
    const reducer = withInitialState(1, childReducer)
    expect(reducer(1, increment(3))).toBe(4)
  })
})

describe('without child reducer', () => {
  test('reducer initially returns the specified state', () => {
    const reducer = withInitialState(1)
    expect(reducer(undefined, { type: '' })).toBe(1)
  })

  test('reducer returns input state afterwards', () => {
    const reducer = withInitialState(1)
    expect(reducer(2, { type: '' })).toBe(2)
  })
})
