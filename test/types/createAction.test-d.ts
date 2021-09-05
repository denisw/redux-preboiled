import { Action } from 'redux'
import { expectType } from 'tsd'
import {
  createAction,
  TypedActionCreator,
  PayloadAction,
  BasicActionCreator,
  PayloadActionCreator,
} from '../../src'

type BasicAction = Action<'basic'>
type NumberAction = PayloadAction<number, 'number'>

const basicActionCreator = createAction('basic')
const numberActionCreator = createAction('number').withPayload<number>()

expectType<TypedActionCreator<BasicAction>>(basicActionCreator)
expectType<BasicActionCreator<'basic'>>(basicActionCreator)
expectType<'basic'>(basicActionCreator.type)
expectType<BasicAction>(basicActionCreator())

expectType<TypedActionCreator<NumberAction>>(numberActionCreator)
expectType<PayloadActionCreator<number, 'number'>>(numberActionCreator)
expectType<'number'>(numberActionCreator.type)
expectType<NumberAction>(numberActionCreator(0))
