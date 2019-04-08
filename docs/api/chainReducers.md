# `chainReducers`

Creates a reducer that chains together a sequence of (sub-)reducers.

```js
// JavaScript

function chainReducers(firstChildReducer, ...otherChildReducers)
```

```ts
// TypeScript

function chainReducers<S = any, A extends Action = AnyAction>(
  firstChildReducer: Reducer<S, A>,
  ...otherChildReducers: SubReducer<S, A>[]
): Reducer<S, A>
```

## Details

Given a sequence of (sub-)reducers, `chainReducers` creates a reducer which
forwards incoming actions to each of these "child" reducers. More
specifically, the reducer:

1. calls the first child reducer with the received state
2. passes the resulting state (and the same action) to the next reducer
3. repeats step 2 until reaching the last reducer, whose returned state is
   finally returned by the `chainReducers` reducer.

Note that the first child reducer in the chain is the only one which needs to
handle an `undefined` state by returning the initial state; all others can be
*sub-reducers* - such as the ones returned by [`onAction`](./onAction.md) -
which assume that they are only ever called with a defined,
already-initialized state.

## Examples

Chaining `withInitialState` and `onAction` reducers:

```js
import {
  chainReducers,
  onAction,
  withInitialState
} from 'redux-preboiled'

const reducer = chainReducers(
  withInitialState(0),
  onAction('increment', state => state + 1),
  onAction('multiply', (state, { payload }) => state * payload)
)

reducer(undefined, { type: '' })
// => 0

reducer(0, { type: 'increment' })
// => 1

reducer(2, { type: 'multiply', payload: 4 })
// => 8
```

## See Also

* [Reducers](../guides/reducers.md) guide
* [onAction](./onAction.md)
* [withInitialState](./withInitialState.md)
