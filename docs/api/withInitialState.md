# `withInitialState`

Creates a reducer that provides an initial state value, optionally wrapping a
sub-reducer.

```js
// JavaScript

function withInitialState(state, subReducer?)
```

```ts
// TypeScript

function withInitialState<S, A extends Action>(
  initialState: S,
  reducer?: InitializedReducer<S, A>
): Reducer<S, A> 
```

## Details

Given a value, `withInitialState` creates a reducer which provides that value
as the initial state - that is, the reducer returns the value if called with the
state  `undefined`. 

If a `subReducer` is passed, the reducer will delegate to it once the state
has been initialized. Used this way, `withInitialState` basically converts a
sub-reducer that doesn't provide an initial state into a proper reducer that
does.

Without `subReducer`, the reducer will simply return any non-`undefined` state
it receives. This means it will not make any state changes after the initial
state has been provided. This form of `withInitialState` is meant to be used
as building block for reducer chains built with
[`chainReducers`](./chainReducers.md) 


## Examples

Using `withInitialState` without sub-reducer:

```js
import { withInitialState } from 'redux-preboiled'

const reducer = withInitialState(0)

reducer(undefined, { type: '' })
// => 0

reducer(123, { type: '' })
// => 123
```

Passing a sub-reducer:

```js
import { withInitialState } from 'redux-preboiled'

function counterReducer(state, action) {
  return action.type === 'increment' ? state + 1 : state
}

const reducer = withInitialState(0, counterReducer)

reducer(undefined, { type: '' })
// => 0

reducer(0, { type: 'increment' })
// => 1
```

Combining `withInitialState` with `chainReducers`:


```js
import { chainReducers, withInitialState } from 'redux-preboiled'

function incrementReducer(state, action) {
  return action.type === 'increment' ? state + 1 : state
}

function multiplyReducer(state, action) {
  return action.type === 'multiply' ? state * action.payload : state
}

const reducer = chainReducers(
  withInitialState(0),
  incrementReducer,
  multiplyReducer
)

reducer(undefined, { type: '' })
// => 0

reducer(0, { type: 'increment' })
// => 1

reducer(2, { type: 'multiply', payload: 4 })
// => 8
```

## See Also

- [`chainReducers`](./chainReducers.md)
