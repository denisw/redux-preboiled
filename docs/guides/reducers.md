# Reducers

Redux [reducers][redux-reducers] are usually written using `switch` statements,
with each case handling a specific action type.

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
```

This pattern works reasonably well, but also has drawbacks:

* There is some required boilerplate, specifically the wrapping `switch
 (action.type)` block and the `default: return state` case (the latter is easy
 to forget when writing a new reducer).

* You have to remember the idiosyncrasies of JavaScript's `switch` statements,
  such as the additional braces needed to define variables which should be
  local to a case (e.g., `case 'multiply': { const factor = action.payload; …
  }`).

* In TypeScript, ensuring that `action` is typed correctly in every `switch`
  branch requires a considerable amount of extra typing effort, often including
  [union types of all types of actions in the app][redux-ts-actions].

Redux Preboiled has several helpers for constructing reducers which address
these shortcomings. Here is how you might write the example reducer above with
Preboiled:

```js
import {
  chainReducers,
  onAction,
  withInitialState
} from 'redux-preboiled'

const counterReducer = chainReducers(
  withInitialState(0),
  onAction('increment', state => state + 1),
  onAction('decrement', state => state - 1),
  onAction('multiply', (state, action) => state * action.payload)
)
```

This guide details Preboiled's reducer helpers and how they relate, plus how
they help you reduce typing effort if you use TypeScript.

## Reducing Specific Actions

Preboiled's [`onAction`](../api/onAction.md) helper generates reducer-like
functions which update the state only in response to actions of a specific type.

```js
import { onAction } from 'redux-preboiled'

const onMultiply = onAction('multiply', (state, action) => {
  return state * action.payload
})

onMultiply(2, { type: 'multiply', payload: 4 })
// => 8

onMultiply(2, { type: 'increment' })
// => 2
```

Note that the functions returned by `onAction` are not "proper" reducers - they
don't provide an initial state. For this reason, we prefer to call them
**sub-reducers** as they are meant to be embedded into actual reducer functions.
Later in this guide, we'll see how this can be done easily with the
`withInitialState` and `chainReducers` helpers.

### Integration with `createAction`

If you generate your action creators using
[`createAction`](../api/createAction.md) (as described in the
[Actions guide](./actions.md)), you can pass them directly to `onAction` in
place of their corresponding action types.

```js
import { createAction, onAction } from 'redux-preboiled'

const multiply = createAction('multiply').withPayload()

const onMultiply = onAction(multiply, (state, action) => {
  return state + action.payload
})
```

This removes a bit of noise as you don't need to write
`onAction(multiply.type, ...)`.

If you use TypeScript, there is another benefit: based on the action creator's
type, the TypeScript compiler automatically infers the type of the `action`
argument passed to the state update function. This helps you prevent mistakes,
like in the following example:

```ts
// TypeScript

// If I forget to call .withPayload() here...
const multiply = createAction('multiply')

const onMultiply = onAction(multiply, (state, action) => {
  // ... the TypeScript compiler will complain here:
  // Property 'payload' does not exists on type 'Action<"multiply">'.
  return state * action.payload
})
```

You'll also get better autocompletion in IDE's and editors which understand
TypeScript, such as Visual Studio Code or WebStorm.

## Providing Initial State

Using the `withInitialState` helper, you can generate reducers which return a
specific value as initial state.

There are two ways to use this helper. The first is to pass an initial state
value and a reducer-like state update function. The resulting reducer will
forward all calls to that function unless called with an `undefined` state
(i.e., during Redux store initialization), in which case it returns the given
initial state value instead. One use case for this variant is to make a
full reducer from a single `onAction` sub-reducer:

```js
import { onAction, withInitialState } from 'redux-preboiled'

const onIncrement = onAction('increment', state => state + 1)
const reducer = withInitialState(0, onIncrement)

reducer(undefined, { type: '@@INIT' })
// => 0

reducer(0, { type: 'increment' })
// => 1
```

Alternatively, you can specify _only_ an initial state when calling
`withInitialState`. In this case, the reducer will simply return any
non-`undefined` state unchanged.

```js
const reducer = withInitialState(0)

reducer(undefined, { type: '@@INIT' })
// => 0

reducer(123, { type: '' })
// => 123
```

This second version of `withInitialState` is useful for _reducer chains_, which
we'll look at next.

## Chaining Reducers

Redux comes with the [`combineReducers`][redux-combine-reducers] function, which
allows you to compose multiple reducers for different state slices.
Preboiled complements this with [`chainReducers`](../api/chainReducers.md),
which is about composing reducers for the _same_ state slice.

`chainReducers` turns a sequence of (sub-)reducers into a pipeline, or "chain",
where the output state of one reducer becomes the input state for the next.
Let's look at a silly, but illustrative example:

```js
import { chainReducers } from 'redux-preboiled'

const uppercaseReducer = (state = '', action) => {
  return state + action.payload.toUppercase()
}

const lowercaseReducer = (state, action) => {
  return state + action.payload.toLowerCase()
}

const reducer = chainReducers(
  uppercaseReducer,
  lowercaseReducer
)

reducer('', { type: '', payload: 'a' })
// => 'Aa'

reducer('A', { type: '', payload: 'b' })
// => 'AaBb'
```

For every incoming action, the reducer above first forwards the call to
`uppercaseReducer`, the first reducer in the chain. It then passes the resulting
state to the second reducer (`lowercaseReducer`), whose return value finally
becomes the state returned by the chained reducer itself.

Note that for the chain to be a proper reducer, at least one of its functions
(usually the first one) must return an initial state if called with an
`undefined` state. A common pattern is to start the chain with a
`withInitialState` reducer, e.g.:

```js
const reducer = chainReducers(
  withInitialState(''),
  lowercaseReducer,
  uppercaseReducer
)
```

## Replacing `switch`

As shown in this guide's introduction, you can chain multiple `onAction`
sub-reducers as a replacement for the `switch` reducer pattern.

```js
const counterReducer = chainReducers(
  withInitialState(0),
  onAction('increment', state => state + 1),
  onAction('multiply', (state, { payload }) => state * payload)
)
```

This works because each sub-reducer only reacts to one specific type of action,
and leaves the state unchanged for all others; incoming actions will thus pass
through the chain until they reach the matching sub-reducer, or leave the chain
without a state change (the equivalent of `default: return state` in the
`switch` pattern).

## Next Steps

In addition to defining actions and reducers, Redux Preboiled also helps you
with testing your Redux code. See the [Testing guide](./testing.md).

[redux-combine-reducers]: https://redux.js.org/api/combinereducers
[redux-reducers]: https://redux.js.org/basics/reducers
[redux-ts-actions]: https://redux.js.org/recipes/usage-with-typescript#type-checking-actions-action-creators
