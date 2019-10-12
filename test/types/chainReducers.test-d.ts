import { Action, AnyAction, Reducer } from 'redux'
import { expectType } from 'tsd'
import { chainReducers, onAction, withInitialState } from '../../src'

type SomeAction = Action<'action1' | 'action2'>

const reducer1 = chainReducers(
  (state: number = 0, action: SomeAction) => 1,
  (state: number = 0, action: SomeAction) => 2
)

const reducer2 = chainReducers(
  withInitialState(0),
  onAction('action1', () => 1),
  onAction('action2', () => 2)
)

expectType<Reducer<number, SomeAction>>(reducer1)
expectType<Reducer<number, AnyAction>>(reducer2)
