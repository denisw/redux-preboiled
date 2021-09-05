# `createAction`

Generates an action creator for a specific action type.

```js
// JavaScript

function createAction(type)
```

```ts
// TypeScript

function createAction<T extends string | symbol | number>(
  type: T
): BasicActionCreator<T>
```

## Details

`createAction` takes an action type value and returns an [action
creator][redux-action-creators] which produces actions of that type.

For a version of the action creator which accepts a `payload` value and
attaches the returned action, call the `withPayload()` method (e.g.,
`createAction("…").withPayload()`.)

In addition to `withPayload()`, action creators returned by `createAction()`
have the following properties:

- **`type`:** The type value passed to `createAction()`. Removes the need
  for a separate action type constant, and allows other helpers such as
  [`onAction`](./onAction.md) to inspect the `type` value of the produced
  actions at runtime.

- **`matches(action)`:** A method that returns true the the passed action
  has the same `type` as the ones produced by the action creator.

### TypeScript Notes

- `.withPayload()` is defined with a type parameter that specifies the
  payload type. You can override the default (`any`) by specifying the
  type parameter explicitly:

  ```ts
  const incrementBy = createAction('incrementBy').withPayload<number>();
  ```

- `.matches()` is defined as a [type predicate][ts-type-predicate]. Using
  it in a condition allows the TypeScript compiler to narrow the type of
  passed action to the specific type of action returned by the action
  creator:

  ```ts
  if (incrementBy.matches(action)) {
    const amount = action.payload
    // Type is inferred to be `number` due to matches()
  }
  ```


## Examples

Defining a basic action:

```js
import { createAction } from 'redux-preboiled'

const increment = createAction('increment')

increment()
// => { type: 'increment' }

increment.type
// => 'increment'
```

Defining an action with payload:

```js
import { createAction } from 'redux-preboiled'

const multiply = createAction('multiply').withPayload()

multiply(2)
// => { type: 'multiply', payload: 2 }

multiply.type
// => 'multiply'

multiply.matches({ type: 'multiply', payload: 1 })
// => true

multiply.matches({ type: 'increment' })
// => false
```

Specifying the action payload type (TypeScript):

```ts
import { createAction } from 'redux-preboiled'

const multiply = createAction('multiply').withPayload<number>()

multiply(2)
// OK

multiply('2')
// ERROR: Argument of type '2' is not assignable to parameter of
// type 'number'.
```

## See Also

- [Actions](../guides/actions.md) guide
- [onAction](./onAction.md)

[redux-action-creators]: https://redux.js.org/basics/actions#action-creators
[ts-type-predicate]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
