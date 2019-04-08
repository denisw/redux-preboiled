# Reducers

In many Redux apps, [reducers][redux-reducers] are written using `switch`
statements for each action type and then grouped together using
[`combineReducers`][redux-combine-reducers].

```js
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'multiply':
      return state * action.payload
    default:
      return state
  }
}

// …

const rootReducer = combineReducers({
  counter: counterReducer,
  …
})
```

This works well. However, we can do better. Redux Preboiled's reducer helpers
offer the following benefits over the `switch` pattern:

- Slightly less boilerplate code (e.g., no repeated `switch (action.type) {`).
- Less room for mistakes (e.g., forgetting the `default: return state` case).
- Increased type system assistance for TypeScript users, e.g. by automatically
  inferring the type of `action` based on the action type (this also benefits
  JavaScript users whose IDE's autocompletion is powered by TypeScript)

The following sections show the building blocks Preboiled provides for
replicating the `switch` pattern before then putting them all together.

[redux-reducers]: https://redux.js.org/basics/reducers
[redux-combine-reducers]: https://redux.js.org/api/combinereducers

## Action Sub-Reducers

For handling specific types of actions, Redux Preboiled offers the `onAction`
helper. It creates a reducer-like function that processes only actions of a
particular type; on all other actions, it simply returns the state unchanged.

```js
import { onAction } from 'redux-preboiled'

const multiplyReducer = onAction('multiply', (state, action) => {
  return state * action.payload
})

onAction(2, { type: 'multiply', payload: 4 })
// => 8

onAction(8, { type: 'increment' })
// => 8
```

Note that the functions returned by `onAction` don't provide any initial state
and are thus not "proper" reducers (we call these kinds of functions
_sub-reducers_ in Preboiled). However, they can be used as building blocks
which allow you to replicate the `switch` reducer pattern using function
composition. The example below illustrates how to do this manually; later in
this guide we'll cover how this pattern can be streamlined using Preboiled's
[reducer chaining](#chaining-reducers) helper.

```js
const onIncrement = onAction('increment', state => {
  return state + 1
})

const onMultiply = onAction('multiply', (state, action) => {
  return state * action.payload
})

function counterReducer(state = 0, action) {
  state = onIncrement(state, action)
  state = onMultiply(state, action)
  return state
}

counterReducer(0, { type: 'increment' })
// => 1

counterReducer(2, { type: 'multiply', payload: 4 })
// => 8
```

### Combining with `createAction`

If you generate your action creators using the
[`createAction`](../api/createAction.md) helper (as described in the
[Actions](./actions.md) guide), you can pass those directly to `onAction` in
place of their corresponding action types.

```js
import { createAction, onAction } from 'redux-preboiled'

const multiply = createAction('multiply').withPayload()

const onMultiply = onAction(multiply, (state, action) => {
  return state + action.payload
})
```

This removes a bit of noise as you don't need to write
`onAction(increment.type, ...)`. If you use TypeScript, there is another
benefit: based on the action creator's type, the TypeScript compiler will
automatically infer the type of the `action` parameter. This gives you better
autocompletion and helps you prevent mistakes, like in the following example:

```ts
// TypeScript

// I forgot to call .withPayload() here. Oops.
const multiply = createAction('multiply')

const onMultiply = onAction(multiply, (state, action) => {
  // TypeScript ERROR:
  // Property 'payload' does not exists on type 'Action<"multiply">'.
  return state * action.payload
})
```

## Providing Initial State

As mentioned above, `onAction` returns only a _sub-reducer_ that doesn't
provide an initial state. Using the
[`withInitialState`](../api/withInitialState.md) helper, you can turn such a
reducer-like function into a proper reducer with the specified initial state.

```js
import { onAction, withInitialState } from 'redux-preboiled'

const onIncrement = onAction('increment', state => state + 1)
const reducer = withInitialState(0, onIncrement)

reducer(undefined, { type: '@@INIT' })
// => 0

reducer(0, { type: 'increment' })
// => 1
```

You can also call `withInitialState` with a state value only. In this case,
the resulting reducer will simply return the unchanged input state after
initialization.

```js
import { onAction, withInitialState } from 'redux-preboiled'

const reducer = withInitialState('Always bet on JS')

reducer(undefined, { type: '@@INIT' })
// => 'Always bet on JS'

reducer('Always bet on JS', { type: 'Rust' })
// => 'Always bet on JS'
```

This latter form is meant to be used in a _reducer chain_, as described in the
following section.

## Chaining Reducers

Preboiled's [`chainReducers`](../api/chainReducers.md) helper complements
[`combineReducers`][redux-combine-reducers] from Redux. Whereas the latter
bundles reducers managing different state slices, `chainReducers` lets you
compose a sequence of (sub-)reducers for the _same_ state slice by arranging
them to a call "chain". More specifically, it creates a single reducer that
calls each of the passed sub-reducers in order, forwarding the state returned
by each sub-reducer to the next. The reducer finally returns the result from
the last sub-reducer in the chain.

Let's look at a silly but illustrative example:

```js
import { chainReducers } from 'redux-preboiled'

const incrementing = (state, action) => state + action.payload
const multiplying = (state, action) => state * action.payload

const reducer = chainReducers(incrementing, multiplying)

const action = { type: 'anything', payload: 2 }
reducer(1, action)
// => (1 + 2) * 2
// == 4
```

As can be seen from the result, `reducer(1, action)` first calls
`incrementing(1, action)`, as `incrementing` is at the beginning of the
reducer chain; then it passes the result (2) together with `action` to
`multiplying`, yielding 4; and finally, as `multiplying` comes last in the
chain, returns that value to the caller.

`chainReducers` goes well with `onAction` and `withInitialState`. Using these
three, you can easily create reducers that handle multiple types of actions.

```js
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState
} from 'redux-preboiled'

const increment = createAction('increment')
const multiply = createAction('multiply').withPayload()

const reducer = chainReducers(
  withInitialState(0),
  onAction(increment, state => state + 1),
  onAction(multiply, (state, action) => state * action.payload)
)

reducer(undefined, { type: '@@INIT' })
// => 0

reducer(0, increment())
// => 1

reducer(1, multiply(3))
// => 3
```

This pattern is equivalent to the classic `switch (action.type)` approach. But
as described at the beginning of this guide, the Preboiled version requires
less code, is a bit less error-prone, and offers better type inference to
TypeScript users.

[redux-combine-reducers]: https://redux.js.org/api/combinereducers

## Next Steps

You have now seen how you can reduce boilerplate when defining reducers. In
addition, Redux Preboiled also has helpers that assist you in testing them.
See the [Testing](./testing.md) guide to find out more.
