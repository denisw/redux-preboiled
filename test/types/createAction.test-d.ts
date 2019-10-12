import { Action } from 'redux'
import { expectType } from 'tsd'
import {
  createAction,
  TypedActionCreator,
  PayloadAction,
  SimpleActionCreator,
  PayloadActionCreator
} from '../../src'

type SimpleAction = Action<'simple'>
type NumberAction = PayloadAction<number, 'number'>

const simpleActionCreator = createAction('simple')
const numberActionCreator = createAction('number').withPayload<number>()

expectType<TypedActionCreator<SimpleAction>>(simpleActionCreator)
expectType<SimpleActionCreator<'simple'>>(simpleActionCreator)
expectType<'simple'>(simpleActionCreator.type)
expectType<SimpleAction>(simpleActionCreator())

expectType<TypedActionCreator<NumberAction>>(numberActionCreator)
expectType<PayloadActionCreator<number, 'number'>>(numberActionCreator)
expectType<'number'>(numberActionCreator.type)
expectType<NumberAction>(numberActionCreator(0))
