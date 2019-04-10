# Actions

Defining [Redux actions][redux-actions] commonly involves two declarations: an
_action type constant_ with the `type` value to use, and an _action creator_ to
generate actions of that type.

```js
// Without Preboiled

const INCREMENT = 'counter/increment'
const DECREMENT = 'counter/decrement'
const MULTIPLY = 'counter/multiply'

const increment = () => ({
  type: INCREMENT
})

const decrement = () => ({
  type: DECREMENT
})

const multiply = amount => ({
  type: MULTIPLY,
  payload: amount
})
```

This is a straight-forward pattern [with several
upsides][redux-actions-boilerplate], but it's also a quite verbose one. 
Preboiled's [`createAction`](./createAction.md) helper, described in this
guide, helps you reduce the noise while keeping the benefits. Here is the
equivalent code using `createAction`:

```js
// With Preboiled

import { createAction } from 'redux-preboiled'

const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
const multiply = createAction('counter/multiply').withPayload()
```

The following sections explain `createAction` and its capabilities in more
detail.

## Simple Actions

The `createAction` helper allows you define an action with a single
declaration, minimizing boilerplate and room for error. Given an action type
value, it returns a matching action creator.

```js
import { createAction } from 'redux-preboiled'

const increment = createAction('counter/increment')

increment()
// => { type: 'counter/increment' }
```

The action type value is made available as a `type` property on the returned
actions creator (e.g., `increment.type` in the example above). This means
you don't need to define a separate action type constant.

```js
increment.type
// => 'increment'
```

The `type` property also enables other helpers to accept a `createAction`
action creator in place of an action type value. For instance, `onAction`
(described in the [Reducers guide](./reducers.md)) lets you specify the action
type by directly passing `increment` instead of `increment.type` or
`'counter/increment'`. This is especially beneficial if you use TypeScript,
where the action creator's static type is [used for automatic type
inference](../api/onAction.md#typescript-notes).

By default, the action creators returned by `createAction` produce simple
actions with nothing more than a `type`. But this can be changed, as described
in the next section.

## Payload Actions

Often, you need to add extra data to actions. For these cases, `createAction`
allows you to generate _payload action creators_. These take a single argument
and attach it to the returned action as `payload`.

To make a payload action creator, call `.withPayload()` on an action creator
returned by `createAction`:

```js
const multiply = createAction('counter/multiply').withPayload()

multiply(2)
// => { type: 'counter/multiply', payload: 2 }
```

In TypeScript, you can specify the type of the payload as a type parameter:

```ts
// TypeScript

const multiply = 
  createAction('counter/multiply').withPayload<number>()
```

If you need to attach more than one value to an action, you can use an object
as payload:

```
const logIn = createAction('auth/logIn').withPayload()

login({ username: 'alice', password: 'ecila' })
// => 
// { 
//   type: 'auth/logIn',
//   payload: { username: 'alice', password: 'ecila' }
// }
```

## Next Steps

Defining actions is one thing, but you also need the reducers to handle them.
Redux Preboiled can help you with that too, as you'll see in the [Reducers
guide](./reducers.md). 

[redux-actions]: https://redux.js.org/basics/actions
[redux-actions-boilerplate]: https://redux.js.org/recipes/reducing-boilerplate#actions 
