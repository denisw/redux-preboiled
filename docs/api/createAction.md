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
): SimpleActionCreator<T>
```

## Details

`createAction` takes an action type value and returns an [action
creator][redux-action-creators] function which generates actions of that type.

By default, the returned action creator doesn't take any arguments and
generates only simple actions with just a `type`. However, it is possible to
create a *payload action creator* by calling the
`createAction(…).withPayload()` method. Such an action creator takes a single
value and adds that to the generated action as `action.payload`.

The action type passed to `createAction` is directly attached to the action
creator as a property named `type`. This allows other helpers, such as
[`onAction`](./onAction.md), to inspect the action creator's corresponding
action type at runtime.

### TypeScript Notes

`.withPayload()` is defined with a type parameter that specifies the payload
type. You can override the default (`any`) by specifying the type parameter
explicitly, e.g. `createAction(…).withPayload<string>()`.

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
// => { type: 'increment', payload: 2 }

multiply.type
// => 'multiply'
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
