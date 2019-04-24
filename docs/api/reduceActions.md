# `reduceActions`

_Testing helper._ Calculates the state after dispatching an sequence of
actions to a specific reducer, starting from the initial state.

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

`reduceActions` calls `reducer` with each of the passed `actions` -  as if
these had been dispatched in the specified order - and returns the resulting
state. For the first reducer call, the reducer's initial state (as determined
by [`getInitialState`](./getInitialState.md)) is used; each following call
receives the state returned by the previous one.

If called without any actions, `reduceActions` simply returns the reducer's
initial state - that is, `reduceActions(reducer)` is equivalent to
`getInitialState(reducer)`.

This helper is meant for use in reducer tests.

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
import counterReducer, {
  increment,
  multiply
} from './counter.redux'

test('increment', () => {
  const state = reduceActions(counterReducer, increment())
  expect(state).toEqual(1)
})

test('increment and multiply', () => {
  const state = reduceActions(
    counterReducer,
    increment(),
    increment(),
    multiply(4)
  )
  expect(state).toEqual(8)
})
```

## See Also

- [Testing](../guides/testing.md) guide

[jest]: https://jestjs.io/
