import createAction from '../src/createAction'

describe('basic action creator', () => {
  test('creates actions without payload', () => {
    const logout = createAction('logout')
    const action = logout()
    expect(action).toEqual({ type: 'logout' })
  })

  test('has type property', () => {
    const logout = createAction('logout')
    expect(logout).toHaveProperty('type', 'logout')
  })
})

describe('payload action creator', () => {
  test('creates actions with payload', () => {
    const addTodo = createAction('addTodo').withPayload<string>()
    const action = addTodo('buy milk')
    expect(action).toEqual({ type: 'addTodo', payload: 'buy milk' })
  })

  test('has type property', () => {
    const addTodo = createAction('addTodo').withPayload()
    expect(addTodo).toHaveProperty('type', 'addTodo')
  })
})

test('type property', () => {
  const addTodo = createAction('addTodo').withPayload()
  const action = addTodo('buy milk')
  expect(action).toEqual({ type: 'addTodo', payload: 'buy milk' })
})
