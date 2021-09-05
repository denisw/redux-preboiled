import { Action, AnyAction } from 'redux'
import { expectType } from 'tsd'
import { onAction, BasicActionCreator, SubReducer } from '../../src'

declare const actionCreator: BasicActionCreator<'action'>

const subReducer1 = onAction('action', (state, action) => {
  expectType<any>(state)
  expectType<AnyAction>(action)
})

const subReducer2 = onAction<number, 'action'>('action', (state, action) => {
  expectType<any>(state)
  expectType<AnyAction>(action)
  return 0
})

const subReducer3 = onAction(actionCreator, (state, action) => {
  expectType<any>(state)
  expectType<Action<'action'>>(action)
})

const subReducer4 = onAction<number, Action<'action'>>(
  actionCreator,
  (state, action) => {
    expectType<any>(state)
    expectType<Action<'action'>>(action)
    return 0
  }
)

expectType<SubReducer<any, Action<'action'>>>(subReducer1)
expectType<SubReducer<number, Action<'action'>>>(subReducer2)
expectType<SubReducer<any, Action<'action'>>>(subReducer3)
expectType<SubReducer<number, Action<'action'>>>(subReducer4)
