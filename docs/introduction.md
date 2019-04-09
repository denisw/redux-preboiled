# Introduction

![](../logo/logo.png)

_Pre-cooked Redux helpers, served à la carte._

Redux Preboiled is a collection of general-purpose [Redux][redux] helper
functions. It helps you reduce boilerplate when writing reducers, action
creators, and tests.

- **Served _à la carte_.** Each of Preboiled's helpers can be used stand-alone.
  Just pick and use the ones you want and ignore the rest. If your build setup
  does [tree shaking][tree-shaking], the unused helpers won't even be added 
  to your application's build output.

- **Minimal magic.** Preboiled avoids clever "magic" tricks which minimize
- boilerplate at the expense of understandability. Instead, it favors simple,
  composable functions with easy-to-understand semantics and implementations.

- **TypeScript-friendly.** Redux Preboiled is written in 
  [TypeScript][typescript]. Its helpers are designed to be easy to type and 
  amenable to automatic type inference, making it easy to write type-safe 
  Redux code.

## A First Taste

The following snippet uses a bunch of Redux Preboiled's helpers to define a
simple Redux counter module with support for `increment` and `multiply` 
actions. It is about half the size of the equivalent vanilla Redux code.

```js
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState
} from 'redux-preboiled'

const increment = createAction('increment')
const multiply = createAction('multiply').withPayload()

const counterReducer = chainReducers(
  withInitialState(0),
  onAction(increment, state => state + 1),
  onAction(multiply, (state, action) => state * action.payload)
)

// Example usage:

import { createStore } from 'redux'

const store = createStore(counterReducer)
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(multiply(2))
store.getState()
// => 4
```

* `createAction` generates various types of action creator functions with
  minimal cerenomy. The specified action type value is made available as an
  action creator property (`increment.type` and `mutliply.type` in this
  example), making separate action type constants unnecessary. See the
  [Actions](./guides/actions.md) guide.

* The `onAction`, `withInitialState` and `chainReducers` helpers can be 
  combined as a less noisy alternative to the classic `switch` reducer 
  pattern. In TypeScript, the type of the sub-reducers' `action` parameters 
  are automatically inferred from the action creators passed to `onAction`,
  improving type safety and editor auto-completion. See the 
  [Reducers](./guides/reducers.md) guide.

## Next Steps

The [Getting Started](./guides/getting-started.md) guide shows you how to
install and use Redux Preboiled. Follow the links to the other guides for a
tour through Redux Preboiled's helpers. 

For reference documentation, see the [API docs](./api/README.md).

[redux]: https://redux.js.org/
[redux-action-types]: https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
[tree-shaking]: https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/
[typescript]: https://www.typescriptlang.org/
