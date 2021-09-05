import { expectTypeOf } from 'expect-type'
import { Action } from 'redux'
import createAction from '../src/createAction'
import { PayloadAction } from '../src/types'

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

  test('has matches() method', () => {
    const login = createAction('login')
    const logout = createAction('logout')
    expect(login.matches(login())).toBe(true)
    expect(login.matches(logout())).toBe(false)
  })

  test('[TypeScript] matches() is a type predicate', () => {
    const logout = createAction('logout')
    const action: Action<unknown> = logout()

    if (logout.matches(action)) {
      expectTypeOf(action).toEqualTypeOf<Action<'logout'>>()
    }
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

  test('has matches() method', () => {
    const incrementBy = createAction('incrementBy').withPayload<number>()
    const decrementBy = createAction('decrementBy').withPayload<number>()
    expect(incrementBy.matches(incrementBy(1))).toBe(true)
    expect(incrementBy.matches(decrementBy(1))).toBe(false)
  })

  test('[TypeScript] matches() is a type predicate', () => {
    const incrementBy = createAction('incrementBy').withPayload<number>()
    const action: Action<unknown> = incrementBy(1)

    if (incrementBy.matches(action)) {
      expectTypeOf(action).toEqualTypeOf<PayloadAction<number, 'incrementBy'>>()
    }
  })
})
