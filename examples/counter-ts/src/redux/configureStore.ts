import { createStore } from 'redux'
import counterReducer from './counter.redux'

export default function configureStore() {
  return createStore(counterReducer)
}
