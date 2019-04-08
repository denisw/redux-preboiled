# `reduceActions`

Calculates the state after dispatching an action sequence to a specific
reducer (test helper).

```js
// JavaScript

function reduceActions(reducer, ...actions)
```

```ts
// TypeScript

function reduceActions<S, A extends Action>(
  reducer: Reducer<S, A>,
  ...actions: A[]
): S
```

## Details

`reduceActions` requests an initial state from the given reducer (using
[`getInitialState`](./getInitialState.md)) and then calls the reducer each of
the passed actions in the specified order, just as if these actions had been
dispatched to the reducer's Redux store. The state resulting from the last of
these reducer calls is returned.

If called without any actions, `reduceActions` simply returns the reducer's
initial state (just like [`getInitialState`](./getInitialState.md)).

This helper is great for reducer tests. For instance, you can use it to test
that a loading flag is unset if an success action is dispatched after a
"request pending" action.

## Examples

Basic usage:

```js
import { reduceActions } from 'redux-preboiled'

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'multiply':
      return state * action.payload
    default:
      return state
  }
}

reduceActions(reducer, { type: 'increment' })
// => 1

reduceActions(
  reducer,
  { type: 'increment' },
  { type: 'increment' },
  { type: 'multiply', payload: 2 }
)
// => 4

reduceActions(reducer)
// => 0
```

Usage in a [Jest][jest] test:

```js
import { reduceActions } from 'redux-preboiled'

const initialState = {
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetchRecipe':
      return { loading: true }
    case 'fetchRecipeSuccess':
      return { loading: false }
    default:
      return state
  }
}

test('fetchRecipe sets loading flag', () => {
  const state = reduceActions(reducer, { type: 'fetchRecipe' })
  expect(state.loading).toEqual(true)
})

test('fetchRecipeSuccess unsets loading flag', () => {
  const state = reduceActions(
    reducer,
    { type: 'fetchRecipe' },
    { type: 'fetchRecipeSuccess' }
  )
  expect(state.loading).toEqual(false)
})
```

## See Also

- [Testing](../guides/testing.md) guide

[jest]: https://jestjs.io/
