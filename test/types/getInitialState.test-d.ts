import { Action, Reducer } from 'redux'
import { expectType } from 'tsd'
import { getInitialState } from '../../src'

declare const reducer: Reducer<number, Action>
expectType<number>(getInitialState(reducer))
