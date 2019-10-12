import { Action, Reducer } from 'redux'
import { expectType } from 'tsd'
import { reduceActionsFrom } from '../../src'

type Action1 = Action<'action1'>
type Action2 = Action<'action2'>

declare function action1(): Action1
declare function action2(): Action2

declare const reducer: Reducer<number, Action1 | Action2>

expectType<number>(reduceActionsFrom(0, reducer))
expectType<number>(reduceActionsFrom(0, reducer, action1()))
expectType<number>(reduceActionsFrom(0, reducer, action1(), action2()))
