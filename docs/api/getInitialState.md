# `getInitialState`

Returns the initial state of a reducer.

```js
// JavaScript

function getInitialState(reducer)
```

```ts
// TypeScript

function getInitialState<S>(reducer: Reducer<S>): S
```

## Details

`getInitialState` asks the passed reducer for its initial state by calling it
with an `undefined` state and a dummy action, just as a Redux store would.

This helper is mainly intended for tests, where it can help improve
readabilty. For example, when making assertions about a reducer's initial
state, `getInitialState(reducer)` is more expressive than something like
`reducer(undefined, { type: '' })`.

## Examples

Basic usage:

```js
import { getInitialState } from 'redux-preboiled'

const reducer = (state = 0, action) =>
  action.type === 'increment' ? state + 1 : state


getInitialState(reducer)
// => 0
```

Usage in [Jest][jest]:

```js
import { getInitialState } from 'redux-preboiled'

const reducer = (state = 0, action) =>
  action.type === 'increment' ? state + 1 : state

test('initial state is 0', () => {
  expect(getInitialState(reducer)).toBe(0);
})
```

## See Also

- [Testing](../guides/testing.md) guide

[jest]: https://jestjs.io/
