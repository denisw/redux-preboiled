# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0]

### Changed

- The "main" build is now a UMD module which can be used both in Node.js 
  and directly the browser. In the latter case, Redux Preboiled is exposed 
  as a global named `reduxPreboiled`.

- All builds (except the `esnext` one) are now transpiled to ES5, which makes
  them work in older browsers (most notably Internet Explorer 11).

## [0.2.0]

### Added

- New helper:
  [`reduceActionsFrom`](https://redux-preboiled.js.org/api/reduceactionsfrom).
  Like [`reduceActions`](https://redux-preboiled.js.org/api/reduceactions), but
  starting with a custom state (instead of the reducer's initial state).

### Changed

- Improve testing guide.
- Add a license link to `README.md`.

[0.3.0]: https://github.com/denisw/redux-preboiled/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/denisw/redux-preboiled/compare/v0.1.0...v0.2.0
