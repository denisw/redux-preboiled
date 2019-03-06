# 🥘 Redux Preboiled 🍜

Redux Preboiled is a collection of boilerplate-reducing functions for
[Redux][redux] applications. It is built with the following goals in
mind:

* **_À la carte_ design.** Preboiled's helpers are designed to be largely
  independent from each other, which allows you to pick and choose
  the ones you need without being burdened by the rest.

* **Minimal magic.** Preboiled should reduce the code needed for common
  Redux patterns, but not at the expense of readability. Clever
  metaprogramming and other magic shortcuts are avoided in favor of
  straight-forward understandability.

* **Typing friendliness.** Preboiled is written in [TypeScript][ts].
  It maximizes the benefits of typing by avoiding patterns that are
  hard to type or sacrifice type information (such as metaprogramming
  magic), and minimizes typing effort by allowing for type inference
  wherever possible.

[redux]: https://redux.js.org/
[ts]: https://www.typescriptlang.org/

## Installation

```sh
# NPM
npm install redux-preboiled

# Yarn
yarn add redux-preboiled
```

## A First Taste

The following example shows off some commonly useful helpers of Redux
Preboiled in action.

```js
import { createStore } from 'redux'
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState
} from 'redux-preboiled'

// `createAction` lets you define an action with minimal ceremony.
// It generates an action creator for a given action type and adds
// a `type` property to it. The latter removes the need to define a
// separate action type constant.
const increment = createAction('increment')

increment()
// => { type: 'increment' }
increment.type
// => 'increment'

// If you call `createAction(...).withPayload()`, the action creator
// takes a value which is attached to the action as `payload`. In
// TypeScript, you can specify the payload type using a type parameter,
// e.g. `withPayload<number>()`.
const multiply = createAction('multiply').withPayload()

multiply(2)
// => { type: 'multiply', payload: 2 }

// Redux Preboiled comes with several helpers for composing reducers.
// Below we use the following ones:
//
// - `onAction`, which creates a partial reducer for a specific action
//   type. Instead an action type value, you can directly pass a
//   createAction() action creator to it. If you use TypeScript, doing
//   this causes the type of the reducer's action parameter to be
//   inferred for you.
//
//  - `chainReducers`, which composes a sequence of reducers into a
//    pipeline where each reducer's result is forwarded to the next
//    reducer.
//
//  - `withInitialState`, which can convert a reducer without initial
//    state (like the `onAction` ones) into a proper reducer with the
//    passed initial state.
//
//  - `chainReducers`, which composes a sequence of reducers into a
//    pipeline where each reducer's result is forwarded to the next
//    reducer.
const counterReducer = chainReducers(
  withInitialState(0),
  onAction(increment, state => state + 1),
  onAction(multiply, (state, { payload }) => state * payload)
)

const store = createStore(counterReducer)
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(multiply(2))
store.getState()
// => 4
```
