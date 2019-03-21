# Testing

Redux boilerplate does not only accumulate in production code, but also in
unit tests. To help reduce it, Preboiled currently offers a few helpers for
reducer tests, described below.

Note that in this guide we assume you use [Jest][jest] as your testing
framework. However, it should be easy to translate the examples to your
testing framework of choice.

## Testing Initial State

When testing reducers, one common thing to test is the reducer's initial
state.

```js
import reducer from './module'

test('initial state is 0', () => {
  const initialState = reducer(undefined, { type: '' })
  expect(initialState).toBe(0)
})
```

As a more readable alternative to `reducer(undefined, …)`, Redux Preboiled
offers the [`getInitialState`](../api/getInitialState.md) helper. Just pass
it a reducer to receive its initial state. 

```js
import { getInitialState } from 'redux-preboiled'
import reducer from './module'

test('initial state is 0', () => {
  expect(getInitialState(reducer)).toBe(0)
})
```

## Reducing Multiple Actions

It is often important to test a reducer's state after a sequence of multiple
actions were dispatched, rather than just a single one. Loading flags for
asynchronous actions are a common example: you'll want to ensure that the flag
is set to `true` when the initiating action is dispatched, but also that it's
set back to `false` if the corresponding success or failure action is dispatch
afterwards.

```js
import { getInitialState } from 'redux-preboiled'
import reducer, { fetchStart, fetchDone } from './module'

let initialState 

beforeAll(() => {
  initialState = getInitialState(reducer)
})

describe('on fetchStart', () => {
  test('loading flag is set', () => {
    const state = reducer(initialState, fetchStart())
    expect(state.isFetching).toBe(true)
  })
})

describe('on fetchDone', () => {
  test('loading flag is unset', () => {
    const state1 = reducer(initialState, fetchStart())
    const state2 = reducer(state2, fetchDone('data'))
    expect(state2.isFetching).toBe(false)
  })
})
```

You can use the [`reduceActions`](../api/reduceActions.md) helper to reduce
the noise in such tests. `reduceActions` takes a reducer and a sequence of
actions, and returns the state after all actions have been processed by the
reducer. It also automatically gets the reducer's initial state and passes it
together with the first action in the sequence.

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
```

Using this helper, we can make the tests above more concise and expressive:

```js
import { reduceActions } from 'redux-preboiled'
import reducer, { fetchStart, fetchDone } from './module'

describe('on fetchStart', () => {
  test('loading flag is set', () => {
    const state = reduceActions(reducer, fetchStart())
    expect(state.isFetching).toBe(true)
  })
})

describe('on fetchDone', () => {
  test('loading flag is unset', () => {
    const state = reduceActions(
      reducer, 
      fetchStart(), 
      fetchDone('data')
    )
    expect(state.isFetching).toBe(false)
  })
})
```

## Next Steps

The current set of testing helpers is still very small. If there are any other
helpers you'd like to see, please [file an issue][new-issue].

This guide concludes our tour through Redux Preboiled. For reference
documentation on all helpers, see the [API section](../api/README.md).

[jest]: https://jestjs.io/
[new-issue]: https://github.com/denisw/redux-preboiled/issues/new
