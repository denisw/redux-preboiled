# Redux Preboiled

![](./logo/logo.png)

Redux Preboiled is a collection of boilerplate-reducing functions for
[Redux][redux] applications. It is built with the following goals in
mind:

- **_À la carte_ design.** Preboiled's helpers are designed to be largely
  independent from each other, which allows you to pick and choose
  the ones you need without being burdened by the rest.

- **Minimal magic.** Preboiled should reduce the code needed for common
  Redux patterns, but not at the expense of readability. Clever
  metaprogramming and other magic shortcuts are avoided in favor of
  straight-forward understandability.

- **Typing friendliness.** Preboiled is written in [TypeScript][ts].
  It maximizes the benefits of typing by avoiding patterns that are
  hard to type or sacrifice type information (such as metaprogramming
  magic), and minimizes typing effort by allowing for type inference
  wherever possible.

[redux]: https://redux.js.org/
[ts]: https://www.typescriptlang.org/

## A First Taste

The following example shows off a bunch of the helpers offered by Preboiled.

```js
import { createStore } from 'redux'
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState
} from 'redux-preboiled'

// `createAction` lets you define an action with minimal ceremony.
// It gives an action creator with a `type` property, removing the
// need for a separate action type constant.
const increment = createAction('increment')

increment()
// => { type: 'increment' }

increment.type
// => 'increment'

// When caling `createAction(…).withPayload()`, the action creator 
// accepts a payload to attach to the returned action.
const multiply = createAction('multiply').withPayload()

multiply(2)
// => { type: 'multiply', payload: 2 }

// Preboiled comes with several helpers for composing reducers.
// Below we re-create the `switch (action.type)` pattern with:
//
// - `onAction`, which lets us create action-specific sub-reducers. 
//    We directly pass the `createAction` action creators to it; in 
//    TypeScript, this gives us automatic type inference for the 
//    sub-reducer's `action` parameter.
//
//  - `withInitialState`, which provides the initial state for the
//    sub-reducers.
//
//  - `chainReducers`, which pulls everything together by arranging
//    its child reducers into a pipeline (or "call chain").
const counterReducer = chainReducers(
  withInitialState(0),
  onAction(increment, state => state + 1),
  onAction(multiply, (state, action) => state * action.payload)
)

counterReducer(undefined, { type: '' })
// => 0

counterReducer(0, increment())
// => 1

counterReducer(2, multiply(4))
// => 8

// Redux Preboiled is just a utility library, so there is no special 
// setup to do or middleware to install. 

const store = createStore(counterReducer)
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(multiply(2))
store.getState()
// => 4
```

## Next Steps

The [Getting Started](./docs/guide/getting-started) guide shows you how to
install use Redux Preboiled, and links to several guides that offer a tour
through what the library has to offer. 
