# Actions

Defining Redux [actions][redux-actions] commonly involves two declarations: an
_action type constant_ that stores the `type` value to use for the action, and
an _action creator_ function to generate actions of that type.

```js
const FETCH_RECIPES = 'FETCH_RECIPES'
const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS'
const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE'

const fetchRecipes = () => ({
  type: FETCH_RECIPES
})

const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes
})

const fetchRecipesFailure = error => ({
  type: FETCH_RECIPES_FAILURE,
  payload: error
})
```

This is a straight-forward and useful pattern, but also a quite verbose one.
In this guide we are going to explore Redux Preboiled's `createAction` helper,
which reduces the noise while retaining the same benefits. 

## Defining Actions

The [`createAction`](./api/createAction.md) helper allows you define an
action with a single declaration, minimizing boilerplate and room for error.
Given an action type value, it returns a matching action creator.

```js
import { createAction } from 'redux-preboiled'

const fetchRecipes = createAction('FETCH_RECIPES')

fetchRecipes()
// => { type: 'FETCH_RECIPES' }
```

The action type is directly attached to the returned action creator as `type`
(e.g., `fetchRecipes.type` in the example above). This means you don't need to
define a separate action type constant.

```js
fetchRecipes.type
// => 'FETCH_RECIPES'
```

This also enables other helpers to accept a `createAction` action creator in
place of an action type value. For instance, the `onAction` helper (described
in the [Reducers](./reducers.md) guide) lets you write `onAction(fetchRecipes,
…)` instead of `onAction(fetchRecipes.type, …)`. This is especially beneficial
in TypeScript as the type information carried by the action creator can be
[used for type inference](../api/onAction.md#typescript-notes). 

## Adding Action Payloads

By default, the action creators returned by `createAction` don't take any
arguments, and the generated actions carry nothing else than a `type`.
However, you can change this by calling an action creator's `.withPayload()`
method.

```js
const fetchRecipeSuccess = 
  createAction('FETCH_RECIPE_SUCCESS').withPayload()
```

The resulting action creator takes a single argument that is attached to the
returned action as `payload`.

```js
fetchRecipesSuccess({
  title: 'Scrambled Eggs',
  ingredients: ['eggs', 'salt'],
  directions: '…'
});
// => 
// {
//   type: 'fetchRecipeSuccess',
//   payload: {
//     title: 'Scrambled Egss',
//     ingredients: ['eggs', 'salt'],
//     directions: '…'
//   }
// }
```

If you use TypeScript, you can use the type parameter of `withPayload()` to
define the payload's type.

```ts
// TypeScript

const fetchRecipeSuccess = 
  createAction('FETCH_RECIPE_SUCCESS').withPayload<Recipe>()

// fetchRecipeSuccess: PayloadActionCreator<
//  Recipe, 
//  'FETCH_RECIPE_SUCCESS'
// >
```

## Next Steps

Once you have your actions defined, you can write reducers to handle them. See
the [Reducers](./reducers.md) guide to find out how Redux Preboiled can help
you there.

[redux-actions]: https://redux.js.org/basics/actions
