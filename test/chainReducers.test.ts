import chainReducers from '../src/chainReducers'

test('reducer calls each sub-reducer in sequence', () => {
  const reducer1 = jest.fn(state => state + 1)
  const reducer2 = jest.fn(state => state * 2)
  const reducer = chainReducers(reducer1, reducer2)

  const action = { type: 'calculate' }
  const nextState = reducer(1, action)

  expect(reducer1).toHaveBeenCalledWith(1, action)
  expect(reducer2).toHaveBeenCalledWith(2, action)
  expect(nextState).toBe(4)
})

test('throws error if no reducers are passed', () => {
  expect(() => (chainReducers as any)()).toThrowError(/at least one reducer/)
})

test('returns single reducer if no others are passed', () => {
  const reducer = (state = 0) => state
  expect(chainReducers(reducer)).toBe(reducer)
})
