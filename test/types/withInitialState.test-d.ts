import { Action, AnyAction, Reducer } from 'redux'
import { expectType } from 'tsd'
import { withInitialState } from '../../src'

type SomeAction = Action<'action'>

expectType<Reducer<number, AnyAction>>(withInitialState(0))
expectType<Reducer<number, SomeAction>>(withInitialState<number, SomeAction>(0))
