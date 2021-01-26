# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1]

### Fixed

- `onAction`: Accept symbols and numbers as action types ([@judithhartman][https://github.com/judithhartmann])

## [0.4.0]

### Fixed

- **TypeScript:** Fix a type error with TypeScript v3.6 when passing actions
  of different types to `reduceActions` and `reduceActionsFrom`.

- Documentation fixes by [@k-nut](https://github.com/k-nut) and
  [@dannyfritz](https://github.com/dannyfritz).

### Internal

- Redux Preboiled now has a suite of TypeScript type definition tests powered
  by [tsd](https://github.com/SamVerschueren/tsd). This should help ensure
  that the typings don't break on new TypeScript releases.

- Upgrade TypeScript to v3.6.4.

- Upgrade Rollup to v1.23.1.

- Upgrade Babel to v7.6.4.

## [0.3.1] - 2019-05-02

### Fixed

- Ship typings (they were accidentally ommitted from v0.3.0).

## [0.3.0] - 2019-05-02

### Changed

- The "main" build is now a UMD module which can be used both in Node.js
  and directly the browser. In the latter case, Redux Preboiled is exposed
  as a global named `reduxPreboiled`.

- All builds (except the `esnext` one) are now transpiled to ES5, which makes
  them work in older browsers (most notably Internet Explorer 11).

## [0.2.0] - 2019-04-24

### Added

- New helper:
  [`reduceActionsFrom`](https://redux-preboiled.js.org/api/reduceactionsfrom).
  Like [`reduceActions`](https://redux-preboiled.js.org/api/reduceactions), but
  starting with a custom state (instead of the reducer's initial state).

### Changed

- Improve testing guide.
- Add a license link to `README.md`.

[Unreleased]: https://github.com/denisw/redux-preboiled/compare/v0.4.1...HEAD
[0.4.1]: https://github.com/denisw/redux-preboiled/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/denisw/redux-preboiled/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/denisw/redux-preboiled/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/denisw/redux-preboiled/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/denisw/redux-preboiled/compare/v0.1.0...v0.2.0
