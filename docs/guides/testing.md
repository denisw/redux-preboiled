# Testing

Redux boilerplate does not only accumulate in production code, but also in unit
tests. To help you reduce it, Preboiled offers two reducer test helpers -
`getInitialState` and `reduceActions` - which are described in the following
sections.

Note that in this guide we assume you use [Jest][jest] as your testing
framework. However, Preboiled doesn't depend on Jest in any way, and it should
be easy to translate the examples to your testing framework of choice.

## Testing Initial State

When testing reducers, you'll usually want to check if the initial state looks
as expected.

```js
import reducer from './module'

test('initial state is 0', () => {
  const initialState = reducer(undefined, { type: '' })
  expect(initialState).toBe(0)
})
```

[`getInitialState`](../api/getInitialState.md) makes such tests a bit more
readable. It simply returns the initial state of a reducer by calling it with an
`undefined` state, just as in the snippet above.

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
set back to `false` if the corresponding success or failure action is dispatche
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
    const state2 = reducer(state1, fetchDone('data'))
    expect(state2.isFetching).toBe(false)
  })
})
```

To make tests like these easier to write, Redux Preboiled offers the
[`reduceActions`](../api/reduceActions.md) helper. It takes a reducer and a
sequence of actions, and returns the state after all actions have been
processed. It also automatically gets the reducer's initial state and passes it
together with the first action in the sequence.

```js
import {
  chainReducers,
  createAction,
  onAction,
  reduceActions,
  withInitialState
} from 'redux-preboiled'

const increment = createAction('increment')

const counterReducer = chainReducers(
  withInitialState(0),
  onAction(increment, state => state + 1)
)

reduceActions(counterReducer, increment())
// => 1

reduceActions(counterReducer, increment(), increment())
// => 2
```

Using this helper, we can condense the tests above to:

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
    const state = reduceActions(reducer, fetchStart(), fetchDone('data'))
    expect(state.isFetching).toBe(false)
  })
})
```

If you want to start the reduction from a specific starting state, you can use
the [`reduceActionsFrom`](../api/reduceActionsFrom.md) helper instead.

```js
reduceActionsFrom(0, counterReducer, increment())
// => 1

reduceActionsFrom(3, counterReducer, increment(), increment())
// => 5
```

## Next Steps

The current set of testing helpers is still very small. If there are any other
helpers you'd like to see, feel free to [file an issue][new-issue].

This guide concludes our tour through Redux Preboiled. For more examples,
looking at the repository's [examples] directory. Reference documentation
on all helpers can be found in the [API section](../api/README.md).

[examples]: https://github.com/denisw/redux-preboiled/tree/master/examples
[jest]: https://jestjs.io/
[new-issue]: https://github.com/denisw/redux-preboiled/issues/new
