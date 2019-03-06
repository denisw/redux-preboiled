# `createAction`

Defines an action creator for a specific action type.

```js
// JavaScript
function createAction(type)
```

```ts
// TypeScript
function createAction<T extends string>(
  type: string
): BasicActionCreator<T>
```
