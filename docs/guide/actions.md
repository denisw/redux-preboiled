# Actions

Defining Redux [actions][redux-actions] commonly involves two declarations: an
_action type constant_ that stores the `type` value to use for the action, and
an _action creator_ function to generate actions of that action type.

```js
// Action Types

const FETCH_RECIPES = 'FETCH_RECIPES';
const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';

// Action Creators

const fetchRecipes = () => ({
  type: FETCH_RECIPES
});

const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes
});

const fetchRecipesFailure = error => ({
  type: FETCH_RECIPES_FAILURE,
  payload: error
});
```

This is a straight-forward pattern that offers several benefits over littering
the entire codebase with inline action type strings and action object literals. 
However, the resulting code is quite lenghty and quickly becomes tedious to
read and write.

Redux Preboiled's `createAction` helper, describes in the next section, reduces
the noise while retaining the benefits of the above pattern.

## Boilerplate-Free Actions with `createAction`

The [`createAction`](.,/api/createAction.md) helper allows you define an action
with a single declaration, reducing boilerplate and room for error.

```js
const fetchRecipes = createAction('FETCH_RECIPES');
```

`createAction` returns an action creator for the passed action type. The action
type is directly attached to the creator as `type`, removing the need for a
separate action type constant.

```js
fetchRecipes()
// { type: 'FETCH_RECIPES' }

fetchRecipes.type
// 'FETCH_RECIPES'
```

Another benefit of the `type` property is that other helpers can make use of it
to offer extra conveniences. One example is the `onAction` reducer helper,
which allows you to write `onAction(fetchRecipes, ...)` instead of
`onAction(fetchRecipes.type, ...)` (as described in the [Reducers](./reducers)
guide).

## Defining Payload Actions Using `.withPayload()`

By default, the action creators returned by `createAction` don't take any
arguments, and the generated actions have no property other than `type`. However,
you can change this by calling an action creator's `.withPayload()` method.

```js
const fetchRecipesSuccess = createAction(
  'FETCH_RECIPES_SUCCESS'
).withPayload();
```

The resulting action creator takes a single argument that is attached to the
returned action as `payload`.

```js
fetchRecipesSuccess([
  { 
    title: 'Pancakes', 
    ingredients: […],
    directions: '…'
  }
]);
// {
//   type: 'FETCH_RECIPES_SUCCES',
//   payload: [
//     { 
//       title: 'Pancakes', 
//       ingredients: […],
//       directions: '…'
//     }
//   ]
// }
```

If you use TypeScript, you can use the type parameter of `withPayload()` to
define the payload's type.

```ts
const fetchRecipesSuccess = createAction(
  'FETCH_RECIPES_SUCCESS'
).withPayload<Recipe[]>();

const fetchRecipesFailure = createAction(
  'FETCH_RECIPES_FAILURE'
).withPayload<Error>();
```

## Next Steps

Once you have actions, you can write reducers to handle them. See the
[Reducers](./reducers.md) guide to find out how Redux Preboiled can help you
there.

[redux-actions]: https://redux.js.org/basics/actions
