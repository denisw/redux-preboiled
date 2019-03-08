# Getting Started

## Installation

Redux Preboiled is published to the [NPM registry][npm-package] as
`redux-preboiled`. You can install it as usual via NPM or [Yarn][yarn].

```sh
# NPM
npm install redux-preboiled

# Yarn
yarn add redux-preboiled
```

TypeScript typings are provided out of the box - no additional typings package
needed.

## Usage

Preboiled is just a collection of helper functions, so there is no required
setup. Just import the helpers you need directly from the `redux-preboiled`
module, for example:

```js
import { chainReducers, onAction, withInitialState } from 'redux-preboiled';
```

If you use a module bundler thats supports [tree shaking][tree-shaking] - such
as [Webpack][webpack] or [Rollup][rollup] - only the helpers you actually use
will end up in your application's build output. For instance, in a React app
boostrapped with [Create React App][create-react-app], this works out of the
box.

## Next Steps

For a tour of Redux Preboiled, see the guides on the provided helpers for
[actions](./actions.md), [reducers](./reducers.md) and [testing](./testing.md).

[create-react-app]: https://facebook.github.io/create-react-app/ 
[npm-package]: https://www.npmjs.com/package/redux
[rollup]: https://rollupjs.org/
[tree-shaking]: https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/
[webpack]: https://webpack.js.org/
[yarn]: https://yarnpkg.com/
