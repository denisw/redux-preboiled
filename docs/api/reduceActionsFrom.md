# `reduceActionsFrom`

_Testing helper._ Calculates the state after dispatching an sequence of
actions to a specific reducer, starting from the a particular state.

```js
// JavaScript

function reduceActionsFrom(state, reducer, ...actions)
```

```ts
// TypeScript

function reduceActionsFrom<S, A extends Action, AS extends A[]>(
  state: S,
  reducer: Reducer<S, A>,
  ...actions: AS
): S
```

## Details

`reduceActionsFrom` calls `reducer` with each of the passed `actions` -  as if
these had been dispatched in the specified order - and returns the resulting
state. For the first reducer call, the given starting `state` is used; each
following call receives the state returned by the previous one.

If called without any actions, `reduceActionsFrom` simply returns `state`.

This helper is meant for use in reducer tests. Use this as an alternative to
[`reduceActions`](./reduceActions.md) if you don't want to start the reduction
from the initial state.


## Examples

Basic usage:

```js
import { reduceActionsFrom } from 'redux-preboiled'

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

reduceActionsFrom(0, reducer, { type: 'increment' })
// => 1

reduceActionsFrom(2, reducer, { type: 'increment' })
// => 3

reduceActionsFrom(
  2,
  reducer,
  { type: 'increment' },
  { type: 'increment' },
  { type: 'multiply', payload: 2 }
)
// => 8

reduceActionsFrom(2, reducer)
// => 2
```

Usage in a [Jest][jest] test:

```js
import { reduceActionsFrom } from 'redux-preboiled'
import counterReducer, {
  increment,
  multiply
} from './counter.redux'

test('increment', () => {
  const state = reduceActionsFrom(0, counterReducer, increment())
  expect(state).toEqual(1)
})

test('multiply', () => {
  const state = reduceActionsFrom(2, counterReducer, multiply(4))
  expect(state).toEqual(8)
})

test('increment and multiply', () => {
  const state = reduceActionsFrom(
    2,
    counterReducer,
    increment(),
    multiply(4)
  )
  expect(state).toEqual(12)
})
```

## See Also

- [reduceActions](./reduceActions.md)
- [Testing](../guides/testing.md) guide

[jest]: https://jestjs.io/
